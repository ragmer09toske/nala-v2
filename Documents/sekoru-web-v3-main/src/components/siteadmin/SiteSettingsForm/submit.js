// Redux Form
import { SubmissionError, initialize } from 'redux-form';

// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import { toastr } from 'react-redux-toastr';
import { setSiteSettings } from '../../../actions/siteSettings';

async function submit(values, dispatch) {

  values.appAvailableStatus = Number(values.appAvailableStatus);
  const query = `
  query (
    $siteName: String,
    $siteTitle: String,
    $metaDescription: String,
    $metaKeyword: String,
    $logo: String,
    $facebookLink: String,
    $twitterLink: String,
    $instagramLink: String
    $homePageType: Int,
    $videoLink: String,
    $phoneNumberStatus: Int,
    $appAvailableStatus: Boolean,
    $playStoreUrl: String,
    $appStoreUrl: String,
    $email: String,
    $phoneNumber: String,
    $address: String,
    $appForceUpdate: String,
    $androidVersion: String,
    $iosVersion: String
  ) {
    updateSiteSettings (
      siteName: $siteName,
      siteTitle: $siteTitle,
      metaDescription: $metaDescription,
      metaKeyword: $metaKeyword,
      logo: $logo,
      facebookLink: $facebookLink,
      twitterLink: $twitterLink,
      instagramLink: $instagramLink,
      homePageType: $homePageType,
      videoLink: $videoLink,
      phoneNumberStatus: $phoneNumberStatus,
      appAvailableStatus: $appAvailableStatus,
      playStoreUrl: $playStoreUrl,
      appStoreUrl: $appStoreUrl,
      email: $email,
      phoneNumber: $phoneNumber,
      address: $address,
      appForceUpdate: $appForceUpdate,
      androidVersion: $androidVersion,
      iosVersion: $iosVersion
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
  if (data.updateSiteSettings.status === "success") {
    toastr.success("Update Settings", "Changes are updated!");
    dispatch(setSiteSettings());

  } else {
    toastr.error("Update Settings", "Updating Site Settings failed");
  }

}

export default submit;
