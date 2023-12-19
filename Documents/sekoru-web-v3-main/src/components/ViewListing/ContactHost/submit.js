// Redux Form
import { SubmissionError } from 'redux-form';
import { Field, reduxForm, reset } from 'redux-form';

// Redux Action
import {contactHostClose} from '../../../actions/message/contactHostModal';
import {contactHost} from '../../../actions/message/contactHost';


async function submit(values, dispatch) {
  dispatch(contactHostClose());
  let listId = values.listId;
  let host = values.host;
  let content = values.content;
  let startDate = values.startDate;
  let endDate = values.endDate;
  let personCapacity = values.personCapacity ? values.personCapacity : 1;
  dispatch(contactHost(
    listId, 
    host, 
    content, 
    startDate, 
    endDate, 
    personCapacity,
    values.hostEmail,
    values.firstName,
    values.startTime,
    values.endTime,
  ));
  dispatch(reset('ContactHostForm'));
}

export default submit;
