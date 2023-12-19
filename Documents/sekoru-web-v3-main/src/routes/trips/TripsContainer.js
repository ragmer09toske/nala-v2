import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
//styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TripsContainer.css';
// Component
import Trips from '../../components/Trips';

class TripsContainer extends React.Component {
  static propTypes = {
    userType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchKey: ''
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { type } = nextProps
    if (type !== this.props.type)this.setState({currentPage:1})
  }

  setStateVariable = (variables) => {
    this.setState(variables)
  }

  render() {
    const { userType, type } = this.props;
    const { currentPage, searchKey } = this.state;
    return (
      <Trips userType={userType} type={type} searchKey={searchKey} currentPage={currentPage} setStateVariable={this.setStateVariable}/>
    );
  }
}

export default compose(
  withStyles(s),
)(TripsContainer);