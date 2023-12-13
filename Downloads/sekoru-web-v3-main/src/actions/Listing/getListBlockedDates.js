import { gql } from 'react-apollo';

import {
    GET_BLOCKED_START,
    GET_BLOCKED_SUCCESS,
    GET_BLOCKED_ERROR

} from '../../constants';


const query = gql`
  query ($listId:String!, $preview: Boolean) {
    UserListing (listId:$listId, preview: $preview) {
      id
      userId
      bookingType
      isPublished
      houseRules {
        houseRulesId
      }
      listingData {
        bookingNoticeTime,
        checkInStart,
        checkInEnd,
        maxDaysNotice,
        minDay,
        maxDay,
        basePrice,
        delivery,
        currency,
        weeklyDiscount,
        monthlyDiscount,
        cancellationPolicy
      }
      blockedDates {
        blockedDates
        reservationId
        calendarStatus
        isSpecialPrice
      }
      calendars {
        id
        name
        url
        listId
        status
      }
      listBlockedPrice {
        listId
        calendarStatus
        isSpecialPrice
        blockedDates
        calendarId
        reservationId
      }
    }
  }
`;


export function getListBlockedDates(
    listId,
    minDayValues,
    maxDayValues,
    checkInEndValue,
    checkInStartValue,
    houseRules,
    isCancel,
    isMaxDays,
    isBooking,
    basePrice,
    delivery,
    currency,
    monthlyDiscount,
    weeklyDiscount
) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: GET_BLOCKED_START,
        });

        try {

            let mutation = gql`
            mutation ListingDataUpdate(
                $id: Int,
                $houseRules: [Int],
                $checkInStart:String,
                $checkInEnd:String,
                $minDay:Int,
                $maxDay:Int,
                $cancellationPolicy: Int,
                $maxDaysNotice: String,
                $bookingNoticeTime: String,
                $basePrice: Float,
                $delivery: Float,
                $currency: String,
                $weeklyDiscount:Float,
                $monthlyDiscount:Float,
            ){
                ListingDataUpdate(
                    id: $id,
                    houseRules: $houseRules,
                    checkInStart:$checkInStart,
                    checkInEnd:$checkInEnd,
                    minDay:$minDay,
                    maxDay:$maxDay,
                    cancellationPolicy: $cancellationPolicy,
                    maxDaysNotice: $maxDaysNotice,
                    bookingNoticeTime: $bookingNoticeTime,
                    basePrice: $basePrice,
                    delivery: $delivery,
                    currency: $currency,
                    weeklyDiscount:$weeklyDiscount,
                    monthlyDiscount:$monthlyDiscount,
                ) {
                 status
              }
            }
           `;


            const { data } = await client.mutate({
                mutation,
                variables: {
                    id: listId,
                    minDay: minDayValues,
                    maxDay: maxDayValues,
                    checkInStart: checkInStartValue,
                    checkInEnd: checkInEndValue,
                    houseRules: houseRules,
                    cancellationPolicy: isCancel,
                    maxDaysNotice: isMaxDays,
                    bookingNoticeTime: isBooking,
                    basePrice: basePrice,
                    delivery: delivery,
                    currency: currency,
                    monthlyDiscount: monthlyDiscount ? monthlyDiscount : 0,
                    weeklyDiscount: weeklyDiscount ? weeklyDiscount : 0
                },
                refetchQueries: [{ query, variables: { listId: listId, preview: true } }]
            });

            if (data && data.ListingDataUpdate) {
                if (data.ListingDataUpdate.status === 'success') {
                    dispatch({
                        type: GET_BLOCKED_SUCCESS,
                    });
                    return true;
                } else {
                    return false;
                }
            }

        } catch (error) {
            dispatch({
                type: GET_BLOCKED_ERROR,
                payload: {
                    error
                }
            });
        }
    };
}