import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Button,
  Form,
  Row, FormGroup,
  Col, 
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Rating.css';

// Component
import ListingDetails from './ListingDetails';
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';

class RatingConfirmation extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      reviewsCount: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      coverPhoto: PropTypes.number,
      reviewsCount: PropTypes.number,
      reviewsStarRating: PropTypes.number,
      listPhotos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
      }))
    }),
    formatMessage: PropTypes.any,
  };

  render() {
    const { data, hostData } = this.props;
   
    return (
      <div>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={6} md={6} lg={6} className={cx(s.spaceTop5)}>
            <h3 className={cx(s.textBold, s.landingContentTitle)}><FormattedMessage {...messages.reviewTitle} /></h3>
            <p className={s.reviewEndText}>
              <FormattedMessage {...messages.reviewTitle2} />
            </p>
            <FormGroup className={s.formGroup}>
              <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                <Link
                  className={cx(s.button, s.btnPrimary, s.btnlarge, s.btn)}
                  to={"/user/reviews/about-you"}
                >
                  <FormattedMessage {...messages.finish} />
                </Link>
              </Col>
            </FormGroup>
          </Col>
          <Col lg={6} md={6} sm={6} xs={12} className={cx(s.spaceTop5)}>
            <ListingDetails data={data} hostData={hostData}/>
          </Col>
        </Row>
      </div>
    );
  }
}


export default injectIntl(withStyles(s)(RatingConfirmation));
