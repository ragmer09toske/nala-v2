import {
    SEND_VERIFICATION_SMS_START,
    SEND_VERIFICATION_SMS_SUCCESS,
    SEND_VERIFICATION_SMS_ERROR
} from '../../constants';

import { gql } from 'react-apollo';

// GraphQL query
import getPhoneData from '../../components/PhoneVerificationModal/getUserData.graphql';

// Redux Action
import { openSmsVerificationModal } from '../SmsVerification/modalActions';

// Process SMS
import { processSms } from '../../core/sms/processSms';

import { decode } from '../../helpers/queryEncryption';
import { setLoaderStart, setLoaderComplete } from '../loader/loader';


export function sendVerificationSms(countryCode, phoneNumber) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: SEND_VERIFICATION_SMS_START,
            payload: {
                smsLoading: true
            }
        });

        try {

            dispatch(setLoaderStart('smsLoading'));


            const mutation = gql`
                mutation AddPhoneNumber($countryCode: String!, $phoneNumber: String!) {
                    AddPhoneNumber(countryCode: $countryCode, phoneNumber: $phoneNumber) {
                        status
                        countryCode
                        phoneNumber
                        userProfileNumber
                    }
                }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: {
                    countryCode,
                    phoneNumber
                },
                refetchQueries: [{
                    query: getPhoneData
                }]
            });

            if (data && data.AddPhoneNumber && data.AddPhoneNumber.status == '200') {

                const { status, errorMessage } = await processSms('verification',
                    data.AddPhoneNumber.countryCode,
                    decode(data.AddPhoneNumber.phoneNumber),
                    data.AddPhoneNumber.userProfileNumber
                    );

                if (status == 200) {
                    dispatch(openSmsVerificationModal('verifyPhoneNumber'));
                    dispatch({
                        type: SEND_VERIFICATION_SMS_SUCCESS,
                        payload: {
                            smsLoading: false
                        }
                    });
                } else {
                    dispatch({
                        type: SEND_VERIFICATION_SMS_ERROR,
                        payload: {
                            smsLoading: false
                        }
                    });
                }

                dispatch(setLoaderComplete('smsLoading'));


                if (errorMessage) {
                    return {
                        status: '400',
                        errorMessage
                    }
                }
            } else {
                dispatch({
                    type: SEND_VERIFICATION_SMS_ERROR,
                    payload: {
                        smsLoading: false
                    }
                });

                dispatch(setLoaderComplete('smsLoading'));


                return {
                    status: '400',
                    errorMessage: 'Oops! Something error occured. Please try again.'
                };
            }
        } catch (error) {
            dispatch({
                type: SEND_VERIFICATION_SMS_ERROR,
                payload: {
                    error,
                    smsLoading: false
                }
            });
            return {
                status: '400'
            };
        }

        return {
            status: '200'
        };
    };

}