import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TrustAndVerification.css';
import cs from '../../components/commonStyle.css'
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

// Components
import Trust from '../../components/Trust';
import Loader from '../../components/Loader';
import DashboardSideMenu from '../../components/Dashboard/DashboardSideMenu';

class TrustAndVerification extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getUserVerifiedInfo: PropTypes.object,
    }),
    account: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired
  };

  static defaultProps = {
    data: {
      loading: true
    }
  };

  render() {
    const { data: { loading, getUserVerifiedInfo }, title } = this.props;
    return (
      <Grid fluid className={'listingContainer'}>
        <Row>
          <Col xs={12} sm={12} md={4} lg={4} className={cs.spaceTop6}>
            <DashboardSideMenu isTrustVerfiedPage/>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} className={cs.spaceTop6}>
            {
              loading && <Loader type={"text"} />
            }
            {
              !loading && <Trust data={getUserVerifiedInfo} />
            }
          </Col>
        </Row>
      </Grid>
    );
  }

}

const mapState = (state) => ({
  account: state.account.data
});

const mapDispatch = {};

export default compose(
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(gql`
        query ($userId: String!) {
          getUserVerifiedInfo (userId: $userId) {
            id
            isEmailConfirmed
            isFacebookConnected
            isGoogleConnected
            isIdVerification
            status
          }
        }
      `,
    {
      options: (props) => ({
        variables: {
          userId: props.account.userId,
        },
        ssr: false,
      })
    }
  ),
)(TrustAndVerification);