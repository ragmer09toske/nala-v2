import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
import {
    Row,
    Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';

// Component
import CurrencyConverter from '../../CurrencyConverter';

// Locale
import messages from '../../../locale/messages';

class ClaimDetails extends Component {

    render() {
        const { reservationData, openModal } = this.props;
        let claimStatus, claimAmount = 0, securityDeposit = 0, claimPayout = 0, claimRefund = 0, currency;
        if (reservationData) {
            claimStatus = reservationData.claimStatus;
            claimAmount = reservationData.claimAmount;
            securityDeposit = reservationData.securityDeposit;
            claimPayout = reservationData.claimPayout;
            claimRefund = reservationData.claimRefund;
            currency = reservationData.currency;
        }

        return (
            <div>
                <h4 className={cx(s.profileName, s.textCenter)}>
                    <FormattedMessage {...messages.claimDetails} />
                </h4>
                <hr />
                {
                    securityDeposit > 0 && <Row className={cx(s.textGray, s.space1)}>
                        <Col xs={7} sm={7} className={cx(s.textLeft, 'textAlignRightRTL')}>
                            <span><FormattedMessage {...messages.securityDepositClaim} /></span>
                        </Col>
                        <Col xs={5} sm={5} className={cx(s.textRight, 'textAlignLeftRTL')}>
                            <span>
                                <CurrencyConverter
                                    amount={securityDeposit}
                                    from={currency}
                                />
                            </span>
                        </Col>
                    </Row>
                }
               

                {
                    <Row className={cx(s.textGray, s.space1)}>
                        <Col xs={7} sm={7} className={cx(s.textLeft, 'textAlignRightRTL')}>
                            <span><FormattedMessage {...messages.claimedByOwnerClaim} /></span>
                        </Col>
                        <Col xs={5} sm={5} className={cx(s.textRight, 'textAlignLeftRTL')}>
                            <span>
                                <CurrencyConverter
                                    amount={claimAmount}
                                    from={currency}
                                />
                            </span>
                        </Col>
                    </Row>
                }
                {
                    <Row className={cx(s.textGray, s.space1)}>
                        <Col xs={7} sm={7} className={cx(s.textLeft, 'textAlignRightRTL')}>
                            <span><FormattedMessage {...messages.claimAmountSharedToOwner} /></span>
                        </Col>
                        <Col xs={5} sm={5} className={cx(s.textRight, 'textAlignLeftRTL')}>
                            <span>
                                <CurrencyConverter
                                    amount={claimPayout}
                                    from={currency}
                                />
                            </span>
                        </Col>
                    </Row>
                }
                <hr />
                {
                    <Row className={cx(s.textGray)}>
                        <Col xs={7} sm={7} className={cx(s.textLeft, 'textAlignRightRTL')}>
                            <span><FormattedMessage {...messages.claimRefundedMessage} /></span>
                            <div>{securityDeposit > 0 && claimAmount > 0 && <a className={s.link} onClick={openModal}>{' ('}<FormattedMessage {...messages.claimDetails} />{')'}</a>}</div>
                        </Col>
                        <Col xs={5} sm={5} className={cx(s.textRight, 'textAlignLeftRTL')}>
                            <span>
                                <CurrencyConverter
                                    amount={claimRefund}
                                    from={currency}
                                />
                            </span>
                        </Col>
                    </Row>
                }
            </div>
        );
    }
}

const mapState = (state) => ({
    serviceFees: state.book.serviceFees,
    base: state.currency.base,
    rates: state.currency.rates
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ClaimDetails)));

