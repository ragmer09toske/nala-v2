import uploadWhyHostData from '../../../actions/siteadmin/uploadWhyHostData'
import { toastr } from 'react-redux-toastr';

async function submit(values, dispatch) {

	let dataError = false;

	values.dataList && values.dataList.map((item) => {
		item.fileName ? dataError = false : dataError = true
	})

	let dataList = values.dataList && values.dataList.length > 0
		?
		JSON.stringify(values.dataList) : JSON.stringify([]);


	await dispatch(
		uploadWhyHostData(dataList)
	)

}

export default submit;