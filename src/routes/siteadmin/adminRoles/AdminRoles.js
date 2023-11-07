import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminRoles.css';

// Component
import AdminRolesManagement from '../../../components/siteadmin/AdminRolesManagement';

class AdminRoles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
    };
    this.setStateVariable = this.setStateVariable.bind(this);
  }

  setStateVariable(variables) {
    this.setState(variables);
  }

  render () {
    const { currentPage, searchList } = this.state;
    
    return <AdminRolesManagement
      currentPage={currentPage}
      searchList={searchList}
      setStateVariable={this.setStateVariable} />;
  }

}

export default compose(withStyles(s))(AdminRoles);

