import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  Button,
  Form,
  Row, FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Rating.css';
import cs from '../../../components/commonStyle.css';

// Component
import ListingDetails from './ListingDetails';
import StarRating from '../../StarRating';

// Helpers
import validate from './validate';

// Graphql
import WriteReviewMutation from './WriteReviewMutation.graphql';

// Locale
import messages from '../../../locale/messages';
import history from '../../../core/history';
import { toastr } from 'react-redux-toastr';

class RatingForm extends React.Component {

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

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={'inputFocusColor'}>
        <FormGroup className={cx(s.noMargin)}>
          <FormControl
            {...input}
            className={className}
            componentClass="textarea"
            placeholder={label}
          >
            {children}
          </FormControl>
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </FormGroup>
      </div>
    );
  }

  renderStarRating = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.starSize, 'writeOverAllIcon', 'writeOverAllIconRTL')}>
        <StarRating
          name={input.name}
          change={input.onChange}
          editing={true}
          starCount={5}
          className={cx(cs.writeReviewStarHeight)}
        />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    );
  }
  handleChange = () => {
    history.push('/user/reviews/you');
  }

  async submitForm(values, dispatch) {
    const { mutate, gotoPage2 } = this.props;
    const { data } = await mutate({ variables: values });
    if (data?.writeReview?.status == '200') {
      gotoPage2();
    } else {
      toastr.error('Oops!', 'You have already reviewed this reservations!')
    }

  }

  render() {
    const { data, hostData } = this.props;
    const { gotoPage2 } = this.props;
    const { error, handleSubmit, submitting, dispatch, isHost } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Row className={s.landingContainer}>
        <Col xs={12} sm={6} md={7} lg={7} className={cx(s.landingContent, s.spaceTop5)}>
          <div className={cx(cs.spaceBottom4)}>
            <h1 className={s.landingContentTitle}><FormattedMessage {...messages.writeReview} /></h1>
            <p className={s.landingStep}><FormattedMessage {...messages.reviewPageTitle1} /></p>
          </div>
          <Form onSubmit={handleSubmit(this.submitForm)}>
            <div>
              <div>
                <h2 className={s.rateingText}><FormattedMessage {...messages.reviewRating} /></h2>
                <Field
                  name="rating"
                  component={this.renderStarRating}
                />
              </div>
              <hr className={s.horizontalLineThrough} />
              <div className={cx(s.space4)}>
                <h2 className={s.rateingText}><FormattedMessage {...messages.reviewPageTitle} /></h2>
                <Field
                  className={cx(s.textareaInput)}
                  name="reviewContent"
                  component={this.renderFormControlTextArea}
                  label={isHost ? formatMessage(messages.reviewTextArea2) : formatMessage(messages.reviewTextArea)}
                />
              </div>
            </div>
            <div className={s.buttonGroup}>
              <Button className={cx(s.button, s.btnlarge, s.btnPrimaryBorder, s.marginRight, 'noMarginLeftRTL')}
                type="button"
                onClick={this.handleChange}
              >
                <FormattedMessage {...messages.cancel} />
              </Button>

              <Button className={cx(s.btn, s.button, s.btnPrimary, s.btnlarge, 'writeReviewBtnMarginLeftRTL')}
                type="submit"
                disabled={submitting}
              >
                <FormattedMessage {...messages.submit} />
              </Button>
            </div>
          </Form>
        </Col>
        <Col lg={5} md={5} sm={6} xs={12} className={cx(s.landingContent, s.spaceTop5)}>
          <ListingDetails data={data} hostData={hostData} />
        </Col>
      </Row>
    );
  }
}

RatingForm = reduxForm({
  form: 'RatingForm', // a unique name for this form
  validate
})(RatingForm);

export default compose(
  injectIntl,
  withStyles(s),
  graphql(WriteReviewMutation),
)(RatingForm);
