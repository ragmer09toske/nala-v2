import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WishLists.css';

// Components
import WishLists from '../../components/WishLists';
import NotFound from '../../routes/notFound/NotFound';
import EditWishListGroup from '../../components/WishLists/EditWishListGroup';

class WishListsContainer extends React.Component {
  static propTypes = {
    profileId: PropTypes.number,
    wishListId: PropTypes.number
  };

  render() {
    const { profileId, wishListId } = this.props;

    return (
      <div className={s.wishListPadding}>
        {
          wishListId && profileId && <>
            <EditWishListGroup profileId={profileId} wishListId={wishListId} />
          </>
        }
        {
          !wishListId && profileId && <>
            <WishLists profileId={profileId} />
          </>
        }
        {
          !wishListId && !profileId && <>
            <NotFound />
          </>
        }
      </div>
    );
  }
}

export default withStyles(s)(WishListsContainer);