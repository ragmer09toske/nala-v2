import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './WhyBlock.css';

class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { refer, siteName, data } = this.props;
    let FbURL = '/login/facebook';
    let GoogleURL = '/login/google';
    if (refer) {
      FbURL = '/login/facebook?refer=' + refer;
      GoogleURL = '/login/google?refer=' + refer;
    }

    return (

      <Grid className={s.container}>
        <div className={s.gridWhy}>
          <div className={s.whyblock}>
            <div>
              <h4 className={s.common}>
                {data && data.whyBlockTitle1}
              </h4>
              <p className={s.common}>
                {data && data.whyBlockContent1}
              </p>
            </div>
            <img src={'/images/home/' + data.whyBlockImage1} className={cx(s.imageObject, s.imageWidthHeight)}/>
          </div>
          <div className={cx(s.whyblock, s.whyblockTwo)}>
            <div>
              <h4 className={s.common}>
                {data && data.whyBlockTitle2}
              </h4>
              <p className={s.common}>
                {data && data.whyBlockContent2}
              </p>
            </div>
            <img src={'/images/home/' + data.whyBlockImage2} className={cx(s.imageObject, s.imageWidthHeight)} />
          </div>
        </div>
      </Grid>
    );
  }
}

const mapState = state => ({
  siteName: state.siteSettings.data.siteName

});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(SocialLogin));
