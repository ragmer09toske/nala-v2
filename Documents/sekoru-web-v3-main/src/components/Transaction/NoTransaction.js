import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import bt from '../commonStyle.css';
import cx from 'classnames';
import NoDataView from '../NoDataView/NoDataView';
import noDataIcon from '/public/SiteIcons/noTransaction.svg'

// Locale
import messages from '../../locale/messages';

class NoTransaction extends Component {
    static propTypes = {
        className: PropTypes.string,
        formatMessage: PropTypes.any,
    };

    render() {
        const { className, contentSecWidth } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <NoDataView
                title={formatMessage(messages.noTransactions)}
                content1={formatMessage(messages.noTransactionContent)}
                noDataIcon={noDataIcon}
                noDataImgSize={bt.noDataImgSize}
                noDataIconSec={className}                
            />
        );
    }
}

export default injectIntl((withStyles(bt))(NoTransaction));
