import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WishListGroupItem.css';
import cs from '../../../components/commonStyle.css';
import cx from 'classnames';
import { injectIntl } from 'react-intl';

// Component
import Link from '../../Link';
import ListCoverPhoto from '../../ListCoverPhoto';

//Images
import defaultImage from '../../../../public/SiteIcons/transportation.svg'

class WishListGroupItem extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.object
  };

  render() {
    const { data, data: { id, name, userId, isPublic, updatedAt, createdAt, wishListCount, wishListCover } } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <>
        <Link to={"/wishlists/" + id} className={cx(cs.displayBlock, cs.noTextDecration)}>
          {
            wishListCover && wishListCover.listData && wishListCover.listData.listPhotos && <>
              <ListCoverPhoto
                className={s.imageContent}
                coverPhoto={wishListCover.listData.coverPhoto != null ? wishListCover.listData.coverPhoto : wishListCover.listData.listPhotos[0].id}
                listPhotos={wishListCover.listData.listPhotos}
                photoType={"x_medium"}
                bgImage
              />
            </>
          }
          {
            wishListCount === 0 && <>
              {/* <img src={defaultImage} className={s.defaultWishlistImg} /> */}
              <div className={cx(s.imageContent, s.defaultImageCss)} style={{ backgroundImage: `url(${defaultImage})` }} />
            </>
          }
          <div>
            <h5 className={cx(cs.commonContentText, cs.fontWeightMedium, cs.siteTextColor, cs.paddingTop3)}>
              {`${name}`}
              {' '}<span className={cs.displayinlineBlock}>{`(${wishListCount})`}</span>
            </h5>
          </div>
        </Link>
      </>
    );
  }
}

export default injectIntl(withStyles(s)(WishListGroupItem));