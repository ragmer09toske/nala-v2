import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.carCounterTitle1) {
    errors.carCounterTitle1 = messages.required;
  } else if(values.carCounterTitle1 && values.carCounterTitle1.trim() == '') {
    errors.carCounterTitle1 = messages.required;
  } else if(values.carCounterTitle1 && values.carCounterTitle1.length > 200) {
    errors.carCounterTitle1 = messages.exceedLimit;
  }

  if (!values.carCounterTitle2) {
    errors.carCounterTitle2 = messages.required;
  } else if(values.carCounterTitle2 && values.carCounterTitle2.trim() == '') {
    errors.carCounterTitle2 = messages.required;
  } else if(values.carCounterTitle2 && values.carCounterTitle2.length > 200) {
    errors.carCounterTitle2 = messages.exceedLimit;
  }

  if (!values.carCounterTitle3) {
    errors.carCounterTitle3 = messages.required;
  } else if(values.carCounterTitle3 && values.carCounterTitle3.trim() == '') {
    errors.carCounterTitle3 = messages.required;
  } else if(values.carCounterTitle3 && values.carCounterTitle3.length > 200) {
    errors.carCounterTitle3 = messages.exceedLimit;
  }

  if (!values.carCounterContent1) {
    errors.carCounterContent1 = messages.required;
  } else if(values.carCounterContent1 && values.carCounterContent1.trim() == '') {
    errors.carCounterContent1 = messages.required;
  } else if(values.carCounterContent1 && values.carCounterContent1.length > 400) {
    errors.carCounterContent1 = messages.exceedLimit;
  }

  if (!values.carCounterContent2) {
    errors.carCounterContent2 = messages.required;
  } else if(values.carCounterContent2 && values.carCounterContent2.trim() == '') {
    errors.carCounterContent2 = messages.required;
  } else if(values.carCounterContent2 && values.carCounterContent2.length > 400) {
    errors.carCounterContent2 = messages.exceedLimit;
  }

  if (!values.carBlockTitle1) {
    errors.carBlockTitle1 = messages.required;
  } else if(values.carBlockTitle1 && values.carBlockTitle1.trim() == '') {
    errors.carBlockTitle1 = messages.required;
  } else if(values.carBlockTitle1 && values.carBlockTitle1.length > 200) {
    errors.carBlockTitle1 = messages.exceedLimit;
  }

  if (!values.carBlockTitle2) {
    errors.carBlockTitle2 = messages.required;
  } else if(values.carBlockTitle2 && values.carBlockTitle2.trim() == '') {
    errors.carBlockTitle2 = messages.required;
  } else if(values.carBlockTitle2 && values.carBlockTitle2.length > 200) {
    errors.carBlockTitle2 = messages.exceedLimit;
  }

  if (!values.carBlockContent1) {
    errors.carBlockContent1 = messages.required;
  } else if(values.carBlockContent1 && values.carBlockContent1.trim() == '') {
    errors.carBlockContent1 = messages.required;
  } else if(values.carBlockContent1 && values.carBlockContent1.length > 400) {
    errors.carBlockContent1 = messages.exceedLimit;
  }

  if (!values.carTripTitle1) {
    errors.carTripTitle1 = messages.required;
  } else if(values.carTripTitle1 && values.carTripTitle1.trim() == '') {
    errors.carTripTitle1 = messages.required;
  } else if(values.carTripTitle1 && values.carTripTitle1.length > 200) {
    errors.carTripTitle1 = messages.exceedLimit;
  }

  if (!values.carTripTitle2) {
    errors.carTripTitle2 = messages.required;
  } else if(values.carTripTitle2 && values.carTripTitle2.trim() == '') {
    errors.carTripTitle2 = messages.required;
  } else if(values.carTripTitle2 && values.carTripTitle2.length > 200) {
    errors.carTripTitle2 = messages.exceedLimit;
  }

  if (!values.carTripTitle3) {
    errors.carTripTitle3 = messages.required;
  } else if(values.carTripTitle3 && values.carTripTitle3.trim() == '') {
    errors.carTripTitle3 = messages.required;
  } else if(values.carTripTitle3 && values.carTripTitle3.length > 200) {
    errors.carTripTitle3 = messages.exceedLimit;
  }

  if (!values.carTripContent1) {
    errors.carTripContent1 = messages.required;
  } else if(values.carTripContent1 && values.carTripContent1.trim() == '') {
    errors.carTripContent1 = messages.required;
  } else if(values.carTripContent1 && values.carTripContent1.length > 400) {
    errors.carTripContent1 = messages.exceedLimit;
  }

  if (!values.carTripContent2) {
    errors.carTripContent2 = messages.required;
  } else if(values.carTripContent2 && values.carTripContent2.trim() == '') {
    errors.carTripContent2 = messages.required;
  } else if(values.carTripContent2 && values.carTripContent2.length > 400) {
    errors.carTripContent2 = messages.exceedLimit;
  }

  if (!values.carTripContent3) {
    errors.carTripContent3 = messages.required;
  } else if(values.carTripContent3 && values.carTripContent3.trim() == '') {
    errors.carTripContent3 = messages.required;
  } else if(values.carTripContent3 && values.carTripContent3.length > 400) {
    errors.carTripContent3 = messages.exceedLimit;
  }
  

  return errors
}

export default validate;