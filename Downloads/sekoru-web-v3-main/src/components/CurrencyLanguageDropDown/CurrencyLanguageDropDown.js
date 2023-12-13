import React from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CurrencyLanguageDropDown.css';
import { Nav, DropdownButton, ButtonToolbar, MenuItem } from 'react-bootstrap';
import messages from '../../locale/messages';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import HeaderModal from '../HeaderModal'
import { openHeaderModal } from '../../actions/modalActions';

const localeDict = {
  'en-US': 'English',
  'es': 'Spanish',
  'it-IT': 'Italiano',
  'fr-FR': 'Français',
  'pt-PT': 'Português',
};

const localeName = locale => localeDict[locale] || locale;

class CurrencyLanguageDropDown extends React.Component {


  render() {
    const { currentLocale, toCurrency, baseCurrency, openHeaderModal } = this.props;

    let lang = localeName(currentLocale);

    let targetCurrency;

    if (toCurrency) {
      targetCurrency = toCurrency;
    } else {
      targetCurrency = baseCurrency;
    }

    return (
      <div>
        <ButtonToolbar>
          <DropdownButton
            title={'Currency & Language'}
          >
            <MenuItem onClick={() => openHeaderModal('currencyModal')}>{targetCurrency}</MenuItem>
            <MenuItem onClick={() => openHeaderModal('languageModal')}>{lang}</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
        <HeaderModal modalType={'languageModal'} />
        <HeaderModal modalType={'currencyModal'} />
      </div>
    );
  }
}


const mapState = (state) => ({
  currentLocale: state.intl.locale,
  baseCurrency: state.currency.base,
  toCurrency: state.currency.to
});

const mapDispatch = {
  openHeaderModal
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch)
)(CurrencyLanguageDropDown);
