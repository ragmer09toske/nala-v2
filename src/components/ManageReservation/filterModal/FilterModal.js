import React from "react";
import PropTypes from 'prop-types';

import {
  Modal
} from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from "../../../locale/messages";
//Styles
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from './FilterModal.css';
import cx from 'classnames'
//Redux
import { connect } from "react-redux";
//action
import { closeFilterModal } from "../../../actions/modalActions";
import { onChangeListingFilter } from '../../../actions/Listing/onChangeListing';
//components
import FilterListing from "./FilterListing";

class FilterModal extends React.Component {
  static propTypes = {
    closeFilterModal: PropTypes.any.isRequired,
    type: PropTypes.string.isRequired,
    filterModal: PropTypes.bool,
    searchKey: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    orderBy: PropTypes.string.isRequired,
    setStateVariable: PropTypes.func,
    refetch: PropTypes.any.isRequired,
  };

  static defaultProps = {
    filterModal: false
  };

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    const { refetch, listId, orderBy, startDate, endDate, setStateVariable } = this.props;
    let variables = { listId, orderBy, startDate, endDate, currentPage: 1 };
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      setStateVariable(variables)
      refetch(variables)
    }
  }

  handleHideModal = async () => {
    const { refetch, listId, orderBy, startDate, endDate, setStateVariable, closeFilterModal } = this.props;
    let variables = { listId, orderBy, startDate, endDate, currentPage: 1 };
    setStateVariable(variables);
    refetch(variables);
    closeFilterModal();
  }

  render() {
    const { closeFilterModal, filterModal, refetch, type, setStateVariable } = this.props;
    return (
      <div>
        <div className="newModalHeader">
          <Modal show={filterModal} animation={false} onHide={this.handleHideModal} dialogClassName={cx(s.logInModalContainer, s.modalCommonTopSpace)} >
            <div ref={this.setWrapperRef}>
              <Modal.Header closeButton>
                <Modal.Title><span className={s.title}><FormattedMessage {...messages.filters} /></span></Modal.Title>
              </Modal.Header>
              <Modal.Body bsClass={s.logInModalBody}>
                <div className={s.root}>
                  <FilterListing refetch={refetch} type={type} setStateVariable={setStateVariable} />
                </div>
              </Modal.Body>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  filterModal: state.modalStatus.filterModal,
  listId: state.onChangeListing?.listId,
  orderBy: state.onChangeListing?.orderBy,
  startDate: state.onChangeListing?.startDate,
  endDate: state.onChangeListing?.endDate,
});

const mapDispatch = {
  closeFilterModal,
  onChangeListingFilter
}

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(FilterModal)));