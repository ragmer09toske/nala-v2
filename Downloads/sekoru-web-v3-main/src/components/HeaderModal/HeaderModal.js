// General
import React, { Component } from 'react';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HeaderModal.css';
import {
  Modal,
  Tabs,
  Tab
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeHeaderModal } from '../../actions/modalActions';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

import CurrencyModal from '../CurrencyModal';
import LanguageModal from '../LanguageModal';

class HeaderModal extends Component {

  static defaultProps = {
    modalType: 'languageModal'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { closeHeaderModal, modalStatus, modalType } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Modal
        show={modalStatus[modalType] || false}
        animation={false}
        onHide={() => closeHeaderModal(modalType)}
        className={'moreFilterModal languageModalContainer languageModalRTL'}
      >
        <Modal.Header closeButton>
           {formatMessage(messages.languageAndCurrency)}
        </Modal.Header>
        <Modal.Body>
          <div className='menuModal'>
            <Tabs bsStyle="pills" defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title={formatMessage(messages.chooseLanguage)}>
                <LanguageModal />
              </Tab>
               <Tab eventKey={2} title={formatMessage(messages.chooseACurrency)}>
                <CurrencyModal />
              </Tab>
            </Tabs>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapState = state => ({
  modalStatus: state.modalStatus
});

const mapDispatch = {
  closeHeaderModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(HeaderModal)));
