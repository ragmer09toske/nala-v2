import { gql } from 'react-apollo';
import {
  SEND_MESSAGE_START,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
} from '../../constants';
import { updateReservation } from '../Reservation/updateReservation';
import { sendEmail } from '../../core/email/sendEmail';
import { setLoaderStart, setLoaderComplete } from '../loader/loader';
import { toastr } from 'react-redux-toastr';

const ThreadItemsQuery = gql`
query getThread($threadType: String, $threadId: Int){	
  getThread(threadType: $threadType, threadId: $threadId) {	
    id	
    listId	
    guest	
    host	
    listData {	
      title	
      city	
      state	
      country	
      isPublished	
      listingData {	
        basePrice	
        delivery	
        currency	
        monthlyDiscount	
        weeklyDiscount	
      }	
    }	
    threadItemForType {	
      id	
      threadId	
      reservationId	
      content	
      sentBy	
      type	
      startDate	
      endDate	
      personCapacity	
      createdAt	
      startTime	
      endTime	
      cancelData {	
        id	
        reservationId	
        cancellationPolicy	
        guestServiceFee	
        hostServiceFee	
        refundToGuest	
        payoutToHost	
        total 	
        currency	
        createdAt	
      }	
      reservation {	
        id	
        listId	
        hostId	
        guestId	
        listTitle	
        checkIn	
        checkOut	
        basePrice	
        delivery	
        total	
        currency	
        guests	
        confirmationCode	
        guestServiceFee	
        discount	
        discountType	
        createdAt	
        updatedAt	
        hostServiceFee	
        startTime	
        endTime	
        reservationState	
        securityDeposit	
        claimStatus	
        claimAmount	
        claimPayout	
        claimRefund	
        claimReason	
        claimImages	
        bookingSpecialPricing {	
          id	
          reservationId	
          blockedDates	
          isSpecialPrice	
        }	
      }	
    }	
    threadItems {	
      id	
      threadId	
      reservationId	
      content	
      sentBy	
      type	
      startDate	
      endDate	
      createdAt	
    }	
    threadItemsCount	
    guestProfile {	
      profileId	
      displayName	
      firstName	
      picture	
      location	
      reviewsCount	
      userVerification {	
        id	
        isEmailConfirmed	
        isFacebookConnected	
        isGoogleConnected	
        isIdVerification	
      }	
    }	
    guestUserData {	
      email	
      userBanStatus	
    }	
    hostProfile {	
      profileId	
      displayName	
      firstName	
      picture	
      location	
      reviewsCount	
      userVerification {	
        id	
        isEmailConfirmed	
        isFacebookConnected	
        isGoogleConnected	
        isIdVerification	
      }	
    }	
    hostUserData {	
      email	
      userBanStatus	
    }	
    status	
  }	
}
`;
export function sendMessageAction(
  threadId,
  threadType,
  content,
  type,
  startDate,
  endDate,
  personCapacity,
  reservationId,
  receiverName,
  senderName,
  receiverType,
  receiverEmail,
  startTime,
  endTime,
  currentPage,
  searchKey,
  listIdKey,
  startDateFilter,
  endDateFilter,
  orderBy,
  dateFilter
) {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch(setLoaderStart('hostAction'));
      dispatch({
        type: SEND_MESSAGE_START,
      });

      let mutation = gql`
          mutation sendMessage(
          $threadId: Int!, 
          $content: String, 
          $type: String,
          $startDate: String,
          $endDate: String,
          $personCapacity: Int,
          $reservationId: Int,
          $startTime: Float,
          $endTime: Float,
          ) {
            sendMessage(
            threadId: $threadId, 
            content: $content, 
            type: $type,
            startDate: $startDate,
            endDate: $endDate,
            personCapacity: $personCapacity,
            reservationId: $reservationId,
            startTime: $startTime,
            endTime: $endTime
            ){
              id
              sentBy
              content
              type
              reservationId
              startDate
              endDate
              personCapacity
              createdAt
              status
            }
          }
      `;
      // Send Message
      const { data } = await client.mutate({
        mutation,
        variables: {
          threadId,
          content,
          type,
          startDate,
          endDate,
          personCapacity,
          reservationId,
          startTime,
          endTime
        },
        refetchQueries: [
          {
            query: ThreadItemsQuery,
            variables: {
              threadId,
              threadType
            },
          }
        ]
      });

      if (data && data.sendMessage && data.sendMessage.status == 'alreadyPerformed') {
        toastr.error("Error!", "Oops! you have already performed this action!");
        dispatch({
          type: SEND_MESSAGE_ERROR,
        });
      } else if (data && data.sendMessage && data.sendMessage.status != 'userbanned') {
        if (reservationId != null && reservationId != undefined) {
          dispatch(updateReservation(reservationId, type, threadType, threadId, currentPage, searchKey, listIdKey, startDateFilter, endDateFilter, orderBy, dateFilter));
        }
        dispatch({
          type: SEND_MESSAGE_SUCCESS,
        });
        if (type === 'message') {
          let emailContent = {
            receiverName,
            senderName,
            receiverType,
            type: receiverType,
            message: content,
            threadId
          };
          sendEmail(receiverEmail, 'message', emailContent);
        }
      }
      dispatch(setLoaderComplete('hostAction'));
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_ERROR,
        payload: {
          error
        }
      });
      dispatch(setLoaderComplete('hostAction'));
      return false;
    }
    return true;
  };
}