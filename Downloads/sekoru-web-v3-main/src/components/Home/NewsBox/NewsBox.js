import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NewsBox.css';
import cs from '../../commonStyle.css';
import Link from '../../Link';

//Image
import searchIcon from '/public/SiteIcons/bookYourIcon.svg';
import steeingIcon from '/public/SiteIcons/becomeaHostIcon.svg';

class NewsBox extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      buttonLabel: PropTypes.string,
      image: PropTypes.string,
    }),
  };



  render() {
    const { data: { buttonLabel, image, buttonLabel2, buttonLink1, buttonLink2 } } = this.props;

    return (

      <div>
        {/* <img src={"/images/banner/x_" + image} className={cx('img-responsive', s.imageCenter)} /> */}
        <div className={s.bgImage} style={{ backgroundImage: `url(/images/banner/x_${image})` }} />
        <div className={cx(s.buttonFlex, cs.paddingTop4)}>
          <Link to={buttonLink1} className={cx(cs.btn, cs.btnPrimary, s.buttonFlex, 'hidden-xs')}>
            <img src={searchIcon} className={'imgIconRight'} />
            <span className={cs.vtrMiddle}>{buttonLabel}</span>
          </Link>
          <Link to={buttonLink2} className={cx(cs.btn, cs.btnPrimary, s.buttonFlex, s.marginLeft, 'marginLeftBoxRTL')}><img src={steeingIcon} className={'imgIconRight'} /><span className={cs.vtrMiddle}>{buttonLabel2}</span></Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s, cs)(NewsBox);
