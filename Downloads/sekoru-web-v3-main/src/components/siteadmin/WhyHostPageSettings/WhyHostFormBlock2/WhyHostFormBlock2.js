import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

import cx from 'classnames';
import {
  Button,
  Row,
  FormGroup,
  Col,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostFormBlock2.css';
import cs from '../../../../components/commonStyle.css';
import CommonFormComponent from '../../../CommonField/CommonFormComponent';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';
class WhyHostFormBlock2 extends Component {


  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(cs.adminContentPadding)}>
        <div className={s.sectionCenter}>
          <div className={cs.commonAdminBorderSection}>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.WhyBecomeOwnerBlock2} /></h1>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cs.labelTextNew} ><FormattedMessage {...messages.earnBlockTitle} /></label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="earnBlockTitle1"
                        type="text"
                        inputClass={cx(cs.formControlInput)}
                        component={CommonFormComponent}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cs.labelTextNew} ><FormattedMessage {...messages.earnBlockContent} /> 1</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="earnBlockContent1"
                        component={CommonFormComponent}
                        componentClass={'textarea'}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.noMargin}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(cs.textAlignRight, 'textAlignLeftRTL')}>
                      <Button className={cx(cs.btnPrimary, cs.btnlarge)} type="submit" disabled={submitting}>
                        <FormattedMessage {...messages.save} />
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </form>
          </div>
        </div>
      </div>
    );
  }

}

WhyHostFormBlock2 = reduxForm({
  form: 'WhyHostForm',
  validate
})(WhyHostFormBlock2);

export default injectIntl(withStyles(s, cs)(WhyHostFormBlock2));