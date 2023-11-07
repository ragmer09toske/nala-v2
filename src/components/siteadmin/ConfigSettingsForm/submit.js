import { updateConfigSettings } from "../../../actions/siteadmin/ConfigSettings/updateConfigSettings";

async function submit(values,dispatch){
   await dispatch(updateConfigSettings(values))
}

export default submit;