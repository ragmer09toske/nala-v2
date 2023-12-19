import messages from '../../../locale/messages';


const validate = (values) => {
  const errors = {};

  if (!values.dataList || !values.dataList.length) {
    errors.dataList = { _error: messages.required }
  } else {
    const documentArrayErrors = [];

    values.dataList.forEach((document, index) => {
      const documentErrors = {}

      if (!document || !document.imageName) {
        documentErrors.imageName = messages.required;
        documentArrayErrors[index] = documentErrors;
      }

      if (!document || !document.title) {
        documentErrors.title = messages.required;
        documentArrayErrors[index] = documentErrors
      } else if (document.title && document.title.trim() == '') {
        documentErrors.title = messages.required;
        documentArrayErrors[index] = documentErrors;
      }

      if (!document || !document.buttonLabel) {
        documentErrors.buttonLabel = messages.required;
        documentArrayErrors[index] = documentErrors
      } else if (document.buttonLabel && document.buttonLabel.trim() == '') {
        documentErrors.buttonLabel = messages.required;
        documentArrayErrors[index] = documentErrors;
      }

    })

    if (documentArrayErrors.length) {
      errors.dataList = documentArrayErrors;
    }
  }

  return errors;
}

export default validate;