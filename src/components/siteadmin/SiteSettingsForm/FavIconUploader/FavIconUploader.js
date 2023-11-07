import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, gql, compose } from 'react-apollo';

// React Redux
import { connect } from 'react-redux';
import { setLoaderStart, setLoaderComplete } from '../../../../actions/loader/loader';

import {
    Row,
    Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './FavIconUploader.css';
import bt from '../../../../components/commonStyle.css';


// Internal Component
import Loader from '../../../Loader/Loader';

// Locale
import messages from '../../../../locale/messages';
import { deleteFavIcon, updateFaviconLogo } from '../../../../actions/siteadmin/manageLogo';
import ImageUploadComponent from '../../ImageUploadComponent/ImageUploadComponent';
import defaultPic from '/public/AdminIcons/default.svg';

class FavIconUploader extends React.Component {

    static propTypes = {
        favIconLoader: PropTypes.bool,
        data: PropTypes.object
    };

    static defaultProps = {
        favIconLoader: false
    };

    success = async (file, fromServer) => {
        const { updateFaviconLogo, data: { getSiteSettingsLogo }, setLoaderStart, setLoaderComplete } = this.props;
        let fileName = fromServer.file.filename,
            oldPicture = getSiteSettingsLogo ? getSiteSettingsLogo.value : null;
        await setLoaderStart('favIconLoader');
        await updateFaviconLogo('Favicon Logo', 'faviconLogo', fileName, oldPicture);
        await setLoaderComplete('favIconLoader');
    }

    render() {
        const { favIconLoader, data: { loading, getSiteSettingsLogo = {} }, faviconLogo, deleteFavIcon } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(s.textAlignCenter, s.positionRelative)}>
                    <Loader
                        show={favIconLoader}
                        type={"page"}
                    >
                        <div className={bt.picContainerMain}>
                            <div className={cx(bt.picContainer, 'bgBlack')}>
                                <div className={bt.profilePic}>
                                    {!loading && getSiteSettingsLogo &&
                                        <div
                                            // timestamp usage for refresh the image when upload new image
                                            style={{ backgroundImage: `url(/images/favicon/${getSiteSettingsLogo.value})` }}
                                            className={bt.bannerImageBg}
                                        />
                                    }
                                    {
                                        !loading && (!getSiteSettingsLogo || getSiteSettingsLogo && !getSiteSettingsLogo.value) && <div
                                            style={{ backgroundImage: `url(${defaultPic})` }}
                                            className={bt.profileImageBg}
                                        />
                                    }
                                    {
                                        loading && <div className={bt.bannerImageBg} />
                                    }
                                </div>
                            </div>
                        </div>
                    </Loader>
                    <p className={cx(s.pngFontSize, 'pngFontSizeRTL')}><FormattedMessage {...messages.pngOnlyLabel} /></p>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop3)}>
                    <div className={cx(bt.chooseBtnContainer, 'adminUploader')}>
                        <ImageUploadComponent
                            defaultMessage={formatMessage(messages.clickHeretoUploadLogo)}
                            componentConfig={{
                                iconFiletypes: ['.png'],
                                multiple: false,
                                showFiletypeIcon: false,
                                postUrl: '/uploadFavIcon'
                            }}
                            loaderName={'favIconLoader'}
                            success={this.success}
                            getSiteSettingsLogo={getSiteSettingsLogo}
                        >
                        </ImageUploadComponent>
                    </div>
                </Col>
            </Row>
        );
    }
}

const mapState = (state) => ({
    favIconLoader: state.loader.favIconLoader
});

const mapDispatch = {
    deleteFavIcon,
    updateFaviconLogo,
    setLoaderStart,
    setLoaderComplete
};

export default compose(
    injectIntl,
    withStyles(s, bt),
    connect(mapState, mapDispatch),
    graphql(gql`
        query getSiteSettingsLogo($title: String!, $name: String!) {
            getSiteSettingsLogo(title:$title, name: $name) {
                status
                errorMessage
                title
                name
                value
            }
        }
    `, {
        options: {
            ssr: true,
            variables: {
                title: 'Favicon Logo',
                name: 'faviconLogo'
            }
        }
    }),
)(FavIconUploader);