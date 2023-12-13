// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import { toastr } from 'react-redux-toastr';

async function submit(values, dispatch) {

  if (!values.carTripImage1 || !values.carTripImage2) {
    toastr.error("Update Static Block Settings", "Updating Static Block Settings failed");
    return;
  } 

  const mutation = `
    mutation (
        $carCounterTitle1: String,
        $carCounterContent1: String,
        $carCounterTitle2: String,
        $carCounterContent2: String,
        $carCounterTitle3: String,
        $carBlockTitle1: String,
        $carBlockContent1: String,
        $carBlockTitle2: String,
        $carTripTitle1: String,
        $carTripContent1: String,
        $carTripTitle2: String,
        $carTripContent2: String,
        $carTripTitle3: String,
        $carTripContent3: String
    ) {
      updateStaticInfoBlock (
        carCounterTitle1: $carCounterTitle1,
        carCounterContent1: $carCounterContent1,
        carCounterTitle2: $carCounterTitle2,
        carCounterContent2: $carCounterContent2,
        carCounterTitle3: $carCounterTitle3,
        carBlockTitle1: $carBlockTitle1,
        carBlockContent1: $carBlockContent1,
        carBlockTitle2: $carBlockTitle2,
        carTripTitle1: $carTripTitle1,
        carTripContent1: $carTripContent1,
        carTripTitle2: $carTripTitle2,
        carTripContent2: $carTripContent2,
        carTripTitle3: $carTripTitle3,
        carTripContent3: $carTripContent3
      ) {
          status
      }
    }
  `;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: mutation,
      variables: values
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data.updateStaticInfoBlock.status === "success") {
    toastr.success("Update Static Block Settings", "Changes are updated!");
  } else {
    toastr.error("Update Static Block Settings", "Updating Static Block Settings failed");
  }

}

export default submit;
