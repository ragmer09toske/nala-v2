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
import s from './WhyHostFormBlock1.css';
import cs from '../../../../components/commonStyle.css';
import Image from './Image'

// Translation
import messages from '../../../../locale/messages';
import submit from './submit';
import validate from './validate';
import CommonFormComponent from '../../../CommonField/CommonFormComponent';
class WhyHostFormBlock1 extends Component {


  render() {

    const { error, handleSubmit, submitting, hostBannerloader, hostImageLoader, bannerImage, hostImage } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(cs.adminContentPadding)}>
        <div className={s.sectionCenter}>
          <div className={cs.commonAdminBorderSection}>
            <h1 className={s.headerTitle}><FormattedMessage {...messages.WhyBecomeOwnerBlock1} /></h1>
            <form onSubmit={handleSubmit(submit)}>
              {error && <strong>{formatMessage(error)}</strong>}
              <FormGroup className={s.space3}>
              <div className={cx(s.siteContainer)}>
                <label className={cx(cs.labelTextNew)}><FormattedMessage {...messages.ownerBanner} /></label>
                  <Image image={bannerImage} fieldName={"hostBannerImage1"} loader={hostBannerloader} />
                </div>
              </FormGroup>
              <FormGroup className={s.space3}>
              <div className={cx(s.siteContainer)}>
                <label className={cx(cs.labelTextNew)}><FormattedMessage {...messages.imageLabel} /></label>
                  <Image image={hostImage} fieldName={"hostBannerImage2"} loader={hostImageLoader} />
                </div>
              </FormGroup>
              <FormGroup className={s.space3}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cs.labelTextNew}><FormattedMessage {...messages.hostBannerTitle} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="hostBannerTitle1"
                      type="text"
                      component={CommonFormComponent}
                      inputClass={cx(cs.formControlInput)}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className={s.space3}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cs.labelTextNew}><FormattedMessage {...messages.hostBannerContent} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="hostBannerContent1"
                      component={CommonFormComponent}
                      componentClass={'textarea'}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className={s.space3}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cs.labelTextNew}><FormattedMessage {...messages.contentLabel} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="hostBannerContent2"
                      component={CommonFormComponent}
                      inputClass={cx(cs.formControlInput)}
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

WhyHostFormBlock1 = reduxForm({
  form: 'WhyHostForm',
  validate
})(WhyHostFormBlock1);

const selector = formValueSelector('WhyHostForm');

const mapState = (state) => ({
  hostBannerloader: state.loader.hostBannerImage1,
  hostImageLoader: state.loader.hostBannerImage2,
  bannerImage: selector(state, 'hostBannerImage1'),
  hostImage: selector(state, 'hostBannerImage2'),
});

const mapDispatch = {
};

export default compose(
  withStyles(s, cs),
  injectIntl,
  connect(mapState, mapDispatch)
)(WhyHostFormBlock1);