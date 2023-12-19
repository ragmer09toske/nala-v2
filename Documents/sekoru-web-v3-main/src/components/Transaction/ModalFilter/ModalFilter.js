import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalFilter.css';
import cx from 'classnames';
import {
  Modal
} from 'react-bootstrap';

import Listings from './Listings';

import { closeTransactionModal } from '../../../actions/modalActions';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

class ModalFilter extends Component {
  static propTypes = {
    closeTransactionModal: PropTypes.any.isRequired,
    transactionModal: PropTypes.bool
  };

  static defaultProps = {
    transactionModal: false
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }


  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = async (event) => {
    const { handleResults, listId, payoutId, mode } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      await handleResults({ mode, listId, payoutId })
    }
  }

  closeModal = async () => {
    const { onChangeListingFilter, handleResults, closeTransactionModal, mode, listId, payoutId } = this.props;
    await handleResults({ mode, listId, payoutId });
    await closeTransactionModal();
  }

  render() {
    const { closeTransactionModal, transactionModal, showPayouts, handleResults, mode } = this.props;

    return (
      <Modal show={transactionModal} animation={false} onHide={this.closeModal} dialogClassName={'filterModal'} >
        <div ref={this.setWrapperRef}>
          <Modal.Header className={cx(s.noBorderBottom)} closeButton>
            <Modal.Title className={cx(s.filterModalHeader)}><FormattedMessage {...messages.filter} /></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={s.root}>
              <Listings
                handleResults={handleResults}
                showPayouts={showPayouts}
                mode={mode}
              />
            </div>
          </Modal.Body>
        </div>
      </Modal>
    );
  }
}

const mapState = (state) => ({
  transactionModal: state.modalStatus.transactionFilterModal,
  listId: state.onChangeListing.listId,
  payoutId: state.onChangeListing.payoutId
});

const mapDispatch = {
  closeTransactionModal,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ModalFilter)));