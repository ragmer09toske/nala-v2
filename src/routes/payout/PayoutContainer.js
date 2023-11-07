import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PayoutContainer.css';
import cs from '../../components/commonStyle.css'
import {
  Col
} from 'react-bootstrap';

// Components
import Payout from '../../components/Payout';
import SideMenu from '../../components/ManageListing/SideMenu/SideMenu';

class PayoutContainer extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title, currentAccountId } = this.props;
    return (
      <>
        <Col xs={12} sm={12} md={8} lg={8} className={cs.spaceTop6}>
          <Payout currentAccountId={currentAccountId} />
        </Col>
      </> 
    );
  }

}

export default withStyles(s, cs)(PayoutContainer);