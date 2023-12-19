// General
import React, { Component } from 'react';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  Button,
  FormGroup,
  Col,
  Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AdminRolesForm.css';
import cp from '../../../components/commonStyle.css';

// Internal Components
import CustomCheckbox from '../../CustomCheckbox';
import { createAdminRole } from '../../../actions/siteadmin/AdminRoles/manageAdminRoles';
import validate from './validate';
import CommonFormComponent from '../../CommonField/CommonFormComponent';

class AdminRolesForm extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }



  renderCheckbox = ({ input, label, meta: { touched, error }, options, className }) => {
    const { formatMessage } = this.props.intl;
    let currentValue = input.value || [];

    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <Row className={s.marginTop}>
          {
            options && options.length > 0 && options.map((option, index) => {
              return (
                <Col lg={6} md={6} key={index} className={className}>
                  <div className={s.table}>
                    <div className={s.tableRow}>
                      <div className={cx(s.tableCell, s.checkBoxWidth)}>
                        <CustomCheckbox
                          {...input}
                          className={'icheckbox_square-green'}
                          value={option.id}
                          name={`${input.name}[${index}]`}
                          checked={currentValue.indexOf(option.id) !== -1}
                          onChange={(event) => {
                            const newValue = [...currentValue] || [];
                            if (event === true) {
                              newValue.push(option.id);
                            } else {
                              newValue.splice(newValue.indexOf(option.id), 1);
                            }
                            return input.onChange(newValue);
                          }}
                        />
                      </div>
                      <div className={cx(s.tableCell, s.textWidth)}>
                        {' ' + option.privilege}
                      </div>
                    </div>
                  </div>
                </Col>
              )
            })
          }
        </Row>
      </div>
    );
  }

  async handleFormSubmit(values) {
    const { createAdminRole, paginationData } = this.props;
    const response = await createAdminRole(
      values.id,
      values.name,
      values.description,
      values.privileges
    );
    if (response && response.status === 200) {
      paginationData(1);
    }
  }

  render() {
    const { error, handleSubmit, submitting, id, privileges } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.formMaxWidth, 'maxwidthcenter', 'empty')}>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <FormGroup className={s.space3}>
            <label className={cp.labelTextNew}><FormattedMessage {...messages.roleNameLabel} /></label>
            <Field
              name="name"
              type="text"
              component={CommonFormComponent}
              label={formatMessage(messages.roleNameLabel)}
              inputClass={cp.formControlInput}
            />
          </FormGroup>
          <FormGroup className={s.space3}>
            <label className={cp.labelTextNew}><FormattedMessage {...messages.descriptionAdminLabel} /></label>
            <Field
              name="description"
              component={CommonFormComponent}
              label={formatMessage(messages.descriptionAdminLabel)}
              inputClass={cp.formControlInput}
              componentClass={"textarea"}
            />
          </FormGroup>
          <FormGroup className={s.space3}>
            <label className={cp.labelTextNew}><FormattedMessage {...messages.privilagesLabel} /></label>
            <Field
              name="privileges"
              component={this.renderCheckbox}
              options={privileges}
              className={s.formControlInput}
            />
          </FormGroup>
          <FormGroup className={s.formGroup}>
            <div className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
              <Button className={cx(cp.btnPrimary, cp.btnlarge)} type="submit" disabled={submitting}>
                {id ? <FormattedMessage {...messages.update} /> : <FormattedMessage {...messages.addLabel} />}
              </Button>
            </div>
          </FormGroup>
        </form>
      </div>
    )
  }

}

AdminRolesForm = reduxForm({
  form: "AdminRolesForm", // a unique name for this form
  validate,
})(AdminRolesForm);

const selector = formValueSelector('AdminRolesForm');

const mapState = (state) => ({
  id: selector(state, 'id'),
  privileges: state.listSettings.privileges
});

const mapDispatch = {
  createAdminRole
};

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(AdminRolesForm)));