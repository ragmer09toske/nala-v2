import React, { Component } from 'react';
import { compose } from 'react-apollo';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Image.css';
import cs from '../../../../../components/commonStyle.css';
import Loader from '../../../../Loader/Loader';

import { change } from 'redux-form';
import { setLoaderStart, setLoaderComplete } from '../../../../../actions/loader/loader';
import messages from '../../../../../locale/messages';
import { FormattedMessage, injectIntl } from 'react-intl';

// Asset
import defaultPic from '/public/AdminIcons/default.svg';
import ImageUploadComponent from '../../../ImageUploadComponent/ImageUploadComponent';
import { connect } from 'react-redux';
class Image extends React.Component {

  static defaultProps = {
    loader: false
  };

  success = async (file, fromServer) => {
    const { change, setLoaderStart, setLoaderComplete, fieldName } = this.props;
    let fileName = fromServer.file.filename;
    await setLoaderStart(fieldName);
    await change('WhyHostForm', fieldName, fileName);
    await setLoaderComplete(fieldName);
}

  render() {
    const { loader, image, fieldName } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <Loader
            show={loader}
            type={"page"}
          >
            <div className={cs.picContainerMain}>
              <div className={cs.picContainer}>
                {
                  image && <div
                    style={{ backgroundImage: `url(/images/home/${image})` }}
                    className={s.bannerImageBg}
                  />
                }
                {
                  !image && <div
                    style={{ backgroundImage: `url(${defaultPic})` }}
                    className={cs.profileImageBg}
                  />
                }
              </div>
            </div>
          </Loader>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop3)}>
        <div className={cx(cs.chooseBtnContainer, 'adminUploader')}>
            <ImageUploadComponent
              defaultMessage={formatMessage(messages.clickHeretoUploadImage)}
              componentConfig={{
                iconFiletypes: ['.jpg', '.png', '.jpeg'],
                multiple: false,
                showFiletypeIcon: false,
                postUrl: '/uploadHomeBanner'
              }}
              loaderName={'staticImageLoading'}
              success={this.success}
            >
            </ImageUploadComponent>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
});

const mapDispatch = {
  setLoaderStart,
  setLoaderComplete,
  change
};

export default compose(
  withStyles(s, cs), 
  injectIntl, 
  connect(mapState, mapDispatch)
  )(Image);