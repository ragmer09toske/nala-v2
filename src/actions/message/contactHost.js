import { gql } from 'react-apollo';

import {
  CONTACT_HOST_START,
  CONTACT_HOST_SUCCESS,
  CONTACT_HOST_ERROR,
} from '../../constants';

import { sendEmail } from '../../core/email/sendEmail';
import { toastr } from 'react-redux-toastr';
export function contactHost(
  listId,
  host,
  content,
  startDate,
  endDate,
  personCapacity,
  hostEmail,
  firstName,
  startTime,
  endTime,
) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: CONTACT_HOST_START,
    });

    try {

      let account = getState().account.data;

      let mutation = gql`
          mutation CreateThreadItems(
            $listId: Int!, 
            $host: String!,
            $content: String!,
            $type: String,
            $startDate: String,
            $endDate: String,
            $personCapacity: Int,
            $startTime: Float,
            $endTime: Float,
          ){
              CreateThreadItems(
                listId: $listId,
                host: $host,
                content: $content,
                type: $type,
                startDate: $startDate,
                endDate: $endDate,
                personCapacity: $personCapacity,
                startTime: $startTime,
                endTime: $endTime,
              ) {
                  id
                  threadId
                  sentBy
                  content
                  type
                  startDate
                  endDate
                  personCapacity
                  createdAt
              }
          }
      `;

      // Send Message
      const { data } = await client.mutate({
        mutation,
        variables: {
          listId,
          host,
          content,
          type: 'inquiry',
          startDate,
          endDate,
          personCapacity,
          startTime,
          endTime,
        }
      });

      
      let timeStart, timeEnd;

      if (startTime.includes('.')) {
        timeStart = startTime && startTime.length == '3' ? '0' + startTime.slice(0, 1) + ':30:00' : startTime && startTime.slice(0, 2) + ':30:00'
      } else {
        timeStart = startTime && startTime.length == '1' ? '0' + startTime.slice(0, 1) + ':00:00' : startTime && startTime.slice(0, 2) + ':00:00'
      }

      if (endTime.includes('.')) {
        timeEnd = endTime && endTime.length == '3' ? '0' + endTime.slice(0, 1) + ':30:00' : endTime && endTime.slice(0, 2) + ':30:00'
      } else {
        timeEnd = endTime && endTime.length == '1' ? '0' + endTime.slice(0, 1) + ':00:00' : endTime && endTime.slice(0, 2) + ':00:00'
      }


      let emailContent = {
        receiverName: firstName,
        senderName: account.firstName,
        type: 'owner',
        message: content,
        threadId: data.CreateThreadItems.threadId,
        checkIn: startDate,
        checkOut: endDate,
        personCapacity,
        startTime: timeStart,
        endTime: timeEnd
      };
      


      if (data && data.CreateThreadItems) {
        dispatch({
          type: CONTACT_HOST_SUCCESS,
        });
        toastr.success("Success!", "You request has been sent!");
        sendEmail(hostEmail, 'inquiry', emailContent);
      }

    } catch (error) {
      dispatch({
        type: CONTACT_HOST_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}