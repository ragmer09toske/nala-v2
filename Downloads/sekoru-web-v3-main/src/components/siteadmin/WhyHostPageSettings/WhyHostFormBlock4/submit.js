import fetch from '../../../../core/fetch';
import {toastr} from 'react-redux-toastr';

async function submit(values, dispatch) {
  const query = `
  mutation (
    $easyHostTitle1: String,
    $easyHostContent1: String,
    $easyHostContent2: String,
    $workTitle1: String,
    $workTitle2: String,
    $workContent1: String,
    $workContent2: String,
    $workImage1: String,
    $workImage2: String,
    $workImage3: String,
) {
  updateWhyHostPage (
    easyHostTitle1: $easyHostTitle1,
    easyHostContent1: $easyHostContent1,
    easyHostContent2: $easyHostContent2,
    workTitle1: $workTitle1,
    workTitle2: $workTitle2,
    workContent1: $workContent1,
    workContent2: $workContent2,
    workImage1: $workImage1,
    workImage2: $workImage2,
    workImage3: $workImage3,
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
      query: query,
      variables: values
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data.updateWhyHostPage.status === "success") {
    toastr.success("Success", "Updated why become host settings");
  } else {
    toastr.error("Oops!", "Updating Why Become Owner Settings failed");
  }

}

export default submit;
