import { toastr } from 'react-redux-toastr';
import { updateReview } from '../../../../actions/siteadmin/WhyHostReview/deleteWhyHostReview';

async function submit(values, dispatch) {

  if (values.image == null) {
    toastr.error("Error!", "Please upload the image!");
    return;
  }

  dispatch(updateReview(values));

}

export default submit;
