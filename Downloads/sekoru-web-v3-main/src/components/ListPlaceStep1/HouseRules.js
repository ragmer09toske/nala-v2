import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  FormGroup,
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import cs from '../commonStyle.css';

// Internal Components
import CustomCheckbox from '../CustomCheckbox';
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';

import updateStep3 from './updateStep3';
// Locale
import messages from '../../locale/messages';
class HouseRules extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      carRules: [],
      isDisabled: true,
    }
  }

  componentDidMount() {
    const { valid } = this.props;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({ carRules: listingFields.carRules });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { valid, listingFields } = nextProps;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }

    if (listingFields != undefined) {
      this.setState({ carRules: listingFields.carRules });
    }
  }

  checkboxGroup = ({ label, name, options, input }) => (
    <ul className={s.listContainer}>
      {
        options.map((option, index) => {
          if (option.isEnable === "1") {
            return (
              <li className={cx(s.listContent, cs.spaceBottom3)} key={index}>
                <span className={cx(s.checkBoxSection, cs.vtrTop)}>
                  <CustomCheckbox
                    name={`${input.name}[${index}]`}
                    value={option.id}
                    checked={input.value.indexOf(option.id) !== -1}
                    className={'icheckbox_square-green'}
                    onChange={event => {
                      const newValue = [...input.value];
                      if (event === true) {
                        newValue.push(option.id);
                      } else {
                        newValue.splice(newValue.indexOf(option.id), 1);
                      }
                      return input.onChange(newValue);
                    }}
                  />
                </span>
                <span className={cx(s.checkBoxSection, s.checkBoxLabel, 'wordBreak')}>
                  <label className={cx(cs.commonMediumText, cs.fontWeightMedium)}>{option.itemName}</label>
                </span>
              </li>
            )
          }
        }
        )
      }
    </ul>
  );


  render() {
    const { handleSubmit, nextPage, previousPage, formPage, step } = this.props;
    const { carRules, isDisabled } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.stepGrid, 'stepGridRTL')}>
        <SidePanel
          title={formatMessage(messages.step3Heading)}
          landingContent={formatMessage(messages.setHouseRules)}
        />
        <form onSubmit={handleSubmit}>
          <div className={s.landingMainContent}>
            <h3 className={cx(cs.spaceBottom3, cs.commonContentText)}><FormattedMessage {...messages.stepThreeRules} /></h3>
            <FormGroup className={s.formGroup}>
              <Field name="carRules" component={this.checkboxGroup} options={carRules} />
            </FormGroup>
          </div>
          <FooterButton
            isDisabled={isDisabled}
            nextPage={nextPage}
            previousPage={previousPage}
            nextPagePath={"pricing"}
            previousPagePath={"home"}
            formPage={formPage}
            step={step}
          />
        </form>
      </div>
    );
  }
}

HouseRules = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(HouseRules);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(HouseRules)));
