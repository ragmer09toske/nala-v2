import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from 'reactable';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewFailedPayout.css';
import cp from '../../../components/commonStyle.css';


import CurrencyConverter from '../../CurrencyConverter/CurrencyConverter';
import Link from '../../Link/Link';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class ViewFailedPayout extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,

    }

    constructor(props) {
        super(props);
    }

    render() {
        const { title, data } = this.props;
        const { formatMessage } = this.props.intl;

        let failedTransactionData = []
        if (data && data.hostFailedTransaction) failedTransactionData.push(data.hostFailedTransaction)
        if (data && data.claimFailedTransaction) failedTransactionData.push(data.claimFailedTransaction)

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
                <div>
                    <h1 className={s.headerTitle}>{title}</h1>
                    <div className={cx(s.space4, cp.textAlignRight)}>
                        <Link to={'/siteadmin/payout'} className={cx(cp.btnPrimaryBorder, cp.btnlarge)}>
                            <FormattedMessage {...messages.goBack} />
                        </Link>
                    </div>
                    <div className={cx('table-responsive', 'tableOne')}>
                        <Table
                            className="table"
                            noDataText={formatMessage(messages.noRecordFound)}
                            sortable={true}
                        >
                            {failedTransactionData && failedTransactionData.length > 0 && failedTransactionData.map((item) => {
                                let payoutAmount = data.total - data.hostServiceFee;
                                payoutAmount = payoutAmount != null ? payoutAmount : 0;
                                let reason = item.reason;
                                reason = JSON.parse(reason);

                                return (
                                    <Tr>
                                        <Td column={formatMessage(messages.reservationId)}>
                                            {data.id}
                                        </Td>
                                        <Td column={formatMessage(messages.codeLabel)}>
                                            {data.confirmationCode}
                                        </Td>
                                        {
                                            data.listData && <Td column={formatMessage(messages.adminListTitle)}>
                                                <a href={"/cars/" + data.listId} target='_blank'>
                                                    {data.listData.title}
                                                </a>
                                            </Td>
                                        }
                                        {
                                            !data.listData && <Td column={formatMessage(messages.adminListTitle)} data={formatMessage(messages.dataMissing)} />
                                        }
                                        <Td column={formatMessage(messages.ownersName)}>
                                            {data.hostData && data.hostData.firstName}
                                        </Td>
                                        {item.payoutType == 'claimPayout' ?
                                            <Td column={formatMessage(messages.payoutLabel)}>
                                                <CurrencyConverter
                                                    amount={data.claimPayout}
                                                    from={data.currency}
                                                />
                                            </Td> : <Td column={formatMessage(messages.payoutLabel)}>
                                                {payoutAmount > 0 && <CurrencyConverter
                                                    amount={payoutAmount}
                                                    from={data.currency}
                                                />}
                                            </Td>
                                        }
                                        <Td column={formatMessage(messages.reason)}>
                                            {reason?.raw?.message ? reason?.raw?.message : reason}
                                        </Td>
                                    </Tr>
                                )
                            })

                            }
                        </Table>
                    </div>
                </div>
            </div>
        )
    }

}

export default injectIntl(withStyles(s, cp)(ViewFailedPayout));