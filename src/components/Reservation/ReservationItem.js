import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reservation.css';
import cs from '../../components/commonStyle.css';
import {
  Label, DropdownButton, Button
} from 'react-bootstrap';

// Component
import Link from '../Link';
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';
import MenuItemLink from '../MenuItemLink';

// Redux action
import { sendMessageAction } from '../../actions/message/sendMessageAction';

// Locale
import messages from '../../locale/messages';

//Images
import carRed from '/public/SiteIcons/steering-4.png';
import carGreen from '/public/SiteIcons/steering-3.png';
import carYellow from '/public/SiteIcons/steering-2.png';
import carBlue from '/public/SiteIcons/steering-1.png';
import phoneIcon from '/public/siteImages/phoneNumber.svg';
import mailIcon from '/public/siteImages/mailIcon.svg';
import chatIcon from '/public/siteImages/chatIcon.svg';

//Modal
import HostClaimModal from '../HostClaimModal/HostClaimModal';
import { convert } from '../../helpers/currencyConvertion';
import { formatTime } from '../../helpers/formatting';

class ReservationItem extends Component {
  static propTypes = {
    noList: PropTypes.bool,
    userType: PropTypes.string.isRequired,
    threadId: PropTypes.number.isRequired,
    reservationId: PropTypes.number.isRequired,
    reservationState: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    listId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired,
    profileId: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    picture: PropTypes.string,
    guestServiceFee: PropTypes.number.isRequired,
    hostServiceFee: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    sendMessageAction: PropTypes.any.isRequired,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    formatMessage: PropTypes.any,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
  };

  static defaultProps = {
    noList: false,
    checkIn: null,
    checkOut: null
  };

  state = {
    showModal: false,
    smallDevice: false
  };

  async sendMessage(type) {
    const { sendMessageAction, threadId, checkIn, checkOut, guests, reservationId } = this.props;
    const { searchKey, currentPage, listIdKey, startDate, endDate, orderBy, dateFilter, userType } = this.props;
    await sendMessageAction(threadId, userType, null, type, checkIn, checkOut, guests, reservationId, null, null, null, null, null, null, currentPage, searchKey, listIdKey, startDate, endDate, orderBy, dateFilter);
  }

