import React from 'react';
import { graphql, gql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Loader from '../../../../components/Loader/Loader'
import s from './EditReviewsWhyHost.css';
import WhyHostFormBlock7 from '../../../../components/siteadmin//WhyHostPageSettings/WhyHostFormBlock7/WhyHostFormBlock7';
import getWhyHostPageSettings from './getWhyHostPageSettings.graphql';

class EditReviewsWhyHost extends React.Component {

    static defaultProps = {
        data: {
            loading: false
        }
    };

    render() {
        const { data: { loading, getWhyHostReview }, reviewId } = this.props;
        if (loading) {
            return <Loader type={"text"} />;
        } else {
            return <WhyHostFormBlock7 initialValues={getWhyHostReview && getWhyHostReview.result} reviewId={reviewId} />
        }
    }
}

export default compose(
    withStyles(s),
    graphql(getWhyHostPageSettings, {
        options: (props) => ({
            variables: {
                reviewId: props.reviewId,
            },
            fetchPolicy: 'network-only'
        })
    }),
)(EditReviewsWhyHost);