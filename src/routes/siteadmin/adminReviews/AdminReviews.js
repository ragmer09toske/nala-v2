import React from 'react';
import { compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminReviews.css';

// Component
import AdminReviewsManagement from '../../../components/siteadmin/AdminReviewsManagement/AdminReviewsManagement';
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
        const { title } = this.props;
        const { currentPage, searchList, userType } = this.state;
        return <AdminReviewsManagement
            title={title}
            currentPage={currentPage}
            searchList={searchList}
            userType={userType}
            setStateVariable={this.setStateVariable} />;
    }
}

export default compose(
    withStyles(s),
)(AdminReviews);