import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ManagePaymentGateway.css';
import CommonTable from '../../CommonTable/CommonTable';
import { updatePaymentGatewayStatus } from '../../../actions/siteadmin/updatePayemntGatewayStatus';
// Translation
import messages from '../../../locale/messages';
class ManagePaymentGateway extends React.Component {
    static propTypes = {
        getAllPayments: PropTypes.shape({
            loading: PropTypes.bool,
            refetch: PropTypes.any.isRequired,
            getAllPaymentMethods: PropTypes.array
        }),
        title: PropTypes.string.isRequired,
    };

    handleUpdate(id, e) {
        const { updatePaymentGatewayStatus, getAllPayments: { refetch } } = this.props;
        let isEnable = e.target.value;
        isEnable = isEnable == 'true' ? true : false;
        updatePaymentGatewayStatus(id, isEnable);
        refetch();
    }

    thead = () => {
        const { formatMessage } = this.props.intl;
        return [
            { data: formatMessage(messages.idLabel) },
            { data: formatMessage(messages.paymentGateway) },
            { data: formatMessage(messages.status) }
        ]
    };

    tbody = () => {
        const { getAllPayments: { getAllPaymentMethods } } = this.props;
        const { formatMessage } = this.props.intl;

        return getAllPaymentMethods.map(value => {
            return {
                id: value?.id,
                data: [
                    { data: value?.id },
                    {
                        data: value?.paymentName
                    },
                    {
                        data: <select value={value.isEnable} onChange={(e) => this.handleUpdate(value.id, e)}>
                            <option value={true}>{formatMessage(messages.activeLabel)}</option>
                            <option value={false}>{formatMessage(messages.inActiveLabel)}</option>
                        </select>
                    },
                ]
            }
        })
    }

    render() {
        const { getAllPayments: { getAllPaymentMethods } } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
                <CommonTable
                    thead={this.thead}
                    tbody={this.tbody}
                    title={formatMessage(messages.paymentGatewaySection)}
                />
            </div>
        )
    }

}

const mapState = (state) => ({
});

const mapDispatch = {
    updatePaymentGatewayStatus
};

export default compose(injectIntl, withStyles(s), connect(mapState, mapDispatch))(ManagePaymentGateway);