import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl } from 'react-intl';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NoItem.css';
// Internal Helpers
import history from '../../../core/history';
// Locale
import messages from '../../../locale/messages';
import NoDataView from '../../NoDataView/NoDataView';
//Image
import noDataIcon from '/public/SiteIcons/NoreservationIocn.svg';
import noDataIconTwo from '/public/SiteIcons/noItemCars.svg';

class NoItem extends React.Component {
  static propTypes = {
    userType: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  handleClick() {
    history.push('/s');
  }

  render() {
    const { userType, type, resetvationCount } = this.props;
    const { formatMessage } = this.props.intl;

    return (

      <div>
        {
          userType === 'owner' && <div className={cx({ [s.top]: resetvationCount == 0 })}>
            {type == 'current' && <p className={s.noResults}>
              <NoDataView
                noDataIcon={noDataIcon}
                title={formatMessage(messages.noReservation)}
                content1={formatMessage(messages.noUpcomingReservation)}
              />
            </p>
            }
            {type != 'current' && <p className={s.noResults}>
              <NoDataView
                noDataIcon={noDataIcon}
                title={formatMessage(messages.noReservation)}
                content1={formatMessage(messages.noPreviousReservation)}
              />
            </p>
            }
          </div>
        }

        {
          userType === 'renter' && <div className={cx(s.textCenter, s.spaceTop4)}>

            <div className={cx(s.nolistTitle, s.space1)}>
              {type == 'current' &&
                <NoDataView
                  noDataIcon={noDataIconTwo}
                  title={formatMessage(messages.noTripTitle)}
                  content1={formatMessage(messages.noTripTitle2)}
                />}
              {type != 'current' &&
                <NoDataView
                  noDataIcon={noDataIconTwo}
                  title={formatMessage(messages.noPreviousTripTitle)}
                  content1={formatMessage(messages.noTripTitle3)}
                />}
            </div>
          </div>
        }
      </div>

    );
  }
}

export default injectIntl(withStyles(s)(NoItem));

