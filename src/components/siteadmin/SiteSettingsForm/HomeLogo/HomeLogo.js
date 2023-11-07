import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeLogo.css';
import cp from '../../../../components/commonStyle.css';

// Redux
import { connect } from 'react-redux';
import { doRemoveLogo, doUploadLogo, startLogoUploaderLoader, stopLogoUploaderLoader } from '../../../../actions/siteadmin/manageHomeLogo';

// Component
import Loader from '../../../Loader/Loader';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

// Asset
import defaultPic from '/public/AdminIcons/default.svg';
import DeleteIcon from '/public/AdminIcons/dlt.png';
import ImageUploadComponent from '../../ImageUploadComponent/ImageUploadComponent';

class Uploader extends React.Component {

  static propTypes = {
    homeLogoUploaderLoading: PropTypes.bool,
    doRemoveLogo: PropTypes.any.isRequired,
    getHomeLogoData: PropTypes.shape({
      loading: PropTypes.bool,
      getHomeLogo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    profilePictureData: {
      loading: true
    },
    homeLogoUploaderLoading: false
  };

  success = async (file, fromServer) => {
    const {doUploadLogo, getHomeLogoData: {getHomeLogo}, startLogoUploaderLoader, stopLogoUploaderLoader} = this.props;
    let fileName = fromServer.file.filename,
      oldPicture = getHomeLogo ? getHomeLogo.value : null,
      filePath = fromServer.file.path;
    await startLogoUploaderLoader();
    await doUploadLogo(fileName, filePath, oldPicture);  
    await stopLogoUploaderLoader();
  }

  render() {
    const { getHomeLogoData: { loading, getHomeLogo }, doRemoveLogo, homeLogoUploaderLoading } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Loader show={homeLogoUploaderLoading} type={"page"}>
            <div className={cp.picContainerMain}>
              <div className={cp.picContainer}>
                <div className={cx(cp.profilePic)}>
                  {
                    loading && <div className={cp.bannerImageBg} />
                  }
                  {
                    !loading && getHomeLogo != null && <div
                      style={{ backgroundImage: `url(/images/logo/${getHomeLogo.value})` }}
                      className={cp.bannerImageBg}
                    />
                  }
                  {
                    !loading && getHomeLogo === null && <div
                      style={{ backgroundImage: `url(${defaultPic})` }}
                      className={cp.profileImageBg}
                    />
                  }
                </div>
                {
                  !loading && getHomeLogo != null && <a href="javascript:void(0);" onClick={() => doRemoveLogo(getHomeLogo.value)}
                  className={cx(cp.trashIconNew, 'trashIconRTL')}>
                    <img src={DeleteIcon} alt='Delete' />
                  </a>
                }
              </div>
            </div>
          </Loader>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3)}>
          <div className={cx(cp.chooseBtnContainer, 'adminUploader')}>
            <ImageUploadComponent
              defaultMessage={formatMessage(messages.clickHeretoUploadLogo)}
              componentConfig={{
                iconFiletypes: ['.jpg', '.png', '.jpeg'],
                multiple: false,
                showFiletypeIcon: false,
                postUrl: '/uploadHomeLogo'
              }}
              loaderName={'homeLogoUploaderLoading'}
              success={this.success}
            >
            </ImageUploadComponent>
          </div>
        </Col>
      </Row >
    );
  }
}

const mapState = (state) => ({
  homeLogoUploaderLoading: state.siteSettings.homeLogoUploaderLoading
});

const mapDispatch = {
  doRemoveLogo,
  doUploadLogo,
  startLogoUploaderLoader,
  stopLogoUploaderLoader
};

export default compose(
  injectIntl,
  withStyles(s, cp),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getHomeLogo{
        getHomeLogo {
          id
          title
          name
          value
          type
        }
      }
    `, {
      name: 'getHomeLogoData',
      options: {
        ssr: false
      }
    }),
)(Uploader);