import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';

// Style
import {
  Button,
  FormGroup,
  Col,
  Row,
  ControlLabel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChangeAdminForm.css';
import cs from '../../../components/commonStyle.css';

import validate from './validate';
import { cpus } from 'os';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import CommonFormComponent from '../../CommonField/CommonFormComponent';

class ChangeAdminForm extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }


  async submitForm(values, dispatch) {
    const { mutate } = this.props;
    const { data } = await mutate({ variables: values });

    if (data && data.changeAdminUser) {
      if (data.changeAdminUser.status === '200') {
        toastr.success("Changed Successfully!", "Admin access details changed successfully!");
      } else if (data.changeAdminUser.status === 'email') {
        toastr.error("Failed to update!", "Oops! this email address is already exist.");
      } else {
        toastr.error("Failed to update!", "Your changes to admin access details is failed!");
      }
    }
    dispatch(reset('ChangeAdminForm'));
  }

  render() {

    const { error, handleSubmit, submitting, dispatch, title, isSuperAdmin } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper)}>
            <div className={s.sectionCenter}>
              <div className={cs.commonAdminBorderSection}>
                <h1 className={cx(cs.commonTotalText, cs.fontWeightBold, cs.spaceBottom12)}><FormattedMessage {...messages.changeAdminEmailPassword} /></h1>
                <form onSubmit={handleSubmit(this.submitForm)}>
                  {error && <strong>{formatMessage(error)}</strong>}
                  {isSuperAdmin &&
                    <FormGroup className={s.space3}>
                      <ControlLabel className={cs.labelTextNew}>
                        <FormattedMessage {...messages.email} />
                      </ControlLabel>
                      <Field name="email" type="text" component={CommonFormComponent}
                        label={formatMessage(messages.email)}
                        note={formatMessage(messages.changeAdminPasswordDesc)}
                        inputClass={cx(cs.formControlInput)}
                      />
                      {
                        <p className={s.userText}>
                          <FormattedMessage {...messages.changeAdminPasswordDesc} />
                        </p>
                      }
                    </FormGroup>
                  }
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cs.labelTextNew}>
                      <FormattedMessage {...messages.password} />
                    </ControlLabel>
                    <Field name="password" type="password" component={CommonFormComponent} label={formatMessage(messages.password)} inputClass={cx(cs.formControlInput)} />
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cs.labelTextNew}>
                      <FormattedMessage {...messages.confirmPassword} />
                    </ControlLabel>
                    <Field name="confirmPassword" type="password" component={CommonFormComponent} label={formatMessage(messages.confirmPassword)} inputClass={cx(cs.formControlInput)} />
                  </FormGroup>
                  <FormGroup className={s.noMargin}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className={cx(cs.textAlignRight, 'textAlignLeftRTL')}>
                        <Button className={cx(cs.btnPrimary, cpus.btnlarge)} type="submit" disabled={submitting} ><FormattedMessage {...messages.save} /></Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </form>
              </div>
            </div>
      </div>
    );
  }

}

ChangeAdminForm = reduxForm({
  form: 'ChangeAdminForm', // a unique name for this form
  validate
})(ChangeAdminForm);


const mapState = (state) => ({
  isSuperAdmin: state.runtime.isSuperAdmin,
});

const mapDispatch = {};

export default compose(injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation changeAdminUser($email: String, $password: String!) {
      changeAdminUser (email: $email, password: $password) {
        status
      }
    }
  `),
)(ChangeAdminForm);