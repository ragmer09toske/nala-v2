import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StaticPageManagement.css';
import CommonTable from '../../CommonTable/CommonTable';
import Link from '../../../components/Link';

// Translation
import messages from '../../../locale/messages';
class StaticPageManagement extends React.Component {

  constructor(props) {
    super(props);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.pageName) },
      { data: formatMessage(messages.preview) },
      { data: formatMessage(messages.editLabel) },
    ]
  };

  tbody = () => {
    const { formatMessage } = this.props.intl;

    const data = [
      {
        text: formatMessage(messages.aboutUsLabel),
        url: '/about'
      },
      {
        text: formatMessage(messages.trustSafety),
        url: '/safety'
      },
      {
        text: formatMessage(messages.travelCredit),
        url: '/travel'
      },
      {
        text: formatMessage(messages.termsPrivacy),
        url: '/privacy'
      }]

    return data.map((value, key) => {
      return {
        id: key,
        data: [
          { data: key + 1 },
          { data: value.text },
          {
            data: <a href={value.url} target={'_blank'}>
              {formatMessage(messages.preview)}
            </a>
          },
          {
            data: <Link to={"/siteadmin/edit/staticpage/" + (key + 1)}>
              {formatMessage(messages.editLabel)}
            </Link>
          },
        ]
      }
    })
  }


  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')
      }>
        <CommonTable
          thead={this.thead}
          tbody={this.tbody}
          title={formatMessage(messages.staticPageManagement)}
        />
      </div >
    );
  }
}


export default injectIntl(withStyles(s)((StaticPageManagement)));