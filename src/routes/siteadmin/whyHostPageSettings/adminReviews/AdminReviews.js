import React from 'react';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminReviews.css';

// Component
import AdminReviewsManagement from '../../../../components/siteadmin/WhyHostPageSettings/AdminReviewsManagement/AdminReviewsManagement';
class AdminReviews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            searchList: '',
        };
        this.setStateVariable = this.setStateVariable.bind(this);
    }

    setStateVariable(variables) {
        this.setState(variables)
    }

    render() {

        const { currentPage, searchList } = this.state;

        return <AdminReviewsManagement
            currentPage={currentPage}
            searchList={searchList}
            setStateVariable={this.setStateVariable} />;
    }
}

export default withStyles(s)(AdminReviews);