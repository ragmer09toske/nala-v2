import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from '../Link';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Logo.css';
import cx from 'classnames';
import history from '../../core/history';
// Locale
import messages from '../../locale/messages';
class Logo extends Component {
    static propTypes = {
        siteName: PropTypes.string.isRequired,
        logoImage: PropTypes.string,
        link: PropTypes.string,
        className: PropTypes.string,
        logoHeight: PropTypes.string,
        logoWidth: PropTypes.string,
        showMenu: PropTypes.bool,
    };

    static defaultProps = {
        siteName: null,
        logoImage: null,
        link: '/',
        logoHeight: '34',
        logoWidth: '34',
        showMenu: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            location: '',
        };
    }

    rederLogo = () => {
        const { siteName, logoImage, showMenu, layoutType, homePageLogo } = this.props;
        const { location } = this.state;
        return (
            <>
                {
                    homePageLogo && location && location === '/' && layoutType != 2 &&
                    <img src={"images/logo/" + homePageLogo} className={cx(!showMenu ? 'displayBlock' : 'displayNone')} />
                }
                {
                    homePageLogo && logoImage && location && location === '/' && layoutType == 2 &&
                    <img src={"/images/logo/" + logoImage} className={cx(!showMenu ? 'displayBlock' : 'displayNone')} />
                }
                {
                    !homePageLogo && location && location === '/' && logoImage &&
                    <img src={"/images/logo/" + logoImage} />
                }
                {
                    logoImage && location && location !== '/' && <img src={"/images/logo/" + logoImage} />
                }
                {
                    !homePageLogo && !logoImage && siteName && <span className={cx({ [s.logoColor]: (location && (location !== '/' || (location == '/' && layoutType == 2))) }, s.whiteColor)}>{siteName}</span>
                }
                {
                    !logoImage && homePageLogo && location !== '/' && siteName && <span className={s.logoColor}>{siteName}</span>
                }
                {
                    !logoImage && !siteName && !homePageLogo && <span className={cx({ [s.logoColor]: (location && (location !== '/' || (location == '/' && layoutType == 2))) }, s.whiteColor)}>
                        <FormattedMessage {...messages.siteNamee} />
                    </span>
                }
            </>
        )
    }

    componentDidMount() {
        if (history.location) {
            this.setState({
                location: history.location.pathname
            });
        }
    }

    render() {
        const { link, className } = this.props;

        return (
            <Link to={link} className={className}>{this.rederLogo()}</Link>
        );
    }
}

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName,
    logoImage: state.siteSettings.data.Logo,
    layoutType: state.siteSettings.data.homePageType,
    homePageLogo: state.siteSettings.data.homePageLogo,
    showMenu: state.toggle.showMenu
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Logo)));
