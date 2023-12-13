import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { connect } from 'react-redux';

// Style
import cx from 'classnames';
import {
  Button,
  Row,
  FormGroup,
  Col,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FooterBlockForm.css';
import cs from '../../../components/commonStyle.css';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import CommonFormComponent from '../../CommonField/CommonFormComponent';

class FooterBlockForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };



  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.sectionCenter}>
          <div className={cs.commonAdminBorderSection}>
            <h1 className={cx(cs.commonTotalText, cs.fontWeightBold, cs.spaceBottom12)}><FormattedMessage {...messages.footerBlockLabel} /></h1>
            <form onSubmit={handleSubmit(submit)}>
              {error && <strong>{formatMessage(error)}</strong>}
              <FormGroup className={s.space3}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cs.labelTextNew} ><FormattedMessage {...messages.adminTitleLabel} /> 1</label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="title1"
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
                    <label className={cs.labelTextNew} ><FormattedMessage {...messages.contentLabel} /> 1</label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="content1"
                      component={CommonFormComponent}
                      componentClass={'textarea'}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className={s.space3}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cs.labelTextNew} ><FormattedMessage {...messages.adminTitleLabel} /> 2</label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="title2"
                      inputClass={cx(cs.formControlInput)}
                      type="text"
                      component={CommonFormComponent}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className={s.space3}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cs.labelTextNew} ><FormattedMessage {...messages.contentLabel} /> 2</label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} >
                    <Field
                      name="content2"
                      component={CommonFormComponent}
                      componentClass={'textarea'}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className={s.space3}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cs.labelTextNew} ><FormattedMessage {...messages.adminTitleLabel} /> 3</label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="title3"
                      inputClass={cx(cs.formControlInput)}
                      type="text"
                      component={CommonFormComponent}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className={s.space3}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cs.labelTextNew} ><FormattedMessage {...messages.contentLabel} /> 3</label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="content3"
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

FooterBlockForm = reduxForm({
  form: 'FooterBlockForm', // a unique name for this form
  validate
})(FooterBlockForm);

export default injectIntl(withStyles(s, cs)(FooterBlockForm));