import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Users.css';

// Component
import UserManagement from '../../../components/siteadmin/UserManagement';

class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
      userType: ''
    };
    this.setStateVariable = this.setStateVariable.bind(this);
  }
  setStateVariable(variables) {
    this.setState(variables)
  }


  render() {
    const { title } = this.props;
    const { currentPage, searchList, userType } = this.state;
    return <UserManagement
      title={title}
      currentPage={currentPage}
      searchList={searchList}
      userType={userType}
      setStateVariable={this.setStateVariable} />;
  }
}

export default compose(
  withStyles(s)
)(Users);
