import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import cx from 'classnames';
import {
  Button,
  Row,
  FormGroup,
  Col,
} from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostFormBlock5.css';
import cs from '../../../../components/commonStyle.css';

import Image from '../WhyHostFormBlock1/Image';

// Translation
import messages from '../../../../locale/messages';
import submit from './submit';
import validate from './validate';
import CommonFormComponent from '../../../CommonField/CommonFormComponent';
class WhyHostFormBlock5 extends Component {


  render() {

    const { error, handleSubmit, submitting, workImage4, workImage4loader } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(cs.adminContentPadding)}>
        <div className={s.sectionCenter}>
          <div className={cs.commonAdminBorderSection}>
            <h1 className={s.headerTitle}><FormattedMessage {...messages.WhyBecomeOwnerBlock5} /></h1>
            <form onSubmit={handleSubmit(submit)}>
              {error && <strong>{formatMessage(error)}</strong>}
              <FormGroup className={s.space3}>
                <label className={cs.labelTextNew} ><FormattedMessage {...messages.workTitleHeading} /></label>
                <Field
                  inputClass={cx(cs.formControlInput)}
                  name="workTitleHeading"
                  type="text"
                  component={CommonFormComponent}
                />
              </FormGroup>
              <FormGroup className={s.space3}>
                <div className={cx(s.siteContainer)}>
                  <label className={cs.labelTextNew} ><FormattedMessage {...messages.imageLabel} /></label>

                  <Image image={workImage4} fieldName={"workImage4"} loader={workImage4loader} />
                </div>
              </FormGroup>
              <FormGroup className={s.space3}>

                <label className={cs.labelTextNew} ><FormattedMessage {...messages.peaceTitleLabel} /> 1</label>

                <Field
                  name="peaceTitle1"
                  type="text"
                  inputClass={cx(cs.formControlInput)}
                  component={CommonFormComponent}
                />

              </FormGroup>
              <FormGroup className={s.space3}>

                <label className={cs.labelTextNew} ><FormattedMessage {...messages.peaceContentLabel} /> 1</label>

                <Field
                  name="peaceContent1"
                  componentClass={"textarea"}
                  component={CommonFormComponent}
                />

              </FormGroup>
              <FormGroup className={s.space3}>

                <label className={cs.labelTextNew} ><FormattedMessage {...messages.peaceTitleLabel} /> 2</label>

                <Field
                  name="peaceTitle2"
                  type="text"
                  inputClass={cx(cs.formControlInput)}
                  component={CommonFormComponent}
                />

              </FormGroup>
              <FormGroup className={s.space3}>
                <label className={cs.labelTextNew} ><FormattedMessage {...messages.peaceContentLabel} /> 2</label>
                <Field
                  name="peaceContent2"
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

WhyHostFormBlock5 = reduxForm({
  form: 'WhyHostForm',
  validate
})(WhyHostFormBlock5);

const selector = formValueSelector('WhyHostForm');

const mapState = (state) => ({
  workImage4loader: state.loader.workImage4,
  workImage4: selector(state, 'workImage4'),
});

const mapDispatch = {
};

export default compose(
  withStyles(s, cs),
  injectIntl,
  connect(mapState, mapDispatch)
)(WhyHostFormBlock5);