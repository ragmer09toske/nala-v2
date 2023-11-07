import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import {
  Button,
  FormControl,
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import * as FontAwesome from 'react-icons/lib/fa';
import cs from '../../commonStyle.css'
// Helpers
import submit from './submit';
import validate from './validate';
// Component
import Avatar from '../../Avatar';
//Locale
import messages from '../../../locale/messages';
import messageSendIcon from '/public/SiteIcons/send-message-icon.svg';

class SendMessage extends Component {
  static propTypes = {
    threadId: PropTypes.number.isRequired,
    profileId: PropTypes.number.isRequired,
    picture: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={placeholder}
        >
          {children}
        </FormControl>
        {touched && error && <span className={cx(s.sendMessageErrorMessagePosition, 'errorMessagePositionRTL')}>{formatMessage(error)}</span>}
      </div>
    );
  }

  render() {
    const { profileId, picture, displayName } = this.props;
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(cs.spaceBottom4)}>
        <form onSubmit={handleSubmit(submit)}>
          <div className={cx(s.messageMainContainer)}>
            <div className={cx(s.lsSendMessageContainer,s.rsFromMessageMarginRight, 'lsSendMessageContainerRTL', 'rsFromMessageMarginRightRLT')}>
              <div className={cx()}>
                  <div className={s.textBody}>
                    <Field
                      name="content"
                      className={cx(s.sendTextBox)}
                      component={this.renderFormControlTextArea}
                      placeholder={formatMessage(messages.writeMessage)}
                    />
                  </div>
              </div>
            </div>
            <div className={cx(s.rsSendMessageContainer)}>
              <div className={cx()}>
                <Button className={cx(s.sendMessageBtnContainer)} type="submit" disabled={submitting || error}>
                  <img src={messageSendIcon} className={cx(s.sendMessageBtn)} />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

SendMessage = reduxForm({
  form: 'SendMessage', // a unique name for this form
  validate
})(SendMessage);

export default injectIntl(withStyles(s,cs)(SendMessage));