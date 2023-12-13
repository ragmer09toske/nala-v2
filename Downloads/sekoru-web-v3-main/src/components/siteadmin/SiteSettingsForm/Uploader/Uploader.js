import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Uploader.css';
import cp from '../../../../components/commonStyle.css';


// Redux
import { connect } from 'react-redux';
import { doRemoveLogo, doUploadLogo } from '../../../../actions/siteadmin/manageLogo';
import { setLoaderStart, setLoaderComplete } from '../../../../actions/loader/loader';

// Component
import Loader from '../../../Loader';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

// Asset
import defaultPic from '/public/AdminIcons/default.svg';
import DeleteIcon from '/public/AdminIcons/dlt.png';
import ImageUploadComponent from '../../ImageUploadComponent/ImageUploadComponent'


class Uploader extends React.Component {

  static propTypes = {
    logoUploaderLoading: PropTypes.bool,
    doRemoveLogo: PropTypes.any.isRequired,
    getLogoData: PropTypes.shape({
      loading: PropTypes.bool,
      getLogo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    profilePictureData: {
      loading: true
    },
    logoUploaderLoading: false
  };

  success = async (file, fromServer) => {
    const { doUploadLogo, getLogoData: { getLogo }, setLoaderStart,  setLoaderComplete} = this.props;
    let fileName = fromServer.file.filename,
     oldPicture = getLogo ? getLogo.value : null,
     filePath = fromServer.file.path;
    await doUploadLogo(fileName, filePath, oldPicture);
  }

  render() {
    const { getLogoData: { loading, getLogo }, doRemoveLogo, logoUploaderLoading } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Loader
            show={logoUploaderLoading}
            type={"page"}
          >
            <div className={cp.picContainerMain}>
              <div className={cp.picContainer}>
                <div className={cp.profilePic}>
                  {
                    loading && <div className={cp.bannerImageBg} />
                  }
                  {
                    !loading && getLogo != null && <div
                      style={{ backgroundImage: `url(/images/logo/${getLogo.value})` }}
                      className={cp.bannerImageBg}
                    />
                  }
                  {
                    !loading && getLogo === null && <div
                      style={{ backgroundImage: `url(${defaultPic})` }}
                      className={cp.profileImageBg}
                    />
                  }
                </div>
                {
                  !loading && getLogo != null && <a href="javascript:void(0);" onClick={() => doRemoveLogo(getLogo.value)} className={cx(cp.trashIconNew, 'trashIconRTL')}>
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
                postUrl: '/uploadLogo'
              }}
              loaderName={'logoUploaderLoading'}
              success={this.success}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  logoUploaderLoading: state.loader.logoUploaderLoading
});

const mapDispatch = {
  doRemoveLogo,
  doUploadLogo,
  setLoaderStart,
  setLoaderComplete
};

export default compose(
  injectIntl,
  withStyles(s, cp),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getLogo{
        getLogo {
          id
          title
          name
          value
          type
        }
      }
    `, {
    name: 'getLogoData',
    options: {
      ssr: false
    }
  }),
)(Uploader);