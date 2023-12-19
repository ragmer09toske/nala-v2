
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeType.css';
import cs from '../../../../commonStyle.css';

import {
  Collapse,
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Redux Form
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../../locale/messages';

// Submit
import submit from '../../../SearchForm/submit';

import CustomCheckbox from '../../../../CustomCheckbox';
import typeIcon from '/public/SiteIcons/steeringIcon.svg';

class HomeType extends Component {

  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
  };

  static defaultProps = {
    fieldsSettingsData: {
      roomType: []
    },
    homeType: []
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.renderCollapse = this.renderCollapse.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  checkboxHorizontalGroup = ({ label, name, options, input, isOpen }) => {
    let count = 4, firstArray = [], restArray = [];
    let itemList = options && options.length > 0 ? options.filter(o => o.isEnable == "1") : [];
    if (itemList && itemList.length > 0) {
      firstArray = itemList.slice(0, count);
      restArray = itemList.slice(count, itemList.length);
    }

    return (
      <div className={cx(s.displayTable)}>
        {
          firstArray && firstArray.length > 0 && firstArray.map((option, index) => {
            if (option.isEnable !== "1") {
              return <span key={index} />
            }
            let splitLineContent = option.itemDescription && option.itemDescription.split('\n');
            let newSplitLineContent = splitLineContent && splitLineContent.filter(function (el) { return el; });
            return (
              <div className={cx(s.displayTypeFlex, cs.paddingBottom3)}>
                <div className={s.checkboxSection}>
                  <CustomCheckbox
                    key={index}
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
                      input.onChange(newValue);
                    }}
                  />
                </div>
                <img src={typeIcon} className={cx('imgIconRight', s.iconCss, 'imgIconRightTypeRTL')} />
                <div>
                  {option.itemName}
                  <div>
                    {
                      newSplitLineContent && newSplitLineContent.length > 0 && newSplitLineContent.map((itemValue, indexes) => {
                        return (
                          <span><p className={s.dot} dangerouslySetInnerHTML={{ __html: itemValue }} />
                          </span>
                        )
                      })
                    }
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

  renderCollapse(input, restArray, isOpen) {
    const { formatMessage } = this.props.intl;
    if (restArray && restArray.length > 0) {
      return (
        <div>
          <Collapse className={s.collapseContainer} in={isOpen}>
            <div>
              {
                restArray.map((option, index) => {
                  let splitLineContent = option.itemDescription && option.itemDescription.split('\n');
                  let newSplitLineContent = splitLineContent && splitLineContent.filter(function (el) { return el; });
                  return (
                    <div className={cx(s.displayTypeFlex, cs.paddingBottom3)}>
                      <div className={s.checkboxSection}>
                        <CustomCheckbox
                          key={index}
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
                            input.onChange(newValue);
                          }}
                        />
                      </div>
                      <img src={typeIcon} className={cx('imgIconRight', s.iconCss, 'imgIconRightTypeRTL')} />
                      <div>
                        {option.itemName}
                        <div>
                          {
                            newSplitLineContent && newSplitLineContent.length > 0 && newSplitLineContent.map((itemValue, indexes) => {
                              return (
                                <span><p className={s.dot} dangerouslySetInnerHTML={{ __html: itemValue }} />
                                </span>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </Collapse>
          <Button bsStyle="link" type="button" className={cx(s.btn, s.btnLink, s.btnLinkSecondary, s.toggleLink, s.filterToggleLink, s.dropdownOverflow, 'bgBlack', 'bgBlackHover')}
            onClick={() => this.handleToggle()}>
            {isOpen ? formatMessage(messages.showLess) : formatMessage(messages.showMore)}
            {
              isOpen && <FontAwesome.FaAngleUp className={s.toggleIcon} />
            }
            {
              !isOpen && <FontAwesome.FaAngleDown className={s.toggleIcon} />
            }
          </Button>
        </div>
      );
    } else {
      return <span />
    }

  }


  render() {
    const { className } = this.props;
    const { fieldsSettingsData: { carType } } = this.props;
    const { isOpen } = this.state;

    return (
      <div className={className}>
        <p className={cx(s.captionTitle, s.space3, s.textBold, s.spaceTop1)}>
          <FormattedMessage {...messages.carType} />
        </p>
        <div className={cx(s.displayTable, s.space4)}>
          <Field
            name="roomType"
            component={this.checkboxHorizontalGroup}
            options={carType}
            isOpen={isOpen}
          />
        </div>
      </div>
    );
  }
}

HomeType = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(HomeType);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  homeType: selector(state, 'roomType')
});

const mapDispatch = {
  change,
  submitForm
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(HomeType)));