  componentDidMount() {
    const { listId, orderBy } = this.props;
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }

  }

  componentWillUnmount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleResize = (e) => {
    let isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 767px)').matches : true;
    this.setState({
      smallDevice,
    });
  }

  reservationStyle() {
    const { reservationState } = this.props;
    let style, label;
    switch (reservationState) {
      case 'pending':
        label = <FormattedMessage {...messages.messageStatus5} />
        style = 'primary pendingStyle';
        break;
      case 'expired':
        label = <FormattedMessage {...messages.messageStatus9} />
        style = 'warning';
        break;
      case 'approved':
        label = <FormattedMessage {...messages.messageStatus4} />
        style = 'success approvedStyle';
        break;
      case 'declined':
        label = <FormattedMessage {...messages.messageStatus3} />
        style = 'danger';
        break;
      case 'completed':
        label = <FormattedMessage {...messages.panelHeader2} />
        style = 'success';
        break;
      case 'cancelled':
        label = <FormattedMessage {...messages.messageStatus11} />
        style = 'danger';
        break;
    }
    return <Label bsStyle={style} className={cx(cs.commonMediumText, cs.fontWeightMedium, s.reservationStatusBtn, 'resStatusBtn')}>{label}</Label>;
  }

  changeModalState = (status = false) => this.setState({ showModal: status });

  render() {
    const { threadId, userType, reservationId, reservationState, checkIn, checkOut, createdAt, startTime, endTime } = this.props;
    const { listId, title, street, city, state, country, zipcode } = this.props;
    const { profileId, displayName, picture, phoneNumber, email, isPhoneVerified, countryCode, isEmailConfirmed } = this.props;
    const { guestServiceFee, hostServiceFee, total, currency, refetchData } = this.props;
    const { noList, data, cancellationDetails, currencyRates } = this.props;
    const { showModal, smallDevice } = this.state;
    const { formatMessage } = this.props.intl;

    let imgSrc, modalInitialValues = {}, formattedStartTime, formattedEndTime;
    if (data) {
      modalInitialValues.securityDeposit = convert(currencyRates.base, currencyRates.rates, data.securityDeposit, currency, currencyRates.to).toFixed(2);
      if (data.claimStatus && data.claimStatus != 'pending') {
        modalInitialValues.claimAmount = convert(currencyRates.base, currencyRates.rates, data.claimAmount, currency, currencyRates.to).toFixed(2);
        modalInitialValues.claimReason = data.claimReason;
        modalInitialValues.claimImages = data.claimImages;
      }
    }

    if (reservationState == 'completed' || reservationState == 'approved') {
      imgSrc = carGreen
    } else if (reservationState == 'expired') {
      imgSrc = carYellow
    } else if (reservationState == 'pending') {
      imgSrc = carBlue
    } else if (reservationState == 'declined') {
      imgSrc = carRed
    } else if (reservationState == 'cancelled') {
      imgSrc = carRed
    }


    let subTotal = 0, enableCancel = false, enableIternary = false, checkInDate, checkOutDate, createdDate, checkOutDifference = 0;
    let showDropdown = userType === 'owner' && (reservationState == 'cancelled' && cancellationDetails && cancellationDetails.payoutToHost <= 0 || reservationState == 'expired' || reservationState == 'declined') ? false : true;
    checkInDate = checkIn ? moment(checkIn).format('MM/DD/YYYY') : '';
    checkOutDate = checkOut ? moment(checkOut).format('MM/DD/YYYY') : '';
    createdDate = createdAt ? moment(createdAt).format('MMM DD, YYYY') : '';

    if (reservationState === 'approved') {
      enableCancel = true;
      enableIternary = true;
    }
    if (userType === 'owner') {
      subTotal = total - hostServiceFee;
    } else {
      subTotal = total + guestServiceFee
    }

    if (reservationState == 'completed') checkOutDifference = moment().diff(moment(checkOut), 'hour', true);
    if (cancellationDetails && reservationState == 'cancelled') {
      let todayDiff = moment().diff(moment(checkIn), 'hour', true);
      if (todayDiff > 0) checkOutDifference = moment().diff(moment(cancellationDetails.createdAt), 'hour', true);
    }

    formattedStartTime = formatTime(startTime);
    formattedEndTime = formatTime(endTime);
    let mailTo = 'mailto:' + email;

    return (
      <>
        {
          showModal && <HostClaimModal
            refetchData={refetchData}
            claimed={Boolean(data && data.claimStatus && data.claimStatus != 'pending')}
            reservationId={reservationId}
            show={showModal}
            currency={currency}
            changeModalState={this.changeModalState}
            initialValues={modalInitialValues}
            isDisableColor
          />
        }
        <h4 className={cx(cs.commonMediumText, cs.fontWeightMedium, cs.paddingBottom2)}>{createdDate}</h4>
        <div className={cx(s.itemSection, cs.spaceBottom4)}>
          <div className={s.displayGrid}>
            <div className={cx(s.displayFlex)}>
              <div className={cx(s.avatarSpaceRight, 'avatarSpaceLeftRTL')}>
                <Avatar
                  source={picture}
                  height={88}
                  width={88}
                  title={displayName}
                  className={cx(cs.profileAvatarLink, s.profileAvatar, s.noBackground)}
                  withLink={noList ? false : true}
                  profileId={profileId}
                  linkClassName={cx(cs.displayinlineBlock)}
                />
              </div>
              <div>
                <a href={'/users/show/' + profileId} target={"_blank"} className={cx(cs.siteTextColor, cs.fontWeightMedium, cs.commonMediumText, cs.paddingBottom1, cs.displayinlineBlock)}>
                  {displayName}
                </a>
                {reservationState && (reservationState === 'approved' || reservationState === 'completed') &&
                  <div>
                    {phoneNumber && isPhoneVerified && countryCode && <a href={smallDevice && `tel:${countryCode}${phoneNumber}`} className={cx(cs.siteLinkColor, cs.fontWeightNormal, cs.commonSmallText, cs.paddingBottom1, s.displayFlex, s.baseLine)}>
                      <img src={phoneIcon} className={cx(s.iconSpace, 'reservationIconSpaceRTL')} />{countryCode}{' '}{phoneNumber}
                    </a>}
                    {email && isEmailConfirmed && <a href={mailTo} className={cx(cs.siteLinkColor, cs.fontWeightNormal, cs.commonSmallText, cs.paddingBottom1, s.displayFlex, s.baseLine)}>
                      <img src={mailIcon} className={cx(s.iconSpace, 'reservationIconSpaceRTL')} />{email}
                    </a>
                    }
                  </div>
                }
                {
                  !noList && <Link to={'/message/' + threadId + '/' + userType} className={cx(cs.siteLinkColor, cs.fontWeightNormal, cs.commonSmallText, s.displayFlex)}>
                    <img src={chatIcon} className={cx(s.iconSpace, 'reservationIconSpaceRTL')} /><FormattedMessage {...messages.messageHistroy} /></Link>
                }
              </div>
            </div>
            <div>
              {
                !noList && <>
                  <a href={'/cars/' + listId} target={'_blank'} className={cx(cs.siteLinkColor, cs.fontWeightMedium, cs.commonMediumText, cs.displayinlineBlock, cs.paddingBottom1)}>{title}</a>
                </>
              }
              <p className={cx(cs.siteTextColor, cs.fontWeightNormal, cs.commonSmallText, cs.paddingBottom1)}>
                <span>{checkInDate} - {checkOutDate}{','}{' '}</span>
                <span><span className={s.displayInlineBlock}>{formattedStartTime}</span> <span>-</span> <span className={s.displayInlineBlock}>{formattedEndTime}</span></span>
              </p>
              {
                noList && userType === 'renter' && <span className={cx(cs.errorMessage, s.errorMsg)}> <FormattedMessage {...messages.noList} /> </span>
              }
              {
                noList && userType === 'owner' && <span className={cx(cs.errorMessage, s.errorMsg)}> <FormattedMessage {...messages.notexist} /> </span>
              }
              {
                !noList && <>
                  <p className={cx(cs.siteTextColor, cs.fontWeightNormal, cs.commonSmallText)}>{street + (street ? ', ' : '')}</p>
                  {/* <h5 className={cx(cs.siteTextColor, cs.fontWeightNormal, cs.commonSmallText, cs.paddingBottom1)}>{city}, {state} {zipcode}</h5> */}
                  <p className={cx(cs.siteTextColor, cs.fontWeightNormal, cs.commonSmallText)}>{city + (city ? ', ' : '')}{state + (state ? ', ' : '')}{country + (country ? ' - ' : '')}{zipcode} </p>
                </>
              }
            </div>
          </div>
          <hr className={cx(cs.spaceBottom3, cs.spaceTop3, cs.listingHorizoltalLine)} />
          <div className={s.moreItemGrid}>
            <div>
              {this.reservationStyle()}
            </div>

            <div className={cx(cs.mobTextRight, 'mobTextLeftRTL')}>
              {(userType === 'renter' || (userType === 'owner' && (reservationState != 'cancelled' && reservationState != 'expired'))) &&
                <p className={cx(cs.fontWeightMedium, cs.commonSmallText)}>
                  {userType === 'owner' ? <>{reservationState === 'completed' ? <><FormattedMessage {...messages.earningsLabel} />{':'}</> : <FormattedMessage {...messages.estimatedEarningsLabel} />} <CurrencyConverter
                    amount={subTotal}
                    className={s.bookItPrice}
                    from={currency} /> </> : <CurrencyConverter
                    amount={subTotal}
                    className={s.bookItPrice}
                    from={currency} />}
                </p>}
              {(userType === 'owner' && (reservationState == 'cancelled' || reservationState == 'expired')) && <><p className={cx(cs.fontWeightMedium, cs.commonSmallText)}>
                <FormattedMessage {...messages.estimatedEarningsLabel} /> <CurrencyConverter
                  amount={subTotal > 0 ? subTotal : 0}
                  className={s.bookItPrice}
                  from={currency}
                />
              </p>
                <p className={cx(cs.fontWeightMedium, cs.commonSmallText)}>
                  <FormattedMessage {...messages.actualEarningsLabel} /> <CurrencyConverter
                    amount={(reservationState == 'cancelled' && cancellationDetails) ? cancellationDetails.payoutToHost : 0}
                    className={s.bookItPrice}
                    from={currency}
                  />
                </p>
              </>}
              {
                !noList &&
                userType === 'owner' &&
                data.securityDeposit > 0 &&
                (reservationState == 'completed' || reservationState == 'cancelled') &&
                <li className={cx(s.claimDamageText, cs.fontWeightMedium, cs.commonSmallText)}>
                  <Button className={cx(cs.siteLinkColor, s.claimBtn)} onClick={() => this.changeModalState(true)}>
                    {data.claimStatus == 'pending' && checkOutDifference > 0 && checkOutDifference < 24 &&
                      `(${formatMessage(messages.claimDamage)})`}
                    {data.claimStatus == 'requested' &&
                      `(${formatMessage(messages.requestedForClaim)})`}
                    {data.claimStatus == 'approved' &&
                      `(${formatMessage(messages.claimDetails)})`}
                  </Button>
                </li>
              }
            </div>
            {showDropdown &&
              <div className={cx(s.tripDropDown, 'tripDropDown', 'tripDropDownRTL')}>
                <DropdownButton
                  bsSize="small" LinkLink
                  title={formatMessage(messages.moreLabel)}
                  id="dropdown-size-small"
                  className={s.moreTextSize}
                >
                  {
                    noList && <MenuItemLink to={'/contact'}><FormattedMessage {...messages.contactSupport} /></MenuItemLink>
                  }
                  {
                    !noList && userType === 'renter' && enableIternary &&
                    <MenuItemLink to={'/users/trips/itinerary/' + reservationId}><FormattedMessage {...messages.viewItinerary} /></MenuItemLink>
                  }
                  {
                    !noList && userType === 'renter' &&
                    <MenuItemLink to={'/users/trips/receipt/' + reservationId}><FormattedMessage {...messages.viewReceipt} /></MenuItemLink>
                  }
                  {
                    !noList && userType === 'owner' && (reservationState === 'approved' || reservationState === 'completed' || (reservationState === 'cancelled' && (cancellationDetails && cancellationDetails.payoutToHost > 0))) &&
                    <MenuItemLink to={'/users/trips/receipt/' + reservationId}><FormattedMessage {...messages.viewReceipt} /></MenuItemLink>
                  }
                  {
                    !noList && userType === 'owner' && reservationState === 'pending' &&
                    <MenuItemLink onClick={() => this.sendMessage('approved')}>
                      <FormattedMessage {...messages.approve} />
                    </MenuItemLink>
                  }
                  {
                    !noList && userType === 'owner' && reservationState === 'pending' &&
                    <MenuItemLink onClick={() => this.sendMessage('declined')}>
                      <FormattedMessage {...messages.decline} />
                    </MenuItemLink>
                  }
                  {
                    !noList && enableCancel &&
                    <MenuItemLink to={'/cancel/' + reservationId + '/' + userType}>
                      <FormattedMessage {...messages.cancel} />
                    </MenuItemLink>
                  }
                </DropdownButton>
              </div>

            }
          </div>
        </div>
      </>
    );
  }
}

const mapState = (state) => ({
  currencyRates: state.currency
});

const mapDispatch = {
  sendMessageAction,
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(ReservationItem)));