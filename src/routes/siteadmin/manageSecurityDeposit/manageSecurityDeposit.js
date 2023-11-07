import React from 'react';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './manageSecurityDeposit.css';
import ManageSecurityDeposit from '../../../components/siteadmin/ManageSecurityDeposit/ManageSecurityDeposit';

class ManageSecurityDepositContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
      claimType: 'all',
    };
    this.setStateVariable = this.setStateVariable.bind(this);
  }

  setStateVariable(variables) {
    this.setState(variables)
  }

  render() {
    const { currentPage, searchList, claimType } = this.state;
    return <ManageSecurityDeposit
      currentPage={currentPage}
      searchList={searchList}
      claimType={claimType}
      setStateVariable={this.setStateVariable}
    />
  }

}

export default compose(
  withStyles(s),
)(ManageSecurityDepositContainer);
