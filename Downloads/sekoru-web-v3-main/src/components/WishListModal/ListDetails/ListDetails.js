// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';


// Locale
import messages from '../../../locale/messages';

import ListingDataQuery from './getListingData.graphql';
import ListCoverPhoto from '../../ListCoverPhoto';

// Redux
import { connect } from 'react-redux';

import { graphql, gql, compose } from 'react-apollo';

import Loader from '../../Loader';

import StarRating from '../../StarRating';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListDetails.css';
import {
    Col,
} from 'react-bootstrap';

class ListDetails extends Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        listId: PropTypes.number,
        getListingData: PropTypes.shape({
            loading: PropTypes.bool,
            UserListing: PropTypes.object
        }),
    };

    static defaultProps = {
        data: {
            loading: true
        },
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { error, handleSubmit, submitting, dispatch, id, title } = this.props;
        const { formatMessage } = this.props.intl;
        const { getListingData: { loading, UserListing }, listId } = this.props;

        return (
            <>
                {
                    loading && <>
                        <Loader type="text" />
                    </>
                }
                {
                    !loading && UserListing && <>
                        <div className={cx(s.imgContainer, 'imgContainerRTL')}>
                            <ListCoverPhoto
                                className={s.whistListDetailsBg}
                                coverPhoto={UserListing.coverPhoto}
                                listPhotos={UserListing.listPhotos}
                                photoType={"x_small"}
                                bgImage
                            />
                        </div>
                        {/* <div className={cx(s.textContainer, 'textAlignRightRTL')}>
                            <div className={cx(s.textBottom, s.listTitleText)}>
                                <div className={s.textOverflow}>{UserListing.title}</div>
                            </div>
                            <div className={cx(s.textBottom,s.subTexContainer)}>
                                <div className={s.textOverflow}>{UserListing.street}, {UserListing.city}</div>
                            </div>
                            <span className={cx(s.reviewText, s.pullRight)}>
                                &nbsp; {UserListing.reviewsCount} {UserListing.reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}
                            </span>
                            <span className={cx(s.reviewStar, s.pullRight, 'floatRightRTL')}>
                                <StarRating value={UserListing.reviewsStarRating} name={'review'} />
                            </span>
                        </div> */}
                    </>
                }
            </>
        )
    }

}

const mapState = (state) => ({
    listId: state.modalStatus.listId
});

const mapDispatch = {};

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(ListingDataQuery,
        {
            name: 'getListingData',
            options: (props) => ({
                variables: {
                    listId: props.listId,
                },
                fetchPolicy: 'network-only'
            })
        }
    ),
)
    (ListDetails);