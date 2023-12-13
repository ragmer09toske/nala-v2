import React from 'react';
import PropTypes from 'prop-types';

import { graphql, compose } from 'react-apollo';

// Style
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Transaction.css';
import cs from '../../components/commonStyle.css'

// Component
import Transaction from '../../components/Transaction';

// Graphql
import getTransactionHistory from './getTransactionHistory.graphql';
import SideMenu from '../../components/ManageListing/SideMenu/SideMenu';

class TransactionContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { data , mode} = this.props;
    return (
      <Grid fluid className={'listingContainer'}>
        <Row>
          <Col xs={12} sm={12} md={8} lg={8} className={cs.spaceTop6}>
            <Transaction data={data} page ={mode}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default compose(
  withStyles(s, cs),
  graphql(getTransactionHistory,
    {
      options: (props) => ({
        variables: {
          mode: props.mode,
          currentPage: 1,
        },
        fetchPolicy: 'network-only',
        ssr: false
      })
    }
  ),
)(TransactionContainer);