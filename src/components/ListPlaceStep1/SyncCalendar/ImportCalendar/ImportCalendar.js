import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Field, reduxForm} from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImportCalendar.css';
import cs from '../../../commonStyle.css';
import cx from 'classnames';
import {
  Button,
  FormGroup,
  FormControl,
  Modal
} from 'react-bootstrap';

// Locale
import messages from '../../../../locale/messages';

// Redux Action
import { importiCal } from '../../../../actions/Listing/ImportCalendar';
import CommonFormComponent from '../../../CommonField/CommonFormComponent';
import validate from './validate';

class ImportCalendar extends React.Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    close: PropTypes.any.isRequired,
    reset: PropTypes.any.isRequired,
    importiCal: PropTypes.any.isRequired,
    listId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      name: ''
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { showModal, dispatch, reset } = this.props;
    if (prevProps.showModal !== showModal) {
      dispatch(reset('ImportCalendar'));
    }
  }
  
  handleClose=()=>{
     const {dispatch, reset, close}= this.props;
     close();
     dispatch(reset('ImportCalendar'));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async submitForm() {
    const { reset, close, importiCal, listId, dispatch } = this.props;
    const { url, name } = this.state;
    close();
    importiCal(listId, name, url)
    dispatch(reset('ImportCalendar'));
  }

  render() {
    const { showModal, close, error, handleSubmit, submitting } = this.props;
    const { url, name } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Modal show={showModal} onHide={close} animation={false} className={cx(s.modalContainer, 'importCalenderModal')}>
          <div className={cx(s.modalTable)}>
            <div className={cx(s.modalCell)}>
              <Modal.Header className={cx(s.modalHeading)} closeButton>
                <Modal.Title className={cs.commonSubTitleText}><FormattedMessage {...messages.importCalendarlLabel} /></Modal.Title>
              </Modal.Header>
              <Modal.Body bsClass={s.logInModalBody}>
                <div className={s.panelBody}>
                  <p className={cx(s.introText, cs.commonMediumText, cs.spaceBottom3)}><FormattedMessage {...messages.importCalendarlDesc1} /></p>
                  <div className={s.space3}>
                    <label><FormattedMessage {...messages.importCalendarlDesc2} /></label>
                    <Field
                      name="url"
                      type="text"
                      component={CommonFormComponent}
                      label={formatMessage(messages.icalPlaceHolderTextOne)}
                      inputClass={s.formControlInput}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className={cs.spaceBottom4}>
                    <label><FormattedMessage {...messages.importCalendarlDesc3} /></label>
                    <Field
                      name="name"
                      type="text"
                      component={CommonFormComponent}
                      label={formatMessage(messages.icalPlaceHolderTextTwo)}
                      inputClass={s.formControlInput}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className={s.flexEnd}>
                  <Button
                      className={cx(s.button,  s.btnPrimaryBorder, 'buttonGap', s.btnlarge)}
                      type="button"
                      disabled={submitting}
                      onClick={this.handleClose}
                    >
                      <FormattedMessage {...messages.cancel} />
                    </Button>
                    <Button
                      className={cx(s.button, s.btnlarge, s.btnPrimary)}
                      type="button"
                      disabled={submitting}
                      onClick={handleSubmit(this.submitForm)}
                    >
                      <FormattedMessage {...messages.importCalendarlDesc4} />
                    </Button>
                  </div>
                </div>

              </Modal.Body>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

ImportCalendar = reduxForm({
  form: 'ImportCalendar', // a unique name for this form
  validate,
  shouldValidate: () => true
})(ImportCalendar);

const mapState = (state) => ({
});

const mapDispatch = {
  importiCal
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(ImportCalendar)));
