// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Apollo
import { graphql, gql, compose } from 'react-apollo';

// Redux form
import { reduxForm } from 'redux-form';

// Locale
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './WishListModalForm.css';
import cs from '../../components/commonStyle.css';

// Redux Action
import { closeWishListModal } from '../../actions/WishList/modalActions';

// GraphQL Query
import getAllWishListGroupQuery from '../WishListModal/getAllWishListGroup.graphql';
import getWishListGroupQuery from '../WishLists/EditWishListGroup/getWishListGroup.graphql'
//Image
import heartOff from '/public/SiteIcons/wishlistOff.svg';
import heartOn from '/public/SiteIcons/wishlistOn.svg';
import ListDetails from '../WishListModal/ListDetails/ListDetails';
import defaultIcon from '../../../public/SiteIcons/transportation.svg';
import { Button } from 'react-bootstrap';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

class WishListModalForm extends Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async submitForm(values, dispatch) {
    const { closeWishListModal, mutate, profileId } = this.props;
  }

  async handleClick(event, wishListGroupId) {
    const { mutate, listId, profileId, isEditWishList, setLoaderStart, setLoaderComplete } = this.props;
    setLoaderStart('wishListLoading')
    let refetchQueries = [{
      query: getAllWishListGroupQuery,
      variables: {
        profileId
      },
      fetchPolicy: 'network-only',
    }];

    if (isEditWishList) {
      refetchQueries.push({
        query: getWishListGroupQuery,
        variables: {
          profileId,
          id: wishListGroupId
        },
        fetchPolicy: 'network-only',
      })
    }

    const { data } = await mutate({
      variables: {
        listId,
        wishListGroupId,
        eventKey: event
      },
      refetchQueries
    });
    setLoaderComplete('wishListLoading')
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, closeWishListModal, wishListLoading } = this.props;
    const { formatMessage } = this.props.intl;
    const { data, data: { getAllWishListGroup }, listId } = this.props;
    let showDefaultIcon = true;
    return (

      <form onSubmit={handleSubmit(this.submitForm)}>
        <div className={s.listHeight}>
          {error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
          {
            getAllWishListGroup && getAllWishListGroup.status == 'success' && getAllWishListGroup.count > 0 && <>
              {
                getAllWishListGroup.wishListGroupData.map((option, index) => {
                  let path, source;
                  if (option.wishListCover && option.wishListCover.listData) {
                    let coverPhoto = option.wishListCover.listData.coverPhoto ? option.wishListCover.listData.coverPhoto : option.wishListCover.listData.listPhotos[0].id;
                    let data = option.wishListCover.listData.listPhotos.filter(item => item.id == coverPhoto);
                    if (data && data.length > 0 && data[0]) source = data[0].name;
                    path = '/images/upload/small_';
                    source = path + source;
                    source ? showDefaultIcon = false : showDefaultIcon = true;
                  } else {
                    source ? showDefaultIcon = false : showDefaultIcon = true;
                  }

                  return (
                    <div className={cx(s.displayFlex, s.marginBottom)} key={index}>
                      {!showDefaultIcon && <div className={cx(s.imgContainer, 'imgContainerRTL')} style={{ backgroundImage: `url(${source})` }} />}
                      {showDefaultIcon && <div className={cx(s.imgContainer, 'imgContainerRTL', s.defaultImage)} style={{ backgroundImage: `url(${defaultIcon})` }} />}
                      <div className={s.displayFlex}>
                        <h4 className={cx(cs.commonContentText, cs.fontWeightMedium, s.namePadding)}>
                          {option.name}
                        </h4>
                        <div>
                          {
                            (option.wishListIds.indexOf(listId) !== -1) && <Button className={s.heartBtn} onClick={(event) => {
                              this.handleClick(false, option.id);

                            }} >
                              <img src={heartOn} alt='heartIcon' />
                            </Button>
                          }
                          {
                            (option.wishListIds.indexOf(listId) == -1) && <Button className={s.heartBtn} onClick={(event) => {
                              this.handleClick(true, option.id);
                            }} >
                              <img src={heartOff} alt='heartIcon' />
                            </Button>
                          }
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </>
          }
          {
            getAllWishListGroup && getAllWishListGroup.status == 'success' && getAllWishListGroup.count == 0 && <>
              <h5 className={cx(cs.commonContentText)}>
                <FormattedMessage {...messages.noWishlistModal} />
              </h5>
            </>
          }
        </div>
      </form>
    );
  }

}

WishListModalForm = reduxForm({
  form: 'WishListModalForm',
  destroyOnUnmount: true
})(WishListModalForm);

const mapState = state => ({
  listId: state.modalStatus.listId,
  isEditWishList: state.modalStatus.isEditWishList,
  profileId: state.account.data.profileId,
  wishListLoading: state.loader.wishListLoading
});

const mapDispatch = {
  closeWishListModal,
  setLoaderStart,
  setLoaderComplete
};

export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation CreateWishList(
    $listId: Int!,
    $wishListGroupId:Int,
    $eventKey:Boolean,
){
    CreateWishList(
        listId: $listId,
        wishListGroupId: $wishListGroupId,
        eventKey: $eventKey,
    ) {
        status
    }
}
  `)
)(WishListModalForm);