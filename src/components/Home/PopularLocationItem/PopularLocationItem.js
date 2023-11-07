import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PopularLocationItem.css';
import cx from 'classnames';
import cs from '../../commonStyle.css';
import { injectIntl } from 'react-intl';

// Component

import Link from '../../Link';
// Locale
import ListPopularLocationPhoto from '../../ListPopularLocationCoverPhoto';
class PopularLocationHomeSlider extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.func,
    id: PropTypes.number,
    location: PropTypes.string,
    locationAddress: PropTypes.string,
    image: PropTypes.string,
  };

  render() {
    const { id, location, locationAddress, image } = this.props;
    const { coverPhoto } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Link to={'/s?&address=' + locationAddress + '&chosen=1'} className={s.noLine}>
        <div className={s.outLineBorder}>
          <div className={s.zoomContainer}>
            <ListPopularLocationPhoto
              className={cx(s.imageContent)}
              coverPhoto={coverPhoto}
              listPhotos={image}
              bgImage
            />
          </div>
          <div className={cx(s.infoContainer, cs.commonSubTitleText, cs.fontWeightBold, cs.paddingTop5)}>
            {location}
          </div>
        </div>
      </Link>
    );
  }
}

export default injectIntl(withStyles(s, cs)(PopularLocationHomeSlider));