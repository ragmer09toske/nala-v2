import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Style
import cx from 'classnames';
import {
  Button,
  Row,
  FormGroup,
  Col,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StaticBlockForm.css';
import cs from '../../../components/commonStyle.css';
import BlockUploader from './BlockUploader';
import Uploader from './Uploader';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import CommonFormComponent from '../../CommonField/CommonFormComponent';

class StaticBlockForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };


  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h1 className={s.headerTitle}><FormattedMessage {...messages.footerHeaderBlock} /></h1>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <label className={cs.labelTextNew} ><FormattedMessage {...messages.adminTitleLabel} /></label>
                <Field
                  name="carTripTitle1"
                  type="text"
                  component={CommonFormComponent}
                  inputClass={cx(cs.formControlInput)}
                />
                <Row>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <h3 className={cx(cs.commonContentText, cs.spaceBottom3, cs.spaceTop3)}><FormattedMessage {...messages.footerImageBlock} /> #1</h3>
                    <div className={cx(s.siteContainer)}>
                      <label className={cs.labelTextNew} ><FormattedMessage {...messages.imageLabel} /></label>
                      <BlockUploader />
                    </div>
                    <label className={cx(cs.labelTextNew, cs.spaceTop3)} ><FormattedMessage {...messages.adminTitleLabel} /></label>
                    <Field
                      name="carTripTitle2"
                      type="text"
                      component={CommonFormComponent}
                      inputClass={cx(cs.formControlInput, cs.spaceBottom3)}
                    />
                    <label className={cs.labelTextNew} ><FormattedMessage {...messages.contentLabel} /></label>
                    <Field
                      name="carTripContent2"
                      component={CommonFormComponent}
                      componentClass={'textarea'}
                    />
                  </Col>

                  <Col lg={6} md={6} sm={12} xs={12}>
                    <h3 className={cx(cs.commonContentText, cs.spaceBottom3, cs.spaceTop3)}><FormattedMessage {...messages.footerImageBlock} /> #2</h3>
                    <div className={cx(s.siteContainer)}>
                      <label className={cs.labelTextNew} ><FormattedMessage {...messages.imageLabel} /></label>
                      <Uploader />
                    </div>
                    <label className={cx(cs.labelTextNew, cs.spaceTop3)} ><FormattedMessage {...messages.adminTitleLabel} /></label>
                    <Field
                      name="carTripTitle3"
                      type="text"
                      component={CommonFormComponent}
                      inputClass={cx(cs.formControlInput, cs.spaceBottom3)}
                    />
                    <label className={cs.labelTextNew} ><FormattedMessage {...messages.contentLabel} /></label>
                    <Field
                      name="carTripContent3"
                      component={CommonFormComponent}
                      componentClass={'textarea'}
                    />
                  </Col>
                </Row>
                <FormGroup>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(cs.textAlignRight, 'textAlignLeftRTL', cs.spaceTop3)}>
                      <Button className={cx(cs.btnPrimary, cs.btnlarge)} type="submit" disabled={submitting}>
                        <FormattedMessage {...messages.save} />
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

StaticBlockForm = reduxForm({
  form: 'StaticBlockForm', // a unique name for this form
  validate
})(StaticBlockForm);

export default injectIntl(withStyles(s, cs)(StaticBlockForm));