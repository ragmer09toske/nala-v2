import React from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NoItem.css';
// Internal Helpers
import history from '../../../core/history';
// Locale
import messages from '../../../locale/messages';
import Link from '../../Link/Link';
import cs from '../../../components/commonStyle.css'
import NoDataView from '../../NoDataView/NoDataView';
//Image
import noDataIcon from '/public/SiteIcons/noItemCars.svg';
import plusIcon from '/public/SiteIcons/lightPlusIcon.svg';
class NoItem extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.any,
  };

  handleClick() {
    history.push('/become-a-owner');
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.textCenter, cs.noItemPanel)}>
        <NoDataView
          noDataIcon={noDataIcon}
          title={formatMessage(messages.title)}
          content1={formatMessage(messages.content)}
        />
        <Link to={'/become-a-owner?mode=new'} className={cx(cs.btnPrimary, s.addNewBtn)}>
          <img src={plusIcon} className='imgIconRight'/>
          <FormattedMessage {...messages.addNewLabel} />
        </Link>
      </div>
    ); 
  }
}

export default injectIntl(withStyles(s, cs)(NoItem));

