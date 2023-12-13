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
import cs from '../../../../components/commonStyle.css';

// Redux
import { connect } from 'react-redux';
import { change } from 'redux-form'
import { doRemoveLocation, doUploadLocation, startLocationUploaderLoader, endLocationUploaderLoader } from '../../../../actions/siteadmin/manageLocationImage';

// Component
import Avatar from '../../../Avatar';
import Loader from '../../../Loader';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

// Asset
import defaultPic from '/public/AdminIcons/default.svg';
import ImageUploadComponent from '../../ImageUploadComponent/ImageUploadComponent';

class Uploader extends React.Component {

  static propTypes = {
    values: PropTypes.any,
    locationUploaderLoading: PropTypes.bool,
    loading: PropTypes.bool,
    doRemoveLocation: PropTypes.any.isRequired,
  };

  static defaultProps = {
    locationUploaderLoading: false,
  };

  success = async (file, fromServer) => {
    const { doUploadLocation, values, change, startLocationUploaderLoader, endLocationUploaderLoader } = this.props;
    let fileName = fromServer.file.filename;
    let oldPicture = values.image != null ? values.image : null;
    let filePath = fromServer.file.path;
    let image = fileName;
    await startLocationUploaderLoader();
    doUploadLocation(image, filePath, oldPicture, values.id);
    await change('EditPopularLocation', 'image', fileName);
    await endLocationUploaderLoader();
  }

  render() {
    const { doRemoveLocation, locationUploaderLoading, values } = this.props;
    const { formatMessage } = this.props.intl;

    let loading = true;
    if (values) {
      loading = false;
    }
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Loader show={locationUploaderLoading} type={"page"}>
            <div className={cs.picContainerMain}>
              <div className={cs.picContainer}>
                {
                  loading && <div className={s.bannerImageBg} />
                }
                {
                  !loading && values.image != null && <div
                    style={{ backgroundImage: `url(/images/popularLocation/medium_${values.image})` }}
                    className={s.bannerImageBg}
                  />
                }
                {
                  !loading && values.image === null && <div
                    style={{ backgroundImage: `url(${defaultPic})` }}
                    className={cs.profileImageBg}
                  />
                }
              </div>
            </div>
          </Loader>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <div className={cx(cs.chooseBtnContainer, 'adminUploader')}>
            <ImageUploadComponent
              defaultMessage={formatMessage(messages.clickHeretoUploadImage)}
              componentConfig={{
                iconFiletypes: ['.jpg', '.png'],
                multiple: false,
                showFiletypeIcon: false,
                postUrl: '/uploadLocation'
              }}
              loaderName={'locationUploaderLoading'}
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
  locationUploaderLoading: state.popularLocation.locationUploaderLoading,
});

const mapDispatch = {
  doRemoveLocation,
  startLocationUploaderLoader,
  endLocationUploaderLoader,
  doUploadLocation,
  change
};

export default compose(injectIntl, withStyles(s, cs), connect(mapState, mapDispatch))(Uploader);