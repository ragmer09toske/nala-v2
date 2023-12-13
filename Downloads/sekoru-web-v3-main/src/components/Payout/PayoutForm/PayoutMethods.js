import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import { graphql, compose } from 'react-apollo';

// Redux Form
import { reduxForm, change, formValueSelector, Field } from 'redux-form';

// Redux
import { connect } from 'react-redux';

import {
  Button,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';
import cs from '../../../components/commonStyle.css';

import CommonTable from '../../CommonTable/CommonTable';

// Graphql
import getPaymentMethodsQuery from './getPaymentMethods.graphql';

// Locale
import messages from '../../../locale/messages';
import Loader from '../../Loader/Loader';

class PayoutMethods extends Component {
  static propTypes = {
    handleSubmit: PropTypes.any.isRequired,
    previousPage: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
    PaymentMethodsData: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getPaymentMethods: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        processedIn: PropTypes.string.isRequired,
        fees: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
        details: PropTypes.string.isRequired,
        paymentType: PropTypes.string.isRequired,
      }))
    })
  };

  static defaultProps = {
    PaymentMethodsData: {
      loading: true,
      getPaymentMethods: []
    }
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { PaymentMethodsData: { loading, getPaymentMethods } } = nextProps;
    const { change, paymentMethodId } = this.props;
    if (getPaymentMethods != null && getPaymentMethods.length > 0
      && (paymentMethodId === undefined || paymentMethodId === null)) {
      const activePayentMethods = getPaymentMethods && getPaymentMethods.find((o) => o && o.isEnable);
      if (activePayentMethods) {
        change('methodId', activePayentMethods.id);
        change('paymentType', activePayentMethods.paymentType);
        change('currency', activePayentMethods.currency);
        if (activePayentMethods.paymentType === 2) {
          change('businessType', 'individual');
        }
      }
    }
  }

  handleChange(methodId, paymentType, currency) {
    const { change } = this.props;
    change('methodId', methodId);
    change('paymentType', paymentType);
    change('currency', currency);
    if (paymentType === 2) {
      change('businessType', 'individual');
    }
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.payoutTitle) },
      { data: formatMessage(messages.payoutTitle1) },
      { data: formatMessage(messages.payoutTitle2) },
      { data: formatMessage(messages.payoutTitle3) },
      { data: formatMessage(messages.payoutTitle4) },
    ]
  };

  tbody = () => {
    const { PaymentMethodsData: { loading, getPaymentMethods } } = this.props;
    const { paymentMethodId } = this.props;
    return getPaymentMethods.map((item, index) => {
      let checked = false;
      if (item.id === parseInt(paymentMethodId)) {
        checked = true;
      }
      if (item.isEnable) {
        return {
          id: index,
          data: [
            {
              data: <span className={cx(s.payoutTitleFlex, s.alignItemBaseLine)}>
                <Field
                  name="methodId"
                  component="input"
                  value={item.id}
                  type="radio"
                  className={cx(cs.curserPointer, s.radioBtn)}
                  checked={checked}
                  onChange={() => this.handleChange(item.id, item.paymentType, item.currency)}
                />
                <span className={s.itemPadding}>{item.name}</span>
              </span>
            },
            { data: item.processedIn },
            { data: item.fees },
            { data: item.currency },
            { data: item.details }
          ]
        }
      }
    })
  }

  render() {
    const { error, handleSubmit, previousPage } = this.props;
    const { PaymentMethodsData: { loading, getPaymentMethods } } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx('inputFocusColor', cs.commonBorderSection, 'whiteBgColor', 'customRatioButton')}>
        <h3 className={cx(cs.commonTotalText, cs.paddingBottom3)}>{formatMessage(messages.addPayout)}</h3>
        <p className={cx(cs.commonMediumText, cs.paddingBottom2)}>
          <FormattedMessage {...messages.payoutIntro1} />
        </p>
        <p className={cx(cs.commonMediumText, cs.paddingBottom3)}>
          <FormattedMessage {...messages.payoutIntro2} />
        </p>
        <form onSubmit={handleSubmit}>
          {
            loading && <Loader type="text" />
          }
          {
            !loading && getPaymentMethods != undefined && getPaymentMethods.length > 0 &&
            <CommonTable
              thead={this.thead}
              tbody={this.tbody}
              className={'payoutListTable'}
            
            />
          }
          {
            !loading && getPaymentMethods != undefined && getPaymentMethods.length === 0 && <h5 className={cx(cs.commonTotalText, cs.paddingBottom3)}><FormattedMessage {...messages.noPaymentFound} /></h5>
          }
          <div className={cx(s.btnFlex, cs.spaceTop4)}>
            <Button className={cx(cs.btnPrimaryBorder, s.btnRight, 'payoutBackRTL')} onClick={previousPage}>
              <FormattedMessage {...messages.back} />
            </Button>
            <Button className={cs.btnPrimary} disabled={loading} type="submit">
              <FormattedMessage {...messages.next} />
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

PayoutMethods = reduxForm({
  form: 'PayoutForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(PayoutMethods);

const selector = formValueSelector('PayoutForm');

const mapState = (state) => ({
  paymentMethodId: selector(state, 'methodId')
});

const mapDispatch = {
  change
};

export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(getPaymentMethodsQuery, {
    name: 'PaymentMethodsData',
    options: {
      ssr: false,
    }
  }),
)(PayoutMethods);