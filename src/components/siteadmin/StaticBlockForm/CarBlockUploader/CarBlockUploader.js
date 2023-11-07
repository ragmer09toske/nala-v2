import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CarBlockUploader.css';
import cp from '../../../../components/commonStyle.css';
import { formValueSelector, change } from 'redux-form';

// Redux
import { connect } from 'react-redux';
import { doRemoveStaticImage, startStaticImage2Loader, doUploadStaticImage, stopStaticImageLoader } from '../../../../actions/siteadmin/manageStaticBlock';


// Component
import Loader from '../../../Loader/Loader';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

// Asset
import defaultPic from '/public/AdminIcons/default.svg';
import DeleteIcon from '/public/AdminIcons/dlt.png';
import ImageUploadComponent from '../../ImageUploadComponent/ImageUploadComponent';

class CarBlockUploader extends React.Component {

  static propTypes = {
    loader: PropTypes.bool,
    doRemoveStaticImage: PropTypes.any.isRequired,
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
    loader: false
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  success = async (file, fromServer) => {
    const { doUploadStaticImage, getLogoData: { loading, getStaticInfo }, change, stopStaticImageLoader, startStaticImage2Loader } = this.props;
    let fileName = fromServer.file.filename;
    let oldPicture = getStaticInfo ? getStaticInfo[0].value : null;
    let filePath = fromServer.file.path;
    startStaticImage2Loader();
    doUploadStaticImage(fileName, filePath, oldPicture, 'carBlockImage1');
    await change('StaticBlockForm', 'carBlockImage1', fileName);
    stopStaticImageLoader();
  }

  async handleChange(e) {
    const { change } = this.props;
    await change('carBlockImage1', null);
  }

  render() {
    const { getLogoData: { loading, getStaticInfo }, image, doRemoveStaticImage, loader } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Loader show={loader} type={"page"}>
            <div className={cp.picContainerMain}>
              <div className={cp.picContainer}>
                <div className={cp.profilePic}>
                  {
                    loading && <div className={s.bannerImageBg} />
                  }
                  {
                    !loading && getStaticInfo && getStaticInfo[0].value && <div
                      style={{ backgroundImage: `url(/images/home/${getStaticInfo[0].value})` }}
                      className={s.bannerImageBg}
                    />
                  }
                  {
                    !loading && getStaticInfo && !getStaticInfo[0].value && <div
                      style={{ backgroundImage: `url(${defaultPic})` }}
                      className={cp.profileImageBg}
                    />
                  }
                  {
                    !loading && getStaticInfo && getStaticInfo[0].value && <a href="javascript:void(0);" onClick={() => doRemoveStaticImage(getStaticInfo[0].image, 'carBlockImage1')}
                      className={cx(cp.trashIconNew, 'trashIconRTL')}>
                      <img src={DeleteIcon} />
                    </a>
                  }
                </div>
              </div>
            </div>
          </Loader>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.fullWidth, cp.btnPrimaryBorder, cp.btnlarge, s.noPadding, 'adminUploader')}>
            <ImageUploadComponent
              defaultMessage={formatMessage(messages.clickHeretoUploadImage)}
              componentConfig={{
                iconFiletypes: ['.jpg', '.png', '.jpeg'],
                multiple: false,
                showFiletypeIcon: false,
                postUrl: '/uploadHomeBanner'
              }}
              loaderName={'loader'}
              success={this.success}
            >
            </ImageUploadComponent>
          </Col>
        </Col>
      </Row>
    );
  }
}
const selector = formValueSelector('StaticBlockForm');

const mapState = (state) => ({
  loader: state.homeBannerImages.loader,
  // image: selector(state, 'blockImage1')
});

const mapDispatch = {
  doRemoveStaticImage,
  change,
  startStaticImage2Loader,
  doUploadStaticImage,
  stopStaticImageLoader
};

export default compose(
  injectIntl,
  withStyles(s, cp),
  connect(mapState, mapDispatch),
  graphql(gql`
  query ($name: String) {
    getStaticInfo(name: $name) {
      name
      value
    }
  }
    `, {
    name: 'getLogoData',
    options: {
      ssr: false,
      variables: {
        name: 'carBlockImage1'
      },
    }
  }),
)(CarBlockUploader);