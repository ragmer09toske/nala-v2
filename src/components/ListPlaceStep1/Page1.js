// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';


// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

import update from './update';

// Component
import ListPlaceTips from '../ListPlaceTips';
import CommonFormComponent from '../CommonField/CommonFormComponent';

class Page1 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    nextPage: PropTypes.any,
    userData: PropTypes.shape({
      firstName: PropTypes.string.isRequired
    }).isRequired
  };

  static defaultProps = {
    userData: {
      firstName: ''
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      // roomType: [],
      // personCapacity: []
      carType: [],
    }
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({
        // roomType: listingFields.roomType,
        // personCapacity: listingFields.personCapacity
        carType: listingFields.carType,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({
        // roomType: listingFields.roomType,
        // personCapacity: listingFields.personCapacity
        carType: listingFields.carType,
      });
    }
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage } = this.props;
    const { userData } = this.props;
    const { roomType, personCapacity, carType } = this.state;
    
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <Col xs={12} smOffset={1} sm={8} mdOffset={1} md={8} lgOffset={1} lg={8}>
              <h2 className={s.landingTitle}><FormattedMessage {...messages.hi} />, {userData.firstName}! <FormattedMessage {...messages.letYouGetReady} /></h2>
              <strong className={s.landingStep}><span><FormattedMessage {...messages.step1HeadingNew}/></span></strong>
              <h3 className={s.landingContentTitle}> <FormattedMessage {...messages.whatKindOfPlace} /> </h3>
              <form onSubmit={handleSubmit}>
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col componentClass={ControlLabel} xs={12} sm={12} md={8} lg={8} >
                      <Field
                        name="carType"
                        component={CommonFormComponent}
                        inputClass={cx(s.backgroundPosition, s.formControlSelect, s.jumboSelect, s.noFontWeight)}
                      >
                        {
                          carType.map((value, key) => {
                            return (
                              value.isEnable == 1 && <option
                                value={value.id}
                                key={key}
                              >
                                {value.itemName}
                              </option>
                            )
                          })
                        }
                      </Field>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.formGroup}>
                  <Button className={cx(s.button, s.btnPrimary, s.btnlarge)} onClick={() => nextPage('car')}>
                    <FormattedMessage {...messages.continue} />
                  </Button>
                </FormGroup>
              </form>
            </Col>
          </Col>
          <ListPlaceTips />
        </Row>
      </Grid>
    )
  }
}

Page1 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: update
})(Page1);

const mapState = (state) => ({
  userData: state.account.data,
  listingFields: state.listingFields.data
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Page1)));
