
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CheckboxListItems.css';
import cs from '../../../../commonStyle.css';
import {
  Button,
  Collapse
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
// Redux Form
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Internal Component
import CustomCheckbox from '../../../../CustomCheckbox';

// Submit
import submit from '../../../SearchForm/submit';

//Image
import dynamicIcon from '/public/SiteIcons/steeringIcon.svg';
import downIcon from '/public/SiteIcons/Show-down-arrow.svg';
import upIcon from '/public/SiteIcons/Show-up-arrow.svg';

class CheckboxListItems extends Component {

  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool
  };

  static defaultProps = {
    isExpand: false,
    options: [],
    showLabel: 'Show',
    hideLabel: 'Hide',
    isActive: false
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.checkboxGroup = this.checkboxGroup.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.renderCollapse = this.renderCollapse.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { isActive } = this.props;
    this.setState({
      isOpen: isActive
    });
  }

  componentDidMount() {
    const { isActive } = this.props;
    this.setState({
      isOpen: isActive
    });
  }

  handleToggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  renderCollapse(input, restArray, isOpen) {
    const { showLabel, hideLabel } = this.props;

    if (restArray && restArray.length > 0) {
      return (
        <div className={s.space2}>
          <Collapse className={s.collapseContainer} in={isOpen}>
            <div>
              {
                restArray.map((option, index) => {
                  return (
                    <div key={index} className={cx(s.checkBoxContainer)}>
                      <div className={cx(s.checkBoxFlex, cs.spaceBottom3, 'checkBoxFlexRTL')}>
                        <div>
                          <CustomCheckbox
                            className={'icheckbox_square-green'}
                            name={`${input.name}[${index}]`}
                            value={option.id}
                            checked={input.value.indexOf(option.id) !== -1}
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
                        </div>
                        <img src={dynamicIcon} className={s.dynamicIconCss} />
                        <div className={cx(cs.commonMediumText, s.positionTop)}>
                          {option.itemName}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </Collapse>
          <Button bsStyle="link" type="button" className={cx(s.btn, s.btnLink, s.btnLinkSecondary, s.toggleLink, 'btnLinkItemRTL', s.showMoreBtn)}
            onClick={() => this.handleToggle()}>
            {isOpen ? hideLabel : showLabel}
            {
              isOpen && <img src={upIcon} className={'showBtnGap'}/>
            }
            {
              !isOpen && <img src={downIcon} className={'showBtnGap'}/>
            }
          </Button>
        </div>
      );
    } else {
      return <span />
    }

  }

  checkboxGroup = ({ label, name, options, input, isOpen }) => {
    let count = 4, firstArray = [], restArray = [];
    let itemList = options && options.length > 0 ? options.filter(o => o.isEnable == "1") : [];
    if (itemList && itemList.length > 0) {
      firstArray = itemList.slice(0, count);
      restArray = itemList.slice(count, itemList.length);
    }

    return (
      <div>
        {
          firstArray.map((option, index) => {
            return (
              <div key={index} className={cx(s.checkBoxContainer)}>
                <div className={cx(s.checkBoxFlex, cs.spaceBottom3, 'checkBoxFlexRTL')}>
                  <div>
                    <CustomCheckbox
                      className={'icheckbox_square-green'}
                      name={`${input.name}[${index}]`}
                      
                      value={option.id}
                      checked={input.value.indexOf(option.id) !== -1}
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
                  </div>
                  <img src={dynamicIcon} className={s.dynamicIconCss} />
                  <div className={cx(cs.commonMediumText, s.positionTop)}>
                    {option.itemName}
                  </div>
                </div>
              </div>
            )
          })
        }
        {this.renderCollapse(input, restArray, isOpen)}
      </div>
    )
  };

  render() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { options, captionTitle, fieldName } = this.props;
    const { formatMessage } = this.props.intl;
    const { isOpen } = this.state;

    return (
      <div className={className}>
        <p className={cx(s.captionTitle, cs.fontWeightBold)}>
          {captionTitle}
        </p>
        <div className={cx(s.displayTable, s.space2)}>
          <div className={cx(s.displayTableCell, s.fullWidth)}>
            <Field
              name={fieldName}
              options={options}
              component={this.checkboxGroup}
              isOpen={isOpen}
            />
          </div>
        </div>
      </div>
    );
  }
}

CheckboxListItems = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(CheckboxListItems);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data
});

const mapDispatch = {
  change,
  submitForm
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(CheckboxListItems)));