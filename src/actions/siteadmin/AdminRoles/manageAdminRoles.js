import {
    CREATE_ADMIN_ROLES_START,
    CREATE_ADMIN_ROLES_SUCCESS,
    CREATE_ADMIN_ROLES_ERROR,
    DELETE_ADMIN_ROLES_START,
    DELETE_ADMIN_ROLES_SUCCESS,
    DELETE_ADMIN_ROLES_ERROR,
    ADMIN_PRIVILEGES_START,
    ADMIN_PRIVILEGES_SUCCESS,
    ADMIN_PRIVILEGES_ERROR
} from '../../../constants';

// Toaster
import { toastr } from 'react-redux-toastr';

import query from '../../../components/siteadmin/AdminRolesManagement/adminRolesQuery.graphql';

import { closeAdminRolesModal } from '../modalActions';
import createAdminRoleMutation from './createAdminRole.graphql';
import deleteAdminRoleMutation from './deleteAdminRole.graphql';
import getPrivilegesQuery from './getPrivileges.graphql';


export function createAdminRole(
    id,
    name,
    description,
    privileges
) {
    return async (dispatch, getState, { client }) => {
        await dispatch({
            type: CREATE_ADMIN_ROLES_START,
            payload: {
                createAdminRoleLoading: true
            }
        });

        try {
            const { data } = await client.mutate({
                mutation: createAdminRoleMutation,
                variables: {
                    id,
                    name,
                    description,
                    privileges
                },
                refetchQueries: [{ query }]
            });

            if (data && data.createAdminRole && data.createAdminRole.status === 200) {
                await dispatch({
                    type: CREATE_ADMIN_ROLES_SUCCESS,
                    payload: {
                        createAdminRoleLoading: false
                    }
                });
                dispatch(closeAdminRolesModal());
                toastr.success("Admin Role", "Admin Role has been " + (id ? 'updated' : 'added') + " successfully!");
                return {
                    status: 200
                };
            } else {
                toastr.error("Admin Role", "Oops, something went wrong" + data && data.createAdminRole && data.createAdminRole.errorMessage);
                dispatch(closeAdminRolesModal());
                await dispatch({
                    type: CREATE_ADMIN_ROLES_ERROR,
                    payload: {
                        createAdminRoleLoading: false,
                        error: data && data.createAdminRole && data.createAdminRole.errorMessage
                    }
                });
                return {
                    status: 400
                };
            }
        } catch (error) {
            dispatch(closeAdminRolesModal());
            await dispatch({
                type: CREATE_ADMIN_ROLES_ERROR,
                payload: {
                    createAdminRoleLoading: false,
                    error
                }
            });
            return {
                status: 400
            };
        }
    }
}

export function deleteAdminRole(id) {
    return async (dispatch, getState, { client }) => {
        await dispatch({
            type: DELETE_ADMIN_ROLES_START,
            payload: {
                deleteAdminRoleLoading: true
            }
        });

        try {
            const { data } = await client.mutate({
                mutation: deleteAdminRoleMutation,
                variables: {
                    id
                },
                // refetchQueries: [{ query }]
            });

            if (data && data.deleteAdminRole && data.deleteAdminRole.status === 200) {
                await dispatch({
                    type: DELETE_ADMIN_ROLES_SUCCESS,
                    payload: {
                        deleteAdminRoleLoading: false
                    }
                });
                dispatch(closeAdminRolesModal());
                toastr.success("Admin Role", "Admin Role has been deleted successfully!");
                return {
                    status: 200
                };
            } else {
                toastr.error("Admin Role", "Oops, something went wrong" + data && data.deleteAdminRole && data.deleteAdminRole.errorMessage);
                await dispatch({
                    type: DELETE_ADMIN_ROLES_ERROR,
                    payload: {
                        deleteAdminRoleLoading: false,
                        error: data && data.deleteAdminRole && data.deleteAdminRole.errorMessage
                    }
                });
                return {
                    status: 400
                };
            }
        } catch (error) {
            await dispatch({
                type: DELETE_ADMIN_ROLES_ERROR,
                payload: {
                    deleteAdminRoleLoading: false,
                    error
                }
            });
            return {
                status: 400
            };
        }
    }
}

export function getPrivileges() {
    return async (dispatch, getState, { client }) => {
        await dispatch({
            type: ADMIN_PRIVILEGES_START
        });

        try {
            const { data } = await client.query({
                query: getPrivilegesQuery
            });

            if (data && data.getPrivileges && data.getPrivileges.status === 200) {
                await dispatch({
                    type: ADMIN_PRIVILEGES_SUCCESS,
                    payload: {
                        privileges: data.getPrivileges.results
                    }
                });
            } else {
                await dispatch({
                    type: ADMIN_PRIVILEGES_ERROR,
                });
            }
        } catch (error) {
            await dispatch({
                type: ADMIN_PRIVILEGES_ERROR,
            });
        }
    }
}