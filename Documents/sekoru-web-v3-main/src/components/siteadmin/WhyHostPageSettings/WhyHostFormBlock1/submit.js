import fetch from '../../../../core/fetch';
import {toastr} from 'react-redux-toastr';

async function submit(values, dispatch) {
  const query = `
  mutation (
    $hostBannerTitle1: String,
    $hostBannerContent1: String,
    $hostBannerImage1: String,
    $hostBannerImage2: String,
    $hostBannerContent2: String
) {
  updateWhyHostPage (
    hostBannerTitle1: $hostBannerTitle1,
    hostBannerContent1: $hostBannerContent1,
    hostBannerImage1: $hostBannerImage1,
    hostBannerImage2: $hostBannerImage2,
    hostBannerContent2: $hostBannerContent2
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
