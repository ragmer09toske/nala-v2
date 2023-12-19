import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import cx from 'classnames';
import {
  Button,
  FormGroup,
  Col,
  Panel,
  Grid,
  Row,
  ControlLabel
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import s from './WhyHostFormBlock7.css';
import cs from '../../../../components/commonStyle.css';

import Image from '../WhyHostFormBlock1/Image/Image';

// Translation
import messages from '../../../../locale/messages';
import submit from './submit';
import validate from './validate';
import CommonFormComponent from '../../../CommonField/CommonFormComponent';

class WhyHostFormBlock7 extends Component {

  constructor(props) {
    super(props);
    this.success = this.success.bind(this);
  }

  async success(file, fromServer) {
    const { change } = this.props;
    await change('image', fromServer && fromServer.file.filename);
  }


  render() {

    const { error, handleSubmit, submitting, reviewId, image, imageloader } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(cs.adminContentPadding)}>
        <div className={s.sectionCenter}>
          <div className={cs.commonAdminBorderSection}>
            <h1 className={s.headerTitle}><FormattedMessage {...messages.WhyBecomeOwnerBlock6} /></h1>
            <form onSubmit={handleSubmit(submit)}>
              {error && <strong>{formatMessage(error)}</strong>}
              <FormGroup className={cs.space3}>
                <ControlLabel className={s.labelTextNew}>
                  <FormattedMessage {...messages.name} />
                </ControlLabel>
                <Field
                  name="userName"
                  inputClass={cs.formControlInput}
                  type="text"
                  component={CommonFormComponent}
                  label={formatMessage(messages.name)}
                  maxLength={255}
                />
              </FormGroup>
              <FormGroup className={cs.space3}>
                <ControlLabel className={s.labelTextNew}>
                  <FormattedMessage {...messages.reviewContentLabel} />
                </ControlLabel>
                <Field
                  name="reviewContent"
                  componentClass={"textarea"}
                  component={CommonFormComponent}
                  label={formatMessage(messages.reviewContentLabel)}
                  maxLength={20000}
                />
              </FormGroup>
              <FormGroup className={s.space3}>
                <div className={cx(s.siteContainer)}>
                  <label><FormattedMessage {...messages.imageLabel} /></label>
                  <Image image={image} fieldName={"image"} loader={imageloader} />
                </div>
              </FormGroup>

              {reviewId && <Field
                name="isEnable"
                inputClass={cx(cs.formControlSelect, 'commonAdminSelect')}
                component={CommonFormComponent}
                label={formatMessage(messages.status)}
              >
                <option value={true}>{formatMessage(messages.enableLabel)}</option>
                <option value={false}>{formatMessage(messages.disableLabel)}</option>
              </Field>}
              <div className={cx(cs.textAlignRight, 'textAlignLeftRtl', cs.spaceTop3)}>
                <Button className={cx(cs.btnPrimary, cs.btnLarge)} type="submit" disabled={submitting}>
                  <FormattedMessage {...messages.save} />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

WhyHostFormBlock7 = reduxForm({
  form: 'WhyHostForm',
  validate
})(WhyHostFormBlock7);


const selector = formValueSelector('WhyHostForm');
const mapState = state => ({
  image: selector(state, 'image'),
  imageloader: state.loader.imageloader
});
const mapDispatch = {
  change
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(WhyHostFormBlock7)));