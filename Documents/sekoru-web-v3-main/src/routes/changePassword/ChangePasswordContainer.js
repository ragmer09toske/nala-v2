import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChangePasswordContainer.css';
import cs from '../../components/commonStyle.css'
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import { connect } from 'react-redux';

// Components
import ChangePasswordForm from '../../components/ChangePasswordForm';
import SideMenu from '../../components/ManageListing/SideMenu/SideMenu';

class ChangePasswordContainer extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    registeredType: PropTypes.string
  };

  render() {
    const { title, registeredType } = this.props;
    const initialValues = { registeredType };

    return (
      <Grid fluid className={'listingContainer'}>
        <Row>
          <Col xs={12} sm={12} md={8} lg={8} className={cs.spaceTop6}>
            <ChangePasswordForm initialValues={initialValues} />
          </Col>
        </Row>
      </Grid>
    );
  }

}

const mapState = (state) => ({
  registeredType: state.account.data.userData.type,
});

const mapDispatch = {};

export default withStyles(s, cs)(connect(mapState, mapDispatch)(ChangePasswordContainer));