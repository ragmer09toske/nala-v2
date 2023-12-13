import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminFooter.css';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class AdminFooter extends Component {

    static propTypes = {
        siteName: PropTypes.string.isRequired,
    };

    render() {
        const { siteName } = this.props;
        return (
            <div className={cx(s.footerContainer, 'footerContainerRTL')}>
                {/* <FormattedMessage {...messages.copyRightLabel} /> */}
                &copy;
                <b>{siteName}.</b>
                {/* <FormattedMessage {...messages.copyRightLabelDesc} /> */}
            </div>
        )
    }
}

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(AdminFooter)));