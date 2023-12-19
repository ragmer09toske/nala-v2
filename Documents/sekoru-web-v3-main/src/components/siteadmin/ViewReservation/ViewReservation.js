import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewReservation.css';
import cs from '../../../components/commonStyle.css';

// Components
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import ModalForm from '../ReservationManagement/ModalForm';

// Redux Action
import { viewReceiptAdmin } from '../../../actions/Reservation/viewReceiptAdmin';
import HostServiceFee from './HostServiceFee';
import { decode } from '../../../helpers/queryEncryption';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

//Image
import arrowIcon from '/public/AdminIcons/backArrow.svg'

class ViewReservation extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            id: PropTypes.number.isRequired,
            listId: PropTypes.number.isRequired,
            hostId: PropTypes.string.isRequired,
            guestId: PropTypes.string.isRequired,
            checkIn: PropTypes.string.isRequired,
            checkOut: PropTypes.string.isRequired,
            guestServiceFee: PropTypes.number.isRequired,
            hostServiceFee: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            reservationState: PropTypes.string.isRequired,
            listData: PropTypes.shape({
                title: PropTypes.string.isRequired
            }),
            hostData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired
            }),
            hostPayout: PropTypes.shape({
                id: PropTypes.number.isRequired,
                payEmail: PropTypes.string.isRequired
            }),
            hostTransaction: PropTypes.shape({
                id: PropTypes.number.isRequired,
            }),
            guestData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired
            }),
            transaction: PropTypes.shape({
                payerEmail: PropTypes.string.isRequired,
                paymentType: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }),
            refundStatus: PropTypes.shape({
                id: PropTypes.number.isRequired,
                receiverEmail: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }),
            cancellationDetails: PropTypes.shape({
                refundToGuest: PropTypes.number.isRequired,
                payoutToHost: PropTypes.number.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired,
                guestServiceFee: PropTypes.number.isRequired,
                hostServiceFee: PropTypes.number.isRequired,
                cancellationPolicy: PropTypes.string,
                cancelledBy: PropTypes.string,
            }),
        }),
        viewReceiptAdmin: PropTypes.any.isRequired,
    };
    static defaultProps = {
        data: []
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { completed, loading } = nextProps;
        const { refetch } = this.props;
        if (completed && !loading) {
            refetch();
        }
    }
    render() {
        const { title, type, data, data: { listData, cancellationDetails, transaction } } = this.props;
        let subTotal, amountPaid;
        if (data) {
            subTotal = data.total + data.guestServiceFee;
            amountPaid = subTotal + data.securityDeposit;
        }
        let amountPaytoGuest = 0;
        let amountPaytoHost = 0;
        let guestFee = 0, hostFee = 0;
        if (cancellationDetails) {
            amountPaytoGuest = cancellationDetails.refundToGuest;
            amountPaytoHost = cancellationDetails.payoutToHost;
            guestFee = cancellationDetails.guestServiceFee;
            hostFee = cancellationDetails.hostServiceFee;
        } else if (data) {
            amountPaytoHost = Number(data.total) - Number(data.hostServiceFee);
            guestFee = data.guestServiceFee;
            hostFee = data.hostServiceFee;
        }

        if (data && (data.reservationState == 'expired' || data.reservationState == 'declined')) {
            guestFee = 0;
        }
        let nextDay = moment(data.checkIn).add(1, 'days');
        let today = moment();
        let dayDifference = nextDay.diff(today, 'days');

        let booktype, reservestate;
        if (data) {
            reservestate = data.reservationState;
        }
        if (listData) {
            booktype = listData.bookingType;
        }
        let Guestname, Hostname, reservationStatus, bookingType;
        if (data && data.guestData) {
            Guestname = data.guestData.firstName + " " + data.guestData.lastName;
        }
        if (data && data.hostData) {
            Hostname = data.hostData.firstName + " " + data.hostData.lastName;

        }
        if (reservestate) {
            reservationStatus = reservestate.charAt(0).toUpperCase() + reservestate.slice(1);
        }
        if (booktype) {
            bookingType = booktype.charAt(0).toUpperCase() + booktype.slice(1);
        }

        let url = type === 'reservation' ? '/siteadmin/reservations' : '/siteadmin/payout';
        if (type == 'security-deposit') url = '/siteadmin/manage-security-deposit';

        return (
            <div className={cx(s.pagecontentWrapper)}>
                <ModalForm />
                <div>
                    <div className={cx(cs.dFlexContainer, cs.spaceBottom4, cs.mobileDisplayBlock)}>
                        <h1 className={cx(cs.commonTotalText, cs.fontWeightBold)}><FormattedMessage {...(type === 'reservation' || type === 'security-deposit' ? messages.viewReservationHeading : messages.payoutLabel)} /></h1>
                        <div className={cx(s.gobackMobileSpace, cs.dFlex, cs.textAlignRight, cs.mobileDisplayBlock, 'textAlignLeftRTL')}>
                            <Link to={url} className={cx(cs.siteLinkColor, cs.commonContentText, cs.fontWeightMedium, cs.commomLinkborderBottom, cs.textDecorationNone)}>
                                <img src={arrowIcon} className={cx(cs.backArrowStyle, 'adminGoBackArrowRTL')} />
                                <FormattedMessage {...messages.goBack} />
                            </Link>
                        </div>
                    </div>
                    <div className={s.profileViewMain}>
                        {
                            data && data.id && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.reservationId} /></span>
                                <span className={cx(s.profileViewMainContent)}> {data.id}</span>
                            </div>
                        }
                        {
                            data && data.confirmationCode && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.confirmationCode} /></span>
                                <span className={cx(s.profileViewMainContent)}> {data.confirmationCode}</span>
                            </div>
                        }
                        {
                            reservationStatus && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.reservationStatus} />  </span>
                                <span className={cx(s.profileViewMainContent)}>{reservationStatus}</span>
                            </div>
                        }
                        {
                            data && data.cancellationDetails && data.cancellationDetails.cancellationPolicy && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.chooseCancellationPolicy} /></span>
                                <span className={cx(s.profileViewMainContent)}>{data.cancellationDetails.cancellationPolicy}</span>
                            </div>
                        }
                        {
                            data && data.cancellationDetails && data.cancellationDetails.cancelledBy && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.cancelledLabel} /></span>
                                <span className={cx(s.profileViewMainContent)}>{data.cancellationDetails.cancelledBy == 'guest' ? <FormattedMessage {...messages.guest} /> : <FormattedMessage {...messages.host} />}  </span>
                            </div>
                        }
                        {
                            data && (data.listData || data.listTitle) && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.carNameLabel} /></span>
                                <span className={cx(s.profileViewMainContent)}><a href={"/cars/" + data.listId} target="_blank"> {data.listTitle ? data.listTitle : data.listData.title}</a></span>
                            </div>
                        }

                        {
                            data && data.checkIn && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.checkIn} /></span>
                                <span className={cx(s.profileViewMainContent)}>{moment(data.checkIn).format("Do MMMM YYYY")}</span>
                            </div>
                        }
                        {
                            data && data.checkOut && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.checkOut} />   </span>
                                <span className={cx(s.profileViewMainContent)}>{moment(data.checkOut).format("Do MMMM YYYY")}  </span>
                            </div>
                        }
                        {
                            bookingType && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.bookingType} /></span>
                                <span className={cx(s.profileViewMainContent)}>{bookingType}</span>
                            </div>
                        }


                        {
                            data && data.delivery != 0 && (subTotal == 0 || subTotal > 0) && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.deliveryFeeLabel} /></span>
                                <span className={cx(s.profileViewMainContent)}><CurrencyConverter amount={data.delivery} from={data.currency} /></span>
                            </div>
                        }
                        {
                            data && (amountPaid == 0 || amountPaid > 0) && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.amountPaid} /></span>
                                <span className={cx(s.profileViewMainContent)}><CurrencyConverter amount={amountPaid} from={data.currency} /></span>
                            </div>
                        }

                        <div className={s.profileViewInner}>
                            <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.renterServiceFee} /></span>
                            <span className={cx(s.profileViewMainContent)}>
                                <CurrencyConverter amount={guestFee} from={data.currency} />
                            </span>
                        </div>
                        {
                            data && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.carOwnerServiceFee} /></span>
                                <span className={cx(s.profileViewMainContent)}><HostServiceFee
                                    hostId={data.hostId}
                                    checkIn={data.checkIn}
                                    id={data.id}
                                    hostPayout={data.hostPayout}
                                    amount={data.total}
                                    currency={data.currency}
                                    hostTransaction={data.hostTransaction}
                                    reservationState={data.reservationState}
                                    cancelData={data.cancellationDetails}
                                    hostServiceFee={hostFee}
                                />
                                </span>
                            </div>
                        }
                        {
                            data && data.guestData && data.guestData.profileId && Guestname && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.renterName} /></span>
                                <span className={cx(s.profileViewMainContent)}><a href={"/users/show/" + data.guestData.profileId} target="_blank"> {Guestname}</a></span>
                            </div>
                        }
                        {
                            data && data.guestData && data.guestData.phoneNumber && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.renterPhoneNumber} /></span>
                                <span className={cx(s.profileViewMainContent)}>{decode(data.guestData.phoneNumber)} </span>
                            </div>
                        }
                        {
                            data && data.guestUser && data.guestUser.email && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.renterEmail} /></span>
                                <span className={cx(s.profileViewMainContent)}>{data.guestUser.email} </span>
                            </div>
                        }
                        {
                            data && data.hostData && data.hostData.profileId && Hostname && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.carOwnerName} /></span>
                                <span className={cx(s.profileViewMainContent)}><a href={"/users/show/" + data.hostData.profileId} target="_blank"> {Hostname}   </a></span>
                            </div>
                        }
                        {
                            data && data.hostData && data.hostData.phoneNumber && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.carOwnerPhoneNumber} /></span>
                                <span className={cx(s.profileViewMainContent)}>{decode(data.hostData.phoneNumber)}</span>
                            </div>
                        }
                        {
                            data && data.hostUser && data.hostUser.email && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.carOwnerEmail} /></span>
                                <span className={cx(s.profileViewMainContent)}>{data.hostUser.email}</span>
                            </div>
                        }
                        {
                            data && data.cancellationDetails && data.cancellationDetails.createdAt && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.cancelDate} /></span>
                                <span className={cx(s.profileViewMainContent)}>{moment(data.cancellationDetails.createdAt).format("Do MMMM YYYY")} </span>
                            </div>
                        }
                        {
                            data && cancellationDetails && (cancellationDetails.refundToGuest == 0 || cancellationDetails.refundToGuest > 0) && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.refundAmount} /></span>
                                <span className={cx(s.profileViewMainContent)}><CurrencyConverter amount={cancellationDetails.refundToGuest}
                                    from={data.currency} />
                                </span>
                            </div>
                        }
                        {
                            data && !cancellationDetails && (data.reservationState == 'expired' || data.reservationState == 'declined') && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.refundAmount} /></span>
                                <span className={cx(s.profileViewMainContent)}><CurrencyConverter amount={subTotal}
                                    from={data.currency} />
                                </span>
                            </div>
                        }
                        {
                            data && (data.reservationState == 'approved' || data.reservationState == 'completed' || data.reservationState == 'cancelled') && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.payoutLabel} /></span>
                                <span className={cx(s.profileViewMainContent)}><CurrencyConverter amount={amountPaytoHost}
                                    from={data.currency} />
                                </span>
                            </div>
                        }
                        {
                            data && data.securityDeposit > 0 && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.securityDeposit} /></span>
                                <span className={cx(s.profileViewMainContent)}><CurrencyConverter amount={data.securityDeposit}
                                    from={data.currency} />
                                </span>
                            </div>
                        }
                        {
                            data && data.claimPayout > 0 && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.securityDepositToHost} /></span>
                                <span className={cx(s.profileViewMainContent)}><CurrencyConverter amount={data.claimPayout}
                                    from={data.currency} />
                                </span>
                            </div>
                        }
                        {
                            data && data.claimRefund > 0 && <div className={s.profileViewInner}>
                                <span className={cx(cs.labelTextNew, s.profileViewlabel, cs.fontWeightMedium)}><FormattedMessage {...messages.securityDepositToGuest} /></span>
                                <span className={cx(s.profileViewMainContent)}><CurrencyConverter amount={data.claimRefund}
                                    from={data.currency} />
                                </span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

}
const mapState = (state) => ({
    completed: state.reservation.completed,
    loading: state.reservation.loading,
});
const mapDispatch = {
    viewReceiptAdmin,
};
export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(ViewReservation)));