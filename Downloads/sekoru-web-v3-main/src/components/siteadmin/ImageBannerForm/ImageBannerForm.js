import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Style
import {
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImageBannerForm.css';
import cp from '../../../components/commonStyle.css';

// Component
import Loader from '../../Loader';
import CommonFormComponent from '../../CommonField/CommonFormComponent';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import { url } from '../../../config';
import PictureImage from '../../../../public/AdminIcons/default.svg'
import ImageUploadComponent from '../ImageUploadComponent/ImageUploadComponent';
import { doUploadImageBanner, startBannerUploaderLoader, stopBannerUploaderLoader } from '../../../actions/siteadmin/manageImageBanner';

class ImageBannerForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
    bannerUploaderLoading: PropTypes.bool,
    doUploadImageBanner: PropTypes.any.isRequired
  };

  success = async (file, fromServer) => {
    const { image, startBannerUploaderLoader, stopBannerUploaderLoader, doUploadImageBanner } = this.props;
    let fileName = fromServer.file.filename;
    let oldImage = image != undefined ? image : null;
    await startBannerUploaderLoader();
    await doUploadImageBanner(fileName, oldImage);
    await stopBannerUploaderLoader();
  }

  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title, image, bannerUploaderLoading } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className='listPhotoContainer'>
        <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL', 'adminPhotoUplod', 'dzInputContainer')}>
          <div className={cx(cp.adminContentPadding)}>
            <div className={s.sectionCenter}>
              <div className={cp.commonAdminBorderSection}>
                <h1 className={s.headerTitle}><FormattedMessage {...messages.homepageBanner} /></h1>
                <form onSubmit={handleSubmit(submit)}>
                  {error && <strong>{formatMessage(error)}</strong>}
                  <FormGroup className={s.space3}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.adminBannerImage} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12} className={cp.textAlignCenter}>
                        <div className={'uploadDropZoneSection'}>
                          <ImageUploadComponent
                            defaultMessage={formatMessage(messages.photosPlaceholder)}
                            componentConfig={{
                              iconFiletypes: ['.jpg', '.png'],
                              multiple: false,
                              showFiletypeIcon: false,
                              postUrl: '/uploadBanner'
                            }}
                            loaderName={'bannerUploaderLoading'}
                            success={this.success}
                          ></ImageUploadComponent>
                          <img src={PictureImage} alt="PictureImage" className={'uploadDropZoneSectionImage'} />
                        </div>
                        <Loader
                          show={bannerUploaderLoading}
                          type={"page"}
                        >
                          {
                            image != null && <div
                              style={{ backgroundImage: `url(/images/banner/${image})` }}
                              className={s.bannerImageBg}
                            />
                          }
                        </Loader>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cp.labelTextNew}>
                      <FormattedMessage {...messages.adminTitleLabel} />
                    </ControlLabel>
                    <Field name="title" type="text" component={CommonFormComponent} label={formatMessage(messages.adminTitleLabel)} inputClass={cx(cp.formControlInput)} />
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cp.labelTextNew}>
                      <FormattedMessage {...messages.adminDescriptionLabel} />
                    </ControlLabel>
                    <Field name="description" type="text" component={CommonFormComponent} label={formatMessage(messages.adminDescriptionLabel)} inputClass={cx(cp.formControlInput)} />
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cp.labelTextNew}>
                      <FormattedMessage {...messages.buttonLabel} /> 1
                    </ControlLabel>
                    <Field name="buttonLabel" type="text" component={CommonFormComponent} label={formatMessage(messages.buttonLabel) + ' 1'} inputClass={cx(cp.formControlInput)} />
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cp.labelTextNew}>
                      <FormattedMessage {...messages.buttonLink} /> 1
                    </ControlLabel>
                    <Field name="buttonLink1" type="text" component={CommonFormComponent} isAddon={true} suffixLabel={url} label={formatMessage(messages.buttonLink) + ' 1'} inputClass={cx(cp.formControlInput)} />
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cp.labelTextNew}>
                      <FormattedMessage {...messages.buttonLabel} /> 2
                    </ControlLabel>
                    <Field name="buttonLabel2" type="text" component={CommonFormComponent} label={formatMessage(messages.buttonLabel) + ' 2'} inputClass={cx(cp.formControlInput)} />
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cp.labelTextNew}>
                      <FormattedMessage {...messages.buttonLink} /> 2
                    </ControlLabel>
                    <Field name="buttonLink2" type="text" component={CommonFormComponent} isAddon={true} suffixLabel={url} label={formatMessage(messages.buttonLink) + ' 2'} inputClass={cx(cp.formControlInput)} />
                  </FormGroup>
                  <FormGroup className={s.noMargin}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
                        <Button bsSize="small" className={cx(cp.btnPrimary, cp.btnlarge)} type="submit" disabled={submitting} >
                          <FormattedMessage {...messages.save} />
                        </Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }

}

ImageBannerForm = reduxForm({
  form: 'ImageBannerForm', // a unique name for this form
  validate
})(ImageBannerForm);

const mapState = (state) => ({
  bannerUploaderLoading: state.siteSettings.bannerUploaderLoading
});

const mapDispatch = {
  startBannerUploaderLoader,
  doUploadImageBanner,
  stopBannerUploaderLoader
};

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(ImageBannerForm)));