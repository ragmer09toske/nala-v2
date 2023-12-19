// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch request
import fetch from '../../core/fetch';

// Locale
import messages from '../../locale/messages';


// Redux Action
import { getListingData } from '../../actions/getListing';
import { manageListingSteps } from '../../actions/manageListingSteps';
import { getListingFieldsValues } from '../../actions/getListingFieldsValues';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

// For Redirect
import history from '../../core/history';
import { toastr } from 'react-redux-toastr';
import { getListingFields } from '../../actions/getListingFields';

async function update(values, dispatch) {

  let bedTypes = JSON.stringify(values.bedTypes);
  let variables = Object.assign({}, values, { bedTypes });

  dispatch(setLoaderStart('updateListing'));
  const query = `query (
  	$id: Int,
    $carType:String,
    $model:String,
    $transmission:String,
    $bedrooms:String,
    $year:String,
    $bedType:String,
    $beds:Int,
    $personCapacity:Int,
    $bathrooms:Float,
    $bathroomType:String,
    $country:String,
    $street:String,
    $buildingName:String,
    $city:String,
    $state:String,
    $zipcode:String,
  	$lat: Float,
  	$lng: Float,
  	$isMapTouched: Boolean,
    $amenities: [Int],
    $safetyAmenities: [Int],
    $carFeatures: [Int],
    $bedTypes: String,
    $make: String,
    $odometer: String,
  ) {
      updateListing (
        id: $id,
        carType:$carType,
        model:$model,
        transmission: $transmission,
        bedrooms: $bedrooms,
        year: $year
        bedType: $bedType
        beds: $beds
        personCapacity: $personCapacity
        bathrooms: $bathrooms
        bathroomType: $bathroomType
        country: $country
        street: $street
        buildingName: $buildingName
        city: $city
        state: $state
        zipcode: $zipcode
        lat: $lat
        lng: $lng
        isMapTouched: $isMapTouched,
        amenities: $amenities,
        safetyAmenities: $safetyAmenities,
        carFeatures: $carFeatures,
        bedTypes: $bedTypes,
        make: $make,
        odometer: $odometer,
      ) {
        status
      }
    }`;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables
    }),
    credentials: 'include'
  });

  const { data } = await resp.json();

  if (data.updateListing.status == "success") {
    await dispatch(manageListingSteps(values.id, 1));
    history.push('/become-a-owner/' + values.id + '/home');
    await dispatch(setLoaderComplete('updateListing'));
    await dispatch(getListingData(values.id));
    await dispatch(getListingFieldsValues("2", values.id));
  } else if (data.updateListing.status == "notLoggedIn") {
    dispatch(setLoaderComplete('updateListing'));
    throw new SubmissionError({ _error: messages.notLoggedIn });
  } else if (data.updateListing.status == "unSuccess") {
    toastr.error('error!', 'The data which you have selected is not available. Please try again');
    dispatch(setLoaderComplete('updateListing'));
    dispatch(getListingFields())
  } else {
    dispatch(setLoaderComplete('updateListing'));
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default update;
