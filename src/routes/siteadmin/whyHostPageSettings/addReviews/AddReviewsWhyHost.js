import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './AddReviewsWhyHost.css';
import WhyHostFormBlock7 from '../../../../components/siteadmin//WhyHostPageSettings/WhyHostFormBlock7/WhyHostFormBlock7';

class AddReviewsWhyHost extends React.Component {

    render() {
        return <WhyHostFormBlock7 />
    }
}

export default withStyles(s)(AddReviewsWhyHost);