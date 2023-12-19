import React from 'react'
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reservation.css';
import cs from '../../components/commonStyle.css';
import cx from 'classnames';
import { decode } from '../../helpers/queryEncryption';

// Components
import ReservationItem from './ReservationItem';
import NoItem from './NoItem';


class Reservation extends React.Component {

  static propTypes = {
    userType: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      listId: PropTypes.number.isRequired,
      hostId: PropTypes.string.isRequired,
      guestId: PropTypes.string.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      guests: PropTypes.number.isRequired,
      guestServiceFee: PropTypes.number.isRequired,
      hostServiceFee: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      reservationState: PropTypes.string.isRequired,
      startTime: PropTypes.number.isRequired,
      endTime: PropTypes.number.isRequired,
      messageData: PropTypes.shape({
        id: PropTypes.number.isRequired
      }),
      listData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        zipcode: PropTypes.string.isRequired,
      }),
      hostData: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        picture: PropTypes.string,
        phoneNumber: PropTypes.string,
        userData: PropTypes.shape({
          email: PropTypes.string
        })
      }),
      guestData: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        picture: PropTypes.string,
        phoneNumber: PropTypes.string,
        userData: PropTypes.shape({
          email: PropTypes.string
        })
      }),
    }))
  };

  static defaultProps = {
    data: []
  };

  render() {
    const { data, userType, refetchData, searchKey, currentPage, listId, startDate, endDate, orderBy, dateFilter } = this.props;

    if (data.length === 0) {
      return <NoItem userType={userType} />
    }

    let title;
    if (userType === 'owner') {
      title = "Your Reservation";
    } else {
      title = "Your Trips";
    }

    return (
      <div className={cx('whiteBgColor')}>
        {
          data && data.map((item, index) => {
            if (item.guestData && item.hostData && item.listData && item.messageData) {
              return <ReservationItem
                key={index}
                userType={userType}
                threadId={item.messageData.id}
                profileId={userType === 'owner' ? item.guestData.profileId : item.hostData.profileId}
                displayName={userType === 'owner' ? item.guestData.firstName : item.hostData.firstName}
                picture={userType === 'owner' ? item.guestData.picture : item.hostData.picture}
                reservationId={item.id}
                reservationState={item.reservationState}
                checkIn={item.checkIn}
                checkOut={item.checkOut}
                guests={item.guests}
                guestServiceFee={item.guestServiceFee}
                hostServiceFee={item.hostServiceFee}
                total={item.total}
                currency={item.currency}
                listId={item.listId}
                title={item.listTitle ? item.listTitle : item.listData.title}
                street={item.listData.street}
                city={item.listData.city}
                state={item.listData.state}
                country={item.listData.country}
                zipcode={item.listData.zipcode}
                phoneNumber={userType === 'owner' ? decode(item.guestData.phoneNumber) : decode(item.hostData.phoneNumber)}
                email={userType === 'owner' ? decode(item.guestData.userData.email) : decode(item.hostData.userData.email)}
                isPhoneVerified={userType === 'owner' ? item.guestData?.userVerification?.isPhoneVerified : item.hostData?.userVerification?.isPhoneVerified}
                countryCode={userType === 'owner' ? item.guestData?.countryCode : item.hostData?.countryCode}
                isEmailConfirmed={userType === 'owner' ? item.guestData?.userVerification?.isEmailConfirmed : item.hostData?.userVerification?.isEmailConfirmed}
                createdAt={item.createdAt}
                data={item}
                refetchData={refetchData}
                cancellationDetails={item.cancellationDetails}
                startTime={item.startTime}
                endTime={item.endTime}
                currentPage={currentPage}
                searchKey={searchKey}
                listIdKey={listId}
                startDate={startDate}
                endDate={endDate}
                orderBy={orderBy}
                dateFilter={dateFilter}
              />
            } else {
              return <ReservationItem
                noList
                key={index}
                userType={userType}
                threadId={null}
                profileId={null}
                displayName={null}
                picture={null}
                reservationId={item.id}
                reservationState={item.reservationState}
                checkIn={item.checkIn}
                checkOut={item.checkOut}
                guests={item.guests}
                guestServiceFee={item.guestServiceFee}
                hostServiceFee={item.hostServiceFee}
                total={item.total}
                currency={item.currency}
                listId={item.listId}
                title={item.listTitle ? item.listTitle : null}
                street={null}
                city={null}
                state={null}
                country={null}
                zipcode={null}
                phoneNumber={null}
                email={null}
                createdAt={item.createdAt}
                startTime={item.startTime}
                endTime={item.endTime}
                currentPage={currentPage}
                searchKey={searchKey}
                listIdKey={listId}
                startDate={startDate}
                endDate={endDate}
                orderBy={orderBy}
                dateFilter={dateFilter}
              />
            }
          })
        }
      </div>
    );
  }
}

export default injectIntl(withStyles(s, cs)(Reservation));