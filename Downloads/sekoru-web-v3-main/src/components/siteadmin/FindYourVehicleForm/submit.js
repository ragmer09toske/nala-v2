import { manageFindYourVehicleBlock } from '../../../actions/siteadmin/manageFindYourVehicleBlock';

async function submit(values, dispatch) {
  await dispatch(manageFindYourVehicleBlock(values));
}

export default submit;