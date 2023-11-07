import { gql } from 'react-apollo';

import history from '../../core/history';
import {
  BOOKING_PROCESS_START,
  BOOKING_PROCESS_SUCCESS,
  BOOKING_PROCESS_ERROR,
} from '../../constants';
import { loadAccount } from '../account';

export function bookingProcess(
  listId, guests, startDate,
  endDate, preApprove, startTime,
  endTime, deliveryStatus, roomType) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: BOOKING_PROCESS_START,
      payload: {
        bookingLoading: true
      }
    });

    try {

      let query = gql`
          query UserListing($listId:String!) {
            UserListing (listId:$listId) {
              id
              userId
              title
              coverPhoto
              country
              city
              state
              personCapacity
              bookingType
              transmission
              reviewsCount
              reviewsStarRating
              listPhotos{
                id
                name
              }
              user {
                email
                profile{
                  profileId
                  displayName
                  firstName
                  picture
                  createdAt
                }
              }
              settingsData {
                id
                settingsId
                listsettings {
                  id
                  itemName
                  settingsType {
                    typeName
                  }
                }
              }
              houseRules {
                houseRulesId
                listsettings{
                  itemName
                  isEnable
                  settingsType {
                    typeName
                  }
                }
              }
              listingData {
                checkInStart,
                checkInEnd,
                basePrice,
                delivery,
                currency,
                weeklyDiscount,
                monthlyDiscount,
                securityDeposit
                cancellation {
                  id
                  policyName
                  policyContent
                }
              }
              listBlockedPrice {
                id
                listId
                isSpecialPrice
                blockedDates
              }
            }
        }
      `;

      const { data } = await client.query({
        query,
        variables: {
          listId
        },
        fetchPolicy: 'network-only'
      });

      if (data && data.UserListing) {
        dispatch({
          type: BOOKING_PROCESS_SUCCESS,
          payload: {
            data: data.UserListing,
            bookDetails: {
              guests,
              startDate,
              endDate,
              preApprove,
              startTime,
              endTime,
              deliveryStatus,
              roomType
            },
            bookingLoading: false
          }
        });
        dispatch(loadAccount());

        history.push('/book/' + listId);
      } else if(data && data.UserListing == null) {
        window.location.reload();
      }

    } catch (error) {
      dispatch({
        type: BOOKING_PROCESS_ERROR,
        payload: {
          error,
          bookingLoading: false
        }
      });
      return false;
    }

    return true;
  };
}

