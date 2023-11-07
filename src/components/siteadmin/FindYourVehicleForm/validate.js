import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.heading) {
    errors.heading = messages.required;
  } else if (values.heading && values.heading.trim() == '') {
    errors.heading = messages.required;
  }

  if (!values.buttonLabel) {
    errors.buttonLabel = messages.required;
  } else if (values.buttonLabel && values.buttonLabel.trim() == '') {
    errors.buttonLabel = messages.required;
  }

  if (!values.buttonLink) {
    errors.buttonLink = messages.required;
  } else if (values.buttonLink && values.buttonLink.trim() == '') {
    errors.buttonLink = messages.required;
  }

  if (!values.content1) {
    errors.content1 = messages.required;
  } else if (values.content1 && values.content1.trim() == '') {
    errors.content1 = messages.required;
  }

  if (!values.content2) {
    errors.content2 = messages.required;
  } else if (values.content2 && values.content2.trim() == '') {
    errors.content2 = messages.required;
  }

  if (!values.content3) {
    errors.content3 = messages.required;
  } else if (values.content3 && values.content3.trim() == '') {
    errors.content3 = messages.required;
  }

  if (values.content4 && values.content4.trim() == '') {
    errors.content4 = messages.required;
  }

  if (values.content5 && values.content5.trim() == '') {
    errors.content5 = messages.required;
  }



  return errors
}

export default validate;