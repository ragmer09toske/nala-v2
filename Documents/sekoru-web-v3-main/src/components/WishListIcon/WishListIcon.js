import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {graphql, gql, compose} from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './WishListIcon.css';
import cs from '../../components/commonStyle.css';
import { connect } from 'react-redux';

// Helper
import { getWishListStatus } from '../../helpers/wishListStatus';

// Locale
import messages from '../../locale/messages';

// Redux Actions
import { openWishListModal } from '../../actions/WishList/modalActions';
import { openLoginModal } from '../../actions/modalActions';

//Image
import heartOff from '/public/SiteIcons/wishlistOff.svg';
import heartOn from '/public/SiteIcons/wishlistOn.svg';
class WishListIcon extends Component {

    static propTypes = {
        isChecked: PropTypes.bool,
        formatMessage: PropTypes.any,
        listId: PropTypes.number,
        type: PropTypes.string
    };

    static defaultProps = {
       isChecked: false,
       type: 'icon'
    };

    constructor(props) {
        super(props);
        this.state = {
            iconSelected: false,
            clicked: false
        };
        this.iconAction = this.iconAction.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { isChecked, listId } = this.props;
        this.setState({ iconSelected: isChecked });
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        const { wishListModalStatus, wishListRoomId, isChecked, listId } = nextProps;
        const { iconSelected, clicked } = this.state;
        let currentWishListStatus = false;
        // Trigger request on Modal action done/close
        if (wishListRoomId && wishListModalStatus === false) {
            // Get Current List's Wish List Status( True/False )
            currentWishListStatus = await getWishListStatus(listId);

            this.setState({
                iconSelected: currentWishListStatus
            });
        } else {
            // On the flow process
            if (!clicked && !wishListModalStatus) {
                this.setState({ iconSelected: isChecked });
            }   
        }
    }

    iconAction() {
        const { isChecked, listId, isAuthenticated, isEditWishList } = this.props;
        const { openLoginModal, openWishListModal } = this.props;
        if (isAuthenticated) {
            this.setState({ clicked: true });
            openWishListModal(listId, isEditWishList);
        } else {
            openLoginModal();
        }
    }

    render () {
        const { isChecked, listId, type, heartIcon } = this.props;
        const { iconSelected } = this.state;

        return (
            <>
                {
                    type == 'icon' && <div className={cx(s.iconContainer, heartIcon, 'iconContainerRTL')} onClick={this.iconAction}>
                        {
                            iconSelected && <img src={heartOn}/>
                        }    
                        {
                            !iconSelected && <img src={heartOff}/>
                        }   
                    </div>
                }
                {
                    type == 'button' && <div className={cx(s.displayFlex, s.marginRight, 'listTitlemarginLeftRTl', cs.curserPointer, s.minWidth)} onClick={this.iconAction}>
                        {
                            iconSelected && iconSelected && <img src={heartOn} className={cx(cs.viewListIcon, 'commonIconSpace')} />
                        }
                        {
                            !iconSelected && !iconSelected && <img src={heartOff} className={cx(cs.viewListIcon, 'commonIconSpace')} />
                        }
                        <h5 className={cx(cs.commonContentText, cs.fontWeightNormal)}>
                        {
                            iconSelected ? <FormattedMessage {...messages.saved} /> : <FormattedMessage {...messages.save} />
                        }
                        </h5>
                    </div>
                }
            </>        
        );
    }
}

const mapState = (state) => ({
    isAuthenticated: state.runtime.isAuthenticated,
    wishListModalStatus: state.modalStatus.wishListModalOpen,
    wishListRoomId: state.modalStatus.listId
});

const mapDispatch = {
    openLoginModal,
    openWishListModal
};

export default compose(
    injectIntl,
    withStyles(s, cs),
    connect(mapState, mapDispatch),
    graphql(gql`
        query getListingData($listId: String!, $preview: Boolean) {
          UserListing (listId: $listId, preview: $preview) {
            wishListStatus
          }
        }     
    `)
)(WishListIcon);

