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

// Redux Form
import { formValueSelector, change } from 'redux-form';
import { doRemoveLocation, startLocationUploaderLoader, endLocationUploaderLoader } from '../../../../actions/siteadmin/manageLocationImage';

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
    image: PropTypes.any,
    locationUploaderLoading: PropTypes.bool,
    doRemoveLocation: PropTypes.any.isRequired,
    startLocationUploaderLoader: PropTypes.any.isRequired,
    endLocationUploaderLoader: PropTypes.any.isRequired,
  };

  static defaultProps = {
    locationUploaderLoading: false,
  };

  success = async (file, fromServer) => {
    const { doUploadLocation, change, startLocationUploaderLoader, endLocationUploaderLoader } = this.props;
    let fileName = fromServer.file.filename;
    startLocationUploaderLoader();
    await change('AddPopularLocation', 'image', fileName);
    endLocationUploaderLoader();
  }

  render() {
    const { loading, locationUploaderLoading, image } = this.props;
    const { formatMessage } = this.props.intl;

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
                  !loading && image != null &&
                  <div
                    style={{ backgroundImage: `url(/images/popularLocation/${image})` }}
                    className={s.bannerImageBg}
                  />
                }
                {
                  !loading && image === undefined && <div
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

const selector = formValueSelector('AddPopularLocation');

const mapState = (state) => ({
  locationUploaderLoading: state.popularLocation.locationUploaderLoading,
  image: selector(state, 'image')
});

const mapDispatch = {
  doRemoveLocation,
  startLocationUploaderLoader,
  endLocationUploaderLoader,
  change,
};

export default compose(injectIntl, withStyles(s, cs), connect(mapState, mapDispatch))(Uploader);