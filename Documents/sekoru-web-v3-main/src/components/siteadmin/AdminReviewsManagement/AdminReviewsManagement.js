import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminReviewsManagement.css';
import cs from '../../../components/commonStyle.css';

import StarRating from '../../StarRating';
import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';
import TableAction from '../../CommonTable/TableAction';
import Link from '../../../components/Link';

import { deleteAdminReview } from '../../../actions/siteadmin/AdminReviews/deleteAdminReview';

// Translation
import messages from '../../../locale/messages';
import reviewsManagement from './reviewsManagement.graphql';
class AdminReviewsManagement extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    editUser: PropTypes.any,
    deleteAdminReview: PropTypes.any,
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0
    }
    this.paginationData = this.paginationData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  paginationData(currentPage) {
    const { reviewsManagement: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  handleClick(searchList) {
    const { reviewsManagement: { refetch }, setStateVariable } = this.props;
    const { currentPage } = this.state;
    let variables = {
      currentPage: 1,
      searchList: searchList
    };
    setStateVariable(variables);
    refetch(variables);
  }

  handleSearchChange = (e) => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      searchList: e.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.handleClick(self.state.searchList);
      }, 450)
    });
  }

  deleteReview = async (id) => {
    const { deleteAdminReview, setStateVariable } = this.props;
    const { reviewsManagement: { refetch } } = this.props;
    let variables = { currentPage: 1 };
    await deleteAdminReview(id);
    await setStateVariable(variables);
    await refetch(variables);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.carID) },
      { data: formatMessage(messages.carNameLabel) },
      { data: formatMessage(messages.reviewContentLabel) },
      { data: formatMessage(messages.ratingReviewLabel) },
    ]
  };

  tbody = () => {
    const { reviewsManagement: { reviewsManagement } } = this.props;

    return reviewsManagement?.reviewsData.map((value, key) => {
      return {
        id: key,
        data: [
          { data: value.listId },
          {
            data: <div className={cx(cs.displayFlex, cs.alignCenter, cs.spaceBetween)}>
              <Link to={"/cars/" + value.listId} className={cs.siteLinkColor}>
                {
                  value.listData ? value.listData.title : 'Car is missing'
                }
              </Link>
              <TableAction
                showDelete={true}
                onClickDelete={() => this.deleteReview(value.id)}
                showEdit={true}
                editLink={"/siteadmin/edit-review/" + value.id}
              />
            </div>
          },
          { data: value.reviewContent },
          {
            data: <StarRating className={s.reviewStar} value={value.rating} name={'review'} starCount={5} />
          },
        ]
      }
    })
  }

  render() {
    const { currentPage } = this.props;
    const { reviewsManagement: { loading, reviewsManagement } } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <CommonTable
            thead={this.thead}
            tbody={this.tbody}
            title={formatMessage(messages.adminReviews)}
            isSearch
            onSearch={this.handleSearchChange}
          />
          {
            reviewsManagement?.reviewsData?.length > 0
            && <div>
              <CustomPagination
                total={reviewsManagement.count}
                currentPage={currentPage}
                defaultCurrent={1}
                defaultPageSize={10}
                change={this.paginationData}
                paginationLabel={formatMessage(messages.reviews)}
              />
            </div>
          }
        </div>
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {
  deleteAdminReview,
};

export default compose(injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(reviewsManagement, {
    name: 'reviewsManagement',
    options: (props) => ({
      variables: {
        currentPage: props.currentPage,
        searchList: props.searchList,
      },
      fetchPolicy: 'network-only',
    })
  })
)(AdminReviewsManagement);