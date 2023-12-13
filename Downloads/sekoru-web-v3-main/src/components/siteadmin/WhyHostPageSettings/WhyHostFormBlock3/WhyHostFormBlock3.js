import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import {
  Button,
  Row,
  FormGroup,
  Col,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostFormBlock3.css';
import cs from '../../../../components/commonStyle.css';

import Image from '../WhyHostFormBlock1/Image'

// Translation
import messages from '../../../../locale/messages';
import submit from './submit';
import validate from './validate';
import CommonFormComponent from '../../../CommonField/CommonFormComponent';

class WhyHostFormBlock3 extends Component {


  render() {

    const { error, handleSubmit, submitting, whyBlock1loader, whyBlock2loader, whyBlockImage1, whyBlockImage2 } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(cs.adminContentPadding)}>
        <div className={s.sectionCenter}>
          <div className={cs.commonAdminBorderSection}>
            <h1 className={s.headerTitle}><FormattedMessage {...messages.WhyBecomeOwnerBlock3} /></h1>
            <form onSubmit={handleSubmit(submit)}>
              {error && <strong>{formatMessage(error)}</strong>}
              <FormGroup className={s.space3}>
                <div className={cx(s.siteContainer)}>
                  <label className={cs.labelTextNew} ><FormattedMessage {...messages.imageLabel} /> 1</label>
                  <Image image={whyBlockImage1} fieldName={"whyBlockImage1"} loader={whyBlock1loader} />
                </div>
              </FormGroup>
              <FormGroup className={s.space3}>
                <label className={cs.labelTextNew} ><FormattedMessage {...messages.whyBlockTitleLabel} /> 1</label>
                <Field
                  name="whyBlockTitle1"
                  type="text"
                  component={CommonFormComponent}
                  inputClass={cx(cs.formControlInput)}
                />
              </FormGroup>
              <FormGroup className={s.space3}>
                <label className={cs.labelTextNew} ><FormattedMessage {...messages.whyBlockContentLabel} /> 1</label>
                <Field
                  name="whyBlockContent1"
                  component={CommonFormComponent}
                  componentClass={'textarea'}
                />
              </FormGroup>
              <FormGroup className={s.space3}>
                <div className={cx(s.siteContainer)}>
                  <label className={cs.labelTextNew} ><FormattedMessage {...messages.imageLabel} /> 2</label>
                  <Image image={whyBlockImage2} fieldName={"whyBlockImage2"} loader={whyBlock2loader} />
                </div>
              </FormGroup>
              <FormGroup className={s.space3}>
                <label className={cs.labelTextNew} ><FormattedMessage {...messages.whyBlockTitleLabel} /> 2</label>
                <Field
                  name="whyBlockTitle2"
                  inputClass={cx(cs.formControlInput)}
                  type="text"
                  component={CommonFormComponent}
                />
              </FormGroup>
              <FormGroup className={s.space3}>
                <label className={cs.labelTextNew} ><FormattedMessage {...messages.whyBlockContentLabel} /> 2</label>
                <Field
                  name="whyBlockContent2"
                  component={CommonFormComponent}
                  componentClass={'textarea'}
                />
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

WhyHostFormBlock3 = reduxForm({
  form: 'WhyHostForm',
  validate
})(WhyHostFormBlock3);


const selector = formValueSelector('WhyHostForm');

const mapState = (state) => ({
  whyBlock1loader: state.loader.whyBlockImage1,
  whyBlock2Loader: state.loader.whyBlockImage2,
  whyBlockImage1: selector(state, 'whyBlockImage1'),
  whyBlockImage2: selector(state, 'whyBlockImage2'),
});

const mapDispatch = {
};

export default compose(
  withStyles(s, cs),
  injectIntl,
  connect(mapState, mapDispatch)
)(WhyHostFormBlock3);