import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Grid,
  Row, FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Panel,
  Label,
  Image,
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './QuoteSection.css';
import { FormattedMessage } from 'react-intl';
import Link from '../../Link';
// Locale
import messages from '../../../locale/messages';

// Images
import qutoimage from './quto.jpg';
import capinetImage from './cabinet.jpg';


// History
import history from '../../../core/history';

class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };



  handleClick() {
    history.push('/become-a-owner?mode=new');
}


  render() {
    const { refer, siteName } = this.props;


    return (
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={s.quotesection}>
              <div className={s.imagearea}>
                <Image src={qutoimage} alt="image" responsive />
              </div>

              <div className={cx(s.contentarea, s.rightsidecontent)}>
                <h3 className={s.qutoIcon}><span className={s.qutoSize}>“</span></h3>
                <h2 className={s.quotesectionH2}><FormattedMessage {...messages.quoteText1} /></h2>
                <h6><FormattedMessage {...messages.quotetagline1} /></h6>
                <Button className={s.btnlearn}  onClick={this.handleClick}>
                <FormattedMessage {...messages.quotebutton1} /></Button>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={s.quotesection}>
              <div className={cx(s.contentarea, s.leftsidecontent)}>
                <h3 className={s.qutoIcon}><span className={s.qutoSize}>“</span></h3>
                <h2 className={s.quotesectionH2}><FormattedMessage {...messages.quoteText2} /></h2>
                <h6><FormattedMessage {...messages.quotetagline1} /></h6>
                <Button className={s.btnlearn}  onClick={this.handleClick}>
                <FormattedMessage {...messages.quotebutton1} />
                </Button>
              </div>
              <div className={s.imagearea}>
                <Image src={capinetImage} alt="image" responsive />
              </div>
            </div>
          </Col>
        </Row>
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
