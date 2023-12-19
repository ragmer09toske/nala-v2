import {
    CREATE_ADMIN_USER_START,
    CREATE_ADMIN_USER_SUCCESS,
    CREATE_ADMIN_USER_ERROR,
    DELETE_ADMIN_USER_START,
    DELETE_ADMIN_USER_SUCCESS,
    DELETE_ADMIN_USER_ERROR,
    GET_ADMIN_USER_START,
    GET_ADMIN_USER_SUCCESS,
    GET_ADMIN_USER_ERROR
} from '../../../constants';

import gql from 'graphql-tag';

// Toaster
import { toastr } from 'react-redux-toastr';

import query from '../../../components/siteadmin/AdminUserManagement/adminUserQuery.graphql';

import { setRuntimeVariable } from '../../runtime';
import { closeAdminUserModal } from '../modalActions';
import createAdminUserMutation from './createAdminUser.graphql';
import deleteAdminUserMutation from './deleteAdminUser.graphql';
import getAdminUserQuery from './getAdminUser.graphql';
import getPrivilegesQuery from '../AdminRoles/getPrivileges.graphql';

export function createAdminUser(
    id,
    email,
    password,
    roleId
) {
    return async (dispatch, getState, { client }) => {
        await dispatch({
            type: CREATE_ADMIN_USER_START,
            payload: {
                createAdminUserLoading: true
            }
        });

        try {
            const { data } = await client.mutate({
                mutation: createAdminUserMutation,
                variables: {
                    id,
                    email,
                    password,
                    roleId
                },
                refetchQueries: [{ query, variables: { currentPage: 1 } }]
            });

            if (data && data.createAdminUser && data.createAdminUser.status === 200) {
                await dispatch({
                    type: CREATE_ADMIN_USER_SUCCESS,
                    payload: {
                        createAdminUserLoading: false
                    }
                });
                dispatch(closeAdminUserModal());
                toastr.success("Admin User", "Admin User has been " + (id ? 'updated' : 'added') + " successfully!");
                return {
                    status: 200
                };
            } else {
                toastr.error("Admin User", "Oops, something went wrong" + data && data.createAdminUser && data.createAdminUser.errorMessage);
                await dispatch({
                    type: CREATE_ADMIN_USER_ERROR,
                    payload: {
                        createAdminUserLoading: false,
                        error: data && data.createAdminUser && data.createAdminUser.errorMessage
                    }
                });
                return {
                    status: 400
                };
            }
        } catch (error) {
            await dispatch({
                type: CREATE_ADMIN_USER_ERROR,
                payload: {
                    createAdminUserLoading: false,
                    error
                }
            });
            return {
                status: 400
            };
        }
    }
}

export function deleteAdminUser(id) {
    return async (dispatch, getState, { client }) => {
        await dispatch({
            type: DELETE_ADMIN_USER_START,
            payload: {
                deleteAdminUserLoading: true
            }
        });

        try {
            const { data } = await client.mutate({
                mutation: deleteAdminUserMutation,
                variables: {
                    id
                },
                // refetchQueries: [{ query }]
            });

            if (data && data.deleteAdminUser && data.deleteAdminUser.status === 200) {
                await dispatch({
                    type: DELETE_ADMIN_USER_SUCCESS,
                    payload: {
                        deleteAdminUserLoading: false
                    }
                });
                dispatch(closeAdminUserModal());
                toastr.success("Admin User", "Admin User has been deleted successfully!");

            } else {
                toastr.error("Admin User", "Oops, something went wrong" + data && data.deleteAdminUser && data.deleteAdminUser.errorMessage);
                await dispatch({
                    type: DELETE_ADMIN_USER_ERROR,
                    payload: {
                        deleteAdminUserLoading: false,
                        error: data && data.deleteAdminUser && data.deleteAdminUser.errorMessage
                    }
                });
            }
        } catch (error) {
            await dispatch({
                type: DELETE_ADMIN_USER_ERROR,
                payload: {
                    deleteAdminUserLoading: false,
                    error
                }
            });
        }
    }
}

export function getAdminUser() {
    return async (dispatch, getState, { client }) => {
        let adminPrivileges;

        const privilegesData = await client.query({
            query: getPrivilegesQuery
        });

        let privileges = privilegesData.data.getPrivileges && privilegesData.data.getPrivileges.results;

        let defaultPrivileges = privileges && privileges.length > 0 && privileges.map((item) => item.id);

        try {
            await dispatch({
                type: GET_ADMIN_USER_START,
                payload: {
                    getAdminUserLoading: true
                }
            });

            const { data } = await client.query({
                query: getAdminUserQuery
            });

            if (data && data.getAdminUser && data.getAdminUser.id) {
                dispatch(setRuntimeVariable({
                    name: 'isSuperAdmin',
                    value: data && data.getAdminUser && data.getAdminUser.isSuperAdmin
                }));

                adminPrivileges = {
                    id: data.getAdminUser.id,
                    email: data.getAdminUser.email,
                    isSuperAdmin: data.getAdminUser.isSuperAdmin,
                    roleId: data.getAdminUser.roleId,
                    privileges: (data.getAdminUser && data.getAdminUser.adminRole && data.getAdminUser.adminRole.privileges) || []
                };

                if (adminPrivileges && adminPrivileges.isSuperAdmin) {
                    adminPrivileges['privileges'] = defaultPrivileges;
                }

                await dispatch({
                    type: GET_ADMIN_USER_SUCCESS,
                    payload: {
                        getAdminUserLoading: false,
                        adminPrivileges
                    }
                });

                return adminPrivileges;
            } else {
                await dispatch({
                    type: GET_ADMIN_USER_ERROR,
                    payload: {
                        getAdminUserLoading: false,
                        error: data && data.getAdminUser && data.getAdminUser.errorMessage
                    }
                });
                return false;
            }
        } catch (error) {
            await dispatch({
                type: GET_ADMIN_USER_ERROR,
                payload: {
                    getAdminUserLoading: false,
                    error
                }
            });
            return false;
        }
    }
}