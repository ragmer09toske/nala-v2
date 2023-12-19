import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';
import cs from '../../components/commonStyle.css';
// Components
import YourReviews from './YourReviews';
// Locale
import messages from '../../locale/messages';
import debounce from '../../helpers/debounce';

class Reviews extends React.Component {

  static propTypes = {
    reviewsData: PropTypes.shape({
      loading: PropTypes.bool,
      formatMessage: PropTypes.any,
      userReviews: PropTypes.array,
      refetch: PropTypes.any
    }),
    loadMore: PropTypes.any.isRequired
  };

  static defaultProp = {
    reviewsData: {
      loading: true
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 'responded',
      searchKey: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSearchChange = debounce(this.handleSearchChange.bind(this));
  }

  handleClick(type, current) {
    const { reviewsData: { refetch } } = this.props;
    let variables = { ownerType: type, offset: 0, current };
    this.setState({ current });
    refetch(variables);
  }

  handleSearchChange(searchKey) {
    const { reviewsData: { refetch }, type } = this.props;
    let variables = {
      searchKey,
      current: this.state.current,
      type: 'others'
    };
    this.setState({ searchKey });
    refetch(variables);
  }

  render() {
    const { current, searchKey } = this.state;
    const { reviewsData, reviewsData: { userReviews }, loadMore, type, isLoading } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx('reviews', s.reviewPanel, 'whiteBgColor', 'youcarsBg')}>
        <ul className={cx(cs.listContainer, cs.dFlex, s.mobileFlexContainer)}>
          <li className={current === 'responded' ? s.active : ''}>
            <a className={cx(cs.listTabItem, s.tabItem, 'tabLinkRTL', 'textWhite')} onClick={() => this.handleClick('others', 'responded')}>
              <FormattedMessage {...messages.responded} />
            </a>
          </li>
          <li className={current === 'notResponded' ? s.active : ''}>
            <a className={cx(cs.listTabItem, s.tabItem, 'tabLinkRTL', 'textWhite')} onClick={() => this.handleClick('others', 'notResponded')}>
              <FormattedMessage {...messages.notResponded} />
            </a>
          </li>
        </ul>

        {reviewsData && userReviews && userReviews.totalCount > 0 &&
          <div className={cx(cs.spaceTop5, s.searchBox)}>
            <input placeholder={formatMessage(messages.searchReviews)} type="" className={cx(s.locationBgIcon, s.searchReviewInput, cs.formControlInput, 'searchReviewInputRTL')} onChange={(e) => this.handleSearchChange(e.target && e.target.value)} maxLength={255} />
          </div>
        }
        <YourReviews data={reviewsData} loadMore={loadMore} current={current} searchKey={searchKey} isLoading={isLoading} />
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(Reviews));
