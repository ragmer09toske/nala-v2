import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// External Component
import moment from 'moment';

// Redux
import { connect } from 'react-redux';

//Images
import Faq from './question.svg'

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calendar.css';
import {
    Row,
    Col,
    FormGroup,
    Tooltip,
    OverlayTrigger,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import CurrencyConverter from '../../CurrencyConverter';

// Helper
import { convert } from '../../../helpers/currencyConvertion';


// Locale
import messages from '../../../locale/messages';

class BillDetails extends Component {
    static propTypes = {
        basePrice: PropTypes.number.isRequired,
        delivery: PropTypes.number,
        currency: PropTypes.string.isRequired,
        monthlyDiscount: PropTypes.number,
        weeklyDiscount: PropTypes.number,
        startDate: PropTypes.object.isRequired,
        endDate: PropTypes.object.isRequired,
        serviceFees: PropTypes.shape({
            guest: PropTypes.shape({
                type: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
        base: PropTypes.string.isRequired,
        rates: PropTypes.object.isRequired,
        formatMessage: PropTypes.any,
        specialPricing: PropTypes.array,
    };

    static defaultProps = {
        basePrice: 0,
        delivery: 0,
        monthlyDiscount: 0,
        weeklyDiscount: 0,
        startDate: null,
        endDate: null,
        specialPricing: [],
    }

    render() {
        const { basePrice, delivery, currency, monthlyDiscount, weeklyDiscount, startDate, endDate } = this.props;
        const { serviceFees, base, rates, specialPricing, securityDeposit } = this.props;
        const { formatMessage } = this.props.intl;
        let serviceFee = 0, serviceFeeCurrency;
        let currentDay, bookingSpecialPricing = [], isSpecialPriceAssigned = false;
        let priceForDays = 0, isAverage = 0;
        let isDayTotal = 0, totalWithoutServiceFee = 0;

        let momentStartDate, momentEndDate, dayDifference, discount, discountType, total;
        if (startDate != null && endDate != null) {
            momentStartDate = moment(startDate);
            momentEndDate = moment(endDate);
            dayDifference = momentEndDate.diff(momentStartDate, 'days');
            dayDifference = dayDifference + 1;

            if (dayDifference > 0) {

                let stayedNights = [];
                // Find stayed nights
                for (let i = 0; i < dayDifference; i++) {
                    let currentDate = moment(startDate).add(i, 'day');
                    stayedNights.push(currentDate);
                }

                if (stayedNights && stayedNights.length > 0) {
                    stayedNights.map((item, key) => {
                        let isSpecialPricing;
                        if (item) {
                            let pricingRow, currentPrice;
                            currentDay = (moment(item).format('dddd').toLowerCase());
                            isSpecialPricing = specialPricing.find(o => moment(item).format('MM/DD/YYYY') == moment(o.blockedDates).format('MM/DD/YYYY'));
                            if (isSpecialPricing && isSpecialPricing.isSpecialPrice) {
                                isSpecialPriceAssigned = true;
                                currentPrice = Number(isSpecialPricing.isSpecialPrice);
                            } else {
                                currentPrice = Number(basePrice);
                            }
                            // Price object
                            pricingRow = {
                                blockedDates: item,
                                isSpecialPrice: currentPrice,
                            };
                            bookingSpecialPricing.push(pricingRow);
                        }
                    });
                }
            }

            if (isSpecialPriceAssigned) {
                bookingSpecialPricing.map((item, index) => {
                    priceForDays = priceForDays + Number(item.isSpecialPrice);
                });
            } else {
                bookingSpecialPricing.map((item, index) => {
                    priceForDays = priceForDays + Number(item.isSpecialPrice);
                });
                // priceForDays = Number(basePrice) * Number(dayDifference);
            }
            //priceForDays = Number(basePrice) * Number(dayDifference);
            discount = 0;
            discountType = null;
            total = 0;
        }


        isAverage = Number(priceForDays) / Number(dayDifference);
        isDayTotal = isAverage.toFixed(2) * dayDifference;
        priceForDays = isDayTotal;

        if (dayDifference >= 7) {
            if (monthlyDiscount > 0 && dayDifference >= 28) {
                discount = (Number(priceForDays) * Number(monthlyDiscount)) / 100;
                discountType = monthlyDiscount + "% " + formatMessage(messages.monthlyDiscount);
            } else {
                discount = (Number(priceForDays) * Number(weeklyDiscount)) / 100;
                discountType = weeklyDiscount + "% " + formatMessage(messages.weeklyDiscount);
            }
        }

        totalWithoutServiceFee = (isDayTotal + delivery) - discount;

        if (serviceFees) {
            if (serviceFees.guest.type === 'percentage') {
                serviceFee = totalWithoutServiceFee * (Number(serviceFees.guest.value) / 100);
            } else {
                serviceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
            }
        }

        total = (priceForDays + serviceFee + delivery + securityDeposit) - discount;

        function LinkWithTooltip({ id, children, href, tooltip }) {
            return (
                <OverlayTrigger
                    overlay={<Tooltip className={s.tooltip} id={id}>{tooltip}</Tooltip>}
                    placement="top"
                    delayShow={300}
                    delayHide={150}
                >

                    {children}
                </OverlayTrigger>
            );
        }

        return (
            <FormGroup>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={'viewListingCalendarTable'}>
                        <table className={'table'}>
                            <tbody>
                                <tr className={cx(s.positionR)}>
                                    <td className={cx(s.noBorder, 'textAlignRightRTL')}>
                                        <div className={s.specialPriceIcon}>
                                            {
                                                isSpecialPriceAssigned &&
                                                // tooltip="Average rate per night for your trip."
                                                <span>
                                                    <img src={Faq} className={cx(s.faqImage, 'faqImageRTL')} />
                                                </span>

                                            }
                                            <div className={cx(s.tltip, s.relativeSection, 'relativeSectionRTL')}>
                                                <FormattedMessage {...messages.averageRate} />
                                            </div>
                                        </div>

                                        <div className={cx(s.specialPriceText, 'directionLtr')}>
                                            <CurrencyConverter
                                                amount={isAverage}
                                                from={currency}
                                            />
                                            {' x'} {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
                                        </div>
                                    </td>

                                    <td className={cx(s.noBorder, 'text-right', 'textAlignLeftRTL')}>
                                        <CurrencyConverter
                                            amount={isDayTotal}
                                            from={currency}
                                        />
                                    </td>

                                </tr>
                                {
                                    discount > 0 && <tr>
                                        <td className='textAlignRightRTL'>{discountType}</td>
                                        <td className={cx('text-right', s.discountText, 'textAlignLeftRTL')}>
                                            - <CurrencyConverter
                                                amount={discount}
                                                from={currency}
                                            />
                                        </td>
                                    </tr>
                                }
                                {
                                    delivery > 0 && <tr>
                                        <td className='textAlignRightRTL'><FormattedMessage {...messages.cleaningFee} /></td>
                                        <td className={cx('text-right', 'textAlignLeftRTL')}>
                                            <CurrencyConverter
                                                amount={delivery}
                                                from={currency}
                                            />
                                        </td>
                                    </tr>
                                }
                                {
                                    serviceFee > 0 && <tr>
                                        <td className='textAlignRightRTL'><FormattedMessage {...messages.serviceFee} /></td>
                                        <td className={cx('text-right', 'textAlignLeftRTL')}>
                                            <CurrencyConverter
                                                amount={serviceFee}
                                                from={currency}
                                            />
                                        </td>
                                    </tr>
                                }
                                {
                                    securityDeposit > 0 && <tr>
                                        <td className='textAlignRightRTL'><FormattedMessage {...messages.securityDeposit} /></td>
                                        <td className={cx('text-right', 'textAlignLeftRTL')}>
                                            <CurrencyConverter
                                                amount={securityDeposit}
                                                from={currency}
                                            />
                                        </td>
                                    </tr>
                                }

                                <tr>
                                    <td className='textAlignRightRTL'><FormattedMessage {...messages.total} /></td>
                                    <td className={cx('text-right', 'textAlignLeftRTL')}>
                                        <CurrencyConverter
                                            amount={total}
                                            from={currency}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </FormGroup>
        );
    }
}

const mapState = (state) => ({
    specialPricing: state.viewListing.specialPricing
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(BillDetails)));
