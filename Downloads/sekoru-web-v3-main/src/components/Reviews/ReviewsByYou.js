import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'react-bootstrap';
import s from './Reviews.css';
import cs from '../../components/commonStyle.css';

// Components
import PastReviews from './PastReviews';
import WriteReviews from './WriteReviews';
import Link from '../Link';

// Locale
import messages from '../../locale/messages';
import debounce from '../../helpers/debounce';

class ReviewsByYou extends React.Component {

  static propTypes = {
    reviewsData: PropTypes.shape({
      loading: PropTypes.bool,
      formatMessage: PropTypes.any,
      userReviews: PropTypes.array,
      refetch: PropTypes.any
    }),
    pendingData: PropTypes.shape({
      loading: PropTypes.bool,
      pendingReviews: PropTypes.array
    }),
    loadMore: PropTypes.any.isRequired
  };

  static defaultProp = {
    reviewsData: {
      loading: true
    },
    pendingData: {
      loading: true
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 'others',
      searchKey: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSearchChange = debounce(this.handleSearchChange.bind(this));
  }

  handleClick(current) {
    const { reviewsData: { refetch } } = this.props;
    let variables = { ownerType: current, offset: 0 };
    this.setState({ current });
    refetch(variables);
  }


  handleSearchChange(searchKey) {
    const { reviewsData: { refetch } } = this.props;
    let variables = {
      searchKey,
      current: this.state.current,
      type: 'me'
    };
    this.setState({ searchKey });
    refetch(variables);
  }

  render() {
    const { current, searchKey } = this.state;
    const { reviewsData, reviewsData: { userReviews }, pendingData, loadMore, isLoading } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.reviewPanel,'reviews','whiteBgColor','youcarsBg')}>
        <ul className={cx(cs.listContainer,cs.dFlex,s.mobileFlexContainer)}>
          <li className={current === 'others' ? s.active : ''}>
            <a className={cx(cs.listTabItem,s.tabItem,'tabLinkRTL', 'textWhite')} onClick={() => this.handleClick('others')}>
              <FormattedMessage {...messages.reviewsToWrite} />
            </a>
          </li>
          <li className={current === 'me' ? s.active : ''}>
            <a className={cx(cs.listTabItem,s.tabItem,'tabLinkRTL', 'textWhite')} onClick={() => this.handleClick('me')}>
              <FormattedMessage {...messages.writtenReviews} />
            </a>
          </li>
        </ul>
        {current === 'me' && userReviews && userReviews.totalCount > 0 && <div className={cx(cs.spaceTop5,s.searchBox)}>
          <input placeholder={formatMessage(messages.searchReviews)} type="" className={cx(s.locationBgIcon,s.searchReviewInput, cs.formControlInput, 'searchReviewInputRTL')} onChange={(e) => this.handleSearchChange(e.target && e.target.value)} />
        </div>}

        {current === 'others' && <WriteReviews data={pendingData} />}
        {current === 'me' && <PastReviews data={reviewsData} loadMore={loadMore} searchKey={searchKey} isLoading={isLoading}/>}

      </div>
    );
  }
}

export default injectIntl(withStyles(s,cs)(ReviewsByYou));
