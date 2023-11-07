import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

import {
  Button,
  Label
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';
import cs from '../../../components/commonStyle.css'

import CommonTable from '../../CommonTable/CommonTable';
import TableAction from '../../CommonTable/TableAction';

// Redirection
import history from '../../../core/history';

// Locale
import messages from '../../../locale/messages';

// Redux actions
import { removePayout } from '../../../actions/Payout/removePayoutAction';
import { setDefaultPayout } from '../../../actions/Payout/setDefaultPayout';
import { verifyPayout } from '../../../actions/Payout/verifyPayout';

//Images
import addIcon from '/public/siteImages/addIcon.svg';


class PayoutList extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      methodId: PropTypes.number.isRequired,
      paymentMethod: PropTypes.shape({
        name: PropTypes.string.isRequired
      }),
      payEmail: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      default: PropTypes.bool.isRequired,
      last4Digits: PropTypes.number
    })),
    removePayout: PropTypes.any.isRequired,
    setDefaultPayout: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    payoutRemoveLoader: false,
    payoutDefaultLoader: false,
    payoutVerifyLoader: false,
    data: []
  };

  handleClick() {
    history.push('/user/addpayout');
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.payoutTitle) },
      { data: formatMessage(messages.payoutTitle4) },
      { data: formatMessage(messages.currency) },
      { data: formatMessage(messages.status) },
    ]
  };

  tbody = () => {
    const { data, removePayout, setDefaultPayout, currentAccountId, verifyPayout } = this.props;
    const { payoutRemoveLoader, payoutDefaultLoader, payoutVerifyLoader } = this.props;
    let checkDefault = data.some(i => i.default == true);
    return data.map((item, index) => {
      return {
        id: index,
        data: [
          {
            data: <span className={cx(s.flexDirection)}>
              <span className={s.payMinWidth}>
                {item.paymentMethod.name}
              </span>
              {checkDefault && item.default && <Label bsStyle='success'><FormattedMessage {...messages.default} /></Label>}
            </span>
          },
          {
            data: <div className={cx(cs.displayFlex, cs.alignCenter, cs.spaceBetween)}>
              <span>
                {
                  item.methodId == 1 && <span className='displayInlineRTL'>
                    {item.payEmail}
                  </span>
                }
                {
                  item.methodId == 2 && <span>
                    ******{item.last4Digits}
                  </span>
                }
              </span>
              {!item.default && <TableAction
                showDelete={true}
                onClickDelete={() => removePayout(item.id)}
                item={item}
                payoutRemoveLoader={payoutRemoveLoader}
                payoutDefaultLoader={payoutDefaultLoader}
                payoutVerifyLoader={payoutVerifyLoader}
                setDefaultPayout={setDefaultPayout}
                currentAccountId={currentAccountId}
                verifyPayout={verifyPayout}
                index={index}
              />}
            </div>
          },
          { data: item.currency },
          {
            data: <>
              {
                item.isVerified === true ? <FormattedMessage {...messages.ready} /> : <FormattedMessage {...messages.notReady} />
              }
            </>
          }
        ]
      }
    })
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(cs.commonBorderSection, 'whiteBgColor')}>
        <h4 className={cx(cs.commonTotalText, cs.paddingBottom3)}>{formatMessage(messages.payoutMethod)}</h4>
        <p className={cx(cs.commonMediumText, cs.paddingBottom4)}>
          <FormattedMessage {...messages.payoutTitleBlock1} />
        </p>
        <CommonTable
          thead={this.thead}
          tbody={this.tbody}
          className={'payoutListTable'}
          isHeadingHide
        />
        <div className={s.btnFlex}>
          <h5 className={cx(cs.commonMediumText, cs.fontWeightNormal, s.paddingRight)}><FormattedMessage {...messages.directDeposit} />&nbsp;</h5>
          <Button className={cx(cs.btnPrimary, cs.spaceTop4, s.payoutTitleFlex)} onClick={this.handleClick}>
            <img src={addIcon} className={'commonIconSpace'} />
            <FormattedMessage {...messages.addNewLabel} />
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  payoutRemoveLoader: state.loader.payoutRemove,
  payoutDefaultLoader: state.loader.payoutDefault,
  payoutVerifyLoader: state.loader.payoutVerify
});

const mapDispatch = {
  removePayout,
  setDefaultPayout,
  verifyPayout
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(PayoutList)));