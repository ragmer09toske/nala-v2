import React from 'react'
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Inbox.css';
// Locale
import messages from '../../../locale/messages';
import NoDataView from '../../NoDataView/NoDataView';
//Image
import noDataIcon from '/public/SiteIcons/noMessageIcon.svg';
class EmptyInbox extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;
    const { type } = this.props;
    return (
      <div className={(s.textCenter)}>
        <NoDataView
          noDataIcon={noDataIcon}
          title={formatMessage(messages.noMessagesTitle)}
          content1={formatMessage(type == "owner" ? messages.noMessagesTitle3 : messages.noMessagesTitle2)}
        />
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(EmptyInbox));
