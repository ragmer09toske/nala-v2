import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CurrencyManagement.css';
import CommonTable from '../../CommonTable/CommonTable';

// Redux Actions
import { updateCurrencyStatus, setBaseCurrency } from '../../../actions/siteadmin/CurrencyManagement/currencyManagement';
import { managePaymentCurrency } from '../../../actions/siteadmin/CurrencyManagement/managePaymentCurrency';

// Translation
import messages from '../../../locale/messages';
class CurrencyManagement extends React.Component {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isPayment: PropTypes.bool.isRequired,
      isBaseCurrency: PropTypes.bool.isRequired
    })),
    updateCurrencyStatus: PropTypes.any.isRequired,
    setBaseCurrency: PropTypes.any.isRequired,
    managePaymentCurrency: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    data: []
  };

  handleUpdateStatus(id, status) {
    const { updateCurrencyStatus } = this.props;
    updateCurrencyStatus(id, status);
  }

  handleBaseCurrency(id) {
    const { setBaseCurrency } = this.props;
    setBaseCurrency(id);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.symbolLabel) },
      { data: formatMessage(messages.baseCurrencyLabel) },
      { data: formatMessage(messages.status) },
      { data: formatMessage(messages.setEnableDisable) },
      { data: formatMessage(messages.setCurrencyLabel) },
      { data: formatMessage(messages.allowedPaymentCurrency) },
    ]
  };

  tbody = () => {
    const { data, managePaymentCurrency } = this.props;
    const { formatMessage } = this.props.intl;
    return data.map(value => {
      return {
        id: value?.id,
        data: [
          { data: value?.id },
          {
            data: value.symbol
          },
          {
            data: value.isBaseCurrency === true ? formatMessage(messages.activeLabel) : ""
          },
          {
            data: <span> {value.isEnable ? formatMessage(messages.enabledLabel) : formatMessage(messages.disabledLabel)} </span>
          },
          {
            data: <a href="javascript:void(0)" onClick={() => this.handleUpdateStatus(value.id, value.isEnable)} > {value.isEnable ? formatMessage(messages.disableLabel) : formatMessage(messages.enableLabel)} </a>
          },
          {
            data: <span>
              {
                !value.isBaseCurrency && value.isEnable && <a href="javascript:void(0)" onClick={() => this.handleBaseCurrency(value.id)}>
                  <FormattedMessage {...messages.setBaseCurrency} />
                </a>
              }
            </span>
          },
          {
            data: <span>
              {
                value.isEnable && <a href="javascript:void(0)" onClick={() => managePaymentCurrency(value.id, !value.isPayment ? "add" : "remove")}>
                  {!value.isPayment ? <FormattedMessage {...messages.addLabel} /> : <FormattedMessage {...messages.remove} />}
                </a>
              }
            </span>
          },
        ]
      }
    })
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <CommonTable
          thead={this.thead}
          tbody={this.tbody}
          title={formatMessage(messages.currencyManagement)}
        />
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  updateCurrencyStatus,
  setBaseCurrency,
  managePaymentCurrency
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(CurrencyManagement)));