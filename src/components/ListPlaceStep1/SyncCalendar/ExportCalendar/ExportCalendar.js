import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ExportCalendar.css';
import cx from 'classnames';
import cs from '../../../commonStyle.css';
import {
  FormGroup,
  FormControl,
  Modal,
  Button
} from 'react-bootstrap';
import { url } from '../../../../config';

// Locale
import messages from '../../../../locale/messages';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class ExportCalendar extends React.Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    close: PropTypes.any.isRequired,
    listId: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: 'Copy Link',
      copied: false,
    };
    this.copyText = this.copyText.bind(this);
  }

  async copyText() {
    this.setState({
      value: 'Link Copied',
      copied: true
    })
    setTimeout(() => {
      this.setState({
        value: 'Copy Link',
        copied: false
      })
    }, 1000)
  }

  render() {
    const { showModal, close, listId } = this.props;
    const { value } = this.state;
    const calendarURL = url + '/export-calendar?id=' + listId;

    return (
      <div>
        <Modal show={showModal} onHide={close} animation={false} className={cx(s.modalContainer, 'importCalenderModal')}>
          <div className={cx(s.modalTable)}>
            <div className={cx(s.modalCell)}>
              <Modal.Header className={s.modalHeading} closeButton>
                <Modal.Title className={cs.commonSubTitleText}><FormattedMessage {...messages.exportCalendarlLabel} /></Modal.Title>
              </Modal.Header>
              <Modal.Body bsClass={s.logInModalBody}>
                <form>
                  <div className={s.panelBody}>
                    <p className={cx(s.introText, cs.commonMediumText, cs.spaceBottom3)}>
                      <FormattedMessage {...messages.exportCalendarlLabelDesc1} />
                    </p>
                    <div className={s.space3}>
                      <label><FormattedMessage {...messages.linkText} /></label>
                      <FormGroup className={s.formGroup}>
                        <FormControl
                          name="url"
                          type="text"
                          value={calendarURL}
                          className={s.formControlInput}
                          readOnly
                        />
                      </FormGroup>
                    </div>
                    <div className={s.flexEnd}>
                      <Button
                        className={cx(s.button, s.btnlarge, s.btnPrimary)}
                        type="button"
                        // disabled={submitting}
                        // onClick={this.submitForm}
                        >
                       <span className={s.copyLink}>
                          <CopyToClipboard
                            text={calendarURL}
                            onCopy={() => this.copyText()}
                          >
                            <span>
                              {value}
                            </span>
                          </CopyToClipboard>
                        </span>
                      </Button>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapState = (state) => ({
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(ExportCalendar)));
