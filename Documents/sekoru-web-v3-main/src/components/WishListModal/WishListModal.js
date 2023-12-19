// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WishListModal.css';
import cs from '../../components/commonStyle.css';
import cx from 'classnames';
import { Modal } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeWishListModal } from '../../actions/WishList/modalActions';

// Components
import WishListModalForm from '../WishListModalForm';
import Loader from '../Loader';

import CreateWishList from './CreateWishList';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// GraphQL
import { graphql, gql, compose } from 'react-apollo';

// Query
import getWishListGroupQuery from './getAllWishListGroup.graphql';

class WishListModal extends Component {
  static propTypes = {
    closeWishListModal: PropTypes.any,
    wishListModal: PropTypes.bool,
    formatMessage: PropTypes.any,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getAllWishListGroup: PropTypes.any
    })
  };

  static defaultProps = {
    data: {
      loading: true
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      wishListModalStatus: false,
    };
  }

  UNSAFE_componentWillMount(){
    var root = document.getElementsByTagName('html')[0];
    root.classList.add('scrollHidden');
  }

  componentDidMount() {
    const { wishListModal } = this.props;
    if (wishListModal === true) {
      this.setState({ wishListModalStatus: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { wishListModal } = nextProps;
    if (wishListModal === true) {
      this.setState({ wishListModalStatus: true });
    } else {
      this.setState({ wishListModalStatus: false });
    }
  }

  componentWillUnmount(){
    var root = document.getElementsByTagName('html')[0];
    root.classList.remove('scrollHidden');
  }

  render() {
    const { closeWishListModal, data, data: { loading, getAllWishListGroup }, profileId, listId } = this.props;
    const { wishListModalStatus } = this.state;
    let wishListGroups = [];
    if (getAllWishListGroup && getAllWishListGroup.count > 0) {
      getAllWishListGroup.wishListGroupData.map((option, index) => {
        if (option.wishListIds.indexOf(listId) !== -1) {
          wishListGroups.push(option.id);
        }
      });
    }

    let initialValues = {
      listId,
      wishListGroups
    };
    return (
      <div>
        <Modal show={wishListModalStatus} animation={false} onHide={closeWishListModal} className={'whistListModel languageModalContainer languageModalRTL'}>
          <Modal.Header closeButton>
            <FormattedMessage {...messages.wishLists} />
          </Modal.Header>
          <Modal.Body>
            <CreateWishList initialValues={initialValues} />
            <hr className={cx(cs.listingHorizoltalLine, cs.spaceTop3, cs.spaceBottom3)} />
            {
              loading && <>
                <Loader type="text" />
              </>
            }
            {
              !loading && <WishListModalForm data={data} initialValues={initialValues} />
            }
          </Modal.Body>
          {/* <div className={s.footerContainer}>
            <a href={'/cars/' + listId} target="_blank" className={s.linkContainer}>
                <ListDetails initialValues={initialValues}/>
            </a>
          </div> */}
        </Modal>
      </div>
    );
  }
}


const mapState = state => ({
  wishListModal: state.modalStatus.wishListModalOpen,
  profileId: state.account.data.profileId,
  listId: state.modalStatus.listId
});

const mapDispatch = {
  closeWishListModal
};

export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(getWishListGroupQuery,
    {
      options: (props) => ({
        variables: {
          profileId: props.profileId
        },
        fetchPolicy: 'network-only'
      })
    }
  )

)(WishListModal);