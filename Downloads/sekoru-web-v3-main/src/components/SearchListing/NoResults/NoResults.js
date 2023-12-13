
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NoResults.css';

// Locale
import messages from '../../../locale/messages';

//Image
import noResultIcon from '/public/siteImages/noSearchResult.png';

class NoResults extends React.Component {
 
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <section className={s.textCenter}>
            <img src={noResultIcon} className={s.imgWidth}/>
            <h1 className={s.headingText}><span><FormattedMessage {...messages.noResultsTitle} /></span></h1>
              <div className={s.subHeading}>
                <div><FormattedMessage {...messages.noResultsSubTitle} /></div>
                <div><FormattedMessage {...messages.noResultsTerms1} /> <FormattedMessage {...messages.noResultsTerms2} /></div>
              </div>
          </section>
        </div>
    </div>
    );
  }
}

export default injectIntl(withStyles(s)(NoResults));