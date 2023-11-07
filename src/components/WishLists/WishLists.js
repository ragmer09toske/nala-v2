// General
import React from 'react';
import PropTypes from 'prop-types';

// GraphQL
import { graphql, gql, compose } from 'react-apollo';


// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import cx from 'classnames';

// Locale
import messages from '../../locale/messages';

import { openAddWishListGroupModal } from '../../actions/WishList/modalActions';

// GraphQL
import getAllWishListGroupQuery from './getAllWishListGroup.graphql';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
    Grid,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import s from './WishLists.css';
import cs from '../../components/commonStyle.css';

// Components
import Loader from '../../components/Loader';
import WishListGroupItem from './WishListGroupItem';
import WishListGroupModal from './WishListGroupModal';

//Images
import addIcon from '../../../public/siteImages/addIcon.svg';

class WishListComponent extends React.Component {
    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getAllWishListGroup: PropTypes.any
        }),
    };

    static defaultProps = {
        data: {
            loading: true
        },
    }

    openAddWishListModal = () => {
        const { openAddWishListGroupModal } = this.props;
        openAddWishListGroupModal({}, 'AddWishListGroupForm')
        var root = document.getElementsByTagName('html')[0];
        root.classList.add('scrollHidden');
    }

    render() {
        const { profileId } = this.props;
        const { data: { loading, getAllWishListGroup } } = this.props;
        const { formatMessage } = this.props.intl;
        const { openAddWishListGroupModal } = this.props;
        return (
            <div>
                <WishListGroupModal actionType={'add'} />
                <Grid fluid className={cs.commonContainerList}>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <div className={cx(cs.dFlexContainer, cs.flexWrap)}>
                                <h2 className={cx(cs.commonTitleText, cs.fontWeightBold, cs.paddingBottom5)}>
                                    <FormattedMessage {...messages.wishLists} />{' '}
                                    {
                                        getAllWishListGroup?.count > 0 && getAllWishListGroup.wishListGroupData && getAllWishListGroup.wishListGroupData.length > 0 && <>
                                            <span className={cs.displayinlineBlock}>
                                                ({getAllWishListGroup.count})
                                            </span>
                                        </>
                                    }
                                </h2> 
                                <Button className={cx(cs.btnPrimary, cs.spaceBottom5, cs.dFlex)} onClick={this.openAddWishListModal}>
                                    <img src={addIcon} className={cx('commonIconSpace', s.createIcon)} />
                                    <FormattedMessage {...messages.createWishList} />
                                </Button>
                            </div>
                            {
                                loading && <>
                                    <Loader type="text" />
                                </>
                            }
                            {
                                !loading && getAllWishListGroup && getAllWishListGroup.status == 'success' && <>
                                    {
                                        getAllWishListGroup.wishListGroupData && getAllWishListGroup.wishListGroupData.length > 0 && getAllWishListGroup.count > 0 && <Row className={s.flexColumn}>
                                            {
                                                getAllWishListGroup.wishListGroupData.map((item, index) => {
                                                    return (
                                                        <Col xs={12} sm={4} md={3} lg={3} key={index} className={cs.spaceBottom6}>
                                                            <WishListGroupItem data={item} />
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    }
                                    {
                                        getAllWishListGroup.wishListGroupData && getAllWishListGroup.wishListGroupData.length == 0 && getAllWishListGroup.count == 0 && <>
                                            <h5 className={cx(cs.commonTotalText, cs.fontWeightMedium)}>
                                                <FormattedMessage {...messages.noWishlists} />
                                            </h5>
                                        </>
                                    }
                                </>
                            }
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
    openAddWishListGroupModal
};

export default compose(
    injectIntl,
    withStyles(s, cs),
    connect(mapState, mapDispatch),
    graphql(getAllWishListGroupQuery,
        {
            options: (props) => ({
                variables: {
                    profileId: props.profileId
                },
                fetchPolicy: 'network-only',
            })
        }
    )
)(WishListComponent);