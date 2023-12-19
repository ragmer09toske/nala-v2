// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WishListGroupModal.css';
import cs from '../../../components/commonStyle.css';
import { Modal, Button } from 'react-bootstrap';
import cx from 'classnames';
// Redux
import { connect } from 'react-redux';
import { closeWishListGroupModal } from '../../../actions/WishList/modalActions';
import { deleteWishListGroup } from '../../../actions/WishList/deleteWishListGroup';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Component
import AddWishListGroupForm from '../WishListGroupForm/AddWishListGroupForm';
import EditWishListGroupForm from '../EditWishListGroupForm';


class WishListGroupModal extends Component {
  static propTypes = {
    closeWishListGroupModal: PropTypes.any,
    wishListGroupModal: PropTypes.bool,
    actionType: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      wishListGroupModalStatus: false
    }
  }

  componentDidMount() {
    const { wishListGroupModal } = this.props;
    if (wishListGroupModal === true) {
      this.setState({ wishListGroupModalStatus: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { wishListGroupModal } = nextProps;

    if (wishListGroupModal === true) {
      this.setState({ wishListGroupModalStatus: true });
    } else {
      this.setState({ wishListGroupModalStatus: false });
    }
  }

  closeWishListModal = () => {
    const { closeWishListGroupModal } = this.props;
    closeWishListGroupModal();
    var root = document.getElementsByTagName('html')[0];
    root.classList.remove('scrollHidden');
  }

  deleteWishList = () => {
    const { deleteWishListGroup, wishListGroupId } = this.props;
    deleteWishListGroup(wishListGroupId);
    this.closeWishListModal();
  }

  componentWillUnmount() {
    this.closeWishListModal();
  }

  render() {
    const { closeWishListGroupModal, actionType } = this.props;
    const { wishListGroupModalStatus } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <>
        <Modal show={wishListGroupModalStatus} onHide={this.closeWishListModal} className={'whistListModel languageModalContainer languageModalRTL'}>
          <Modal.Header closeButton>
            {actionType == 'edit' ? <FormattedMessage {...messages.wishLists} /> : (actionType == 'add' ? <FormattedMessage {...messages.newWishList} /> : <FormattedMessage {...messages.deleteWishList} />)}
          </Modal.Header>
          <Modal.Body>
            {
              actionType == 'add' ? <AddWishListGroupForm closeModal={this.closeWishListModal} /> :
                actionType == 'edit' ? <EditWishListGroupForm closeModal={this.closeWishListModal} /> :
                  <div>
                    <div className={cx(cs.commonContentText, cs.fontWeightMedium)}><FormattedMessage {...messages.areYouSureDeleteWishList} /></div>
                    <div className={cx(cs.textAlignRight, 'textAlignLeftRTL', s.paddingTop)}>
                      <Button className={cx(cs.btnPrimaryBorder, s.mobileBtn)} onClick={this.closeWishListModal}>
                        {formatMessage(messages.cancel)}
                      </Button>
                      <Button className={cx(cs.btnPrimary, s.marginLeft, 'createBtnRTL', s.mobileBtn, 'wishPopupBtnRTL')} onClick={this.deleteWishList}>
                        {formatMessage(messages.confirmDelete)}
                      </Button>
                    </div>
                  </div>
            }
          </Modal.Body>
        </Modal>
      </>
    )
  }
}


const mapState = (state) => ({
  wishListGroupModal: state.modalStatus.wishListGroupModalOpen,
});

const mapDispatch = {
  closeWishListGroupModal,
  deleteWishListGroup
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(WishListGroupModal)));