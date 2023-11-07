import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditProfile.css';
import cs from '../../components/commonStyle.css'
import {
  Col
} from 'react-bootstrap';

// Components
import EditProfileForm from '../../components/EditProfileForm';
import DashboardSideMenu from '../../components/Dashboard/DashboardSideMenu';

class EditProfile extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <>
        <Col xs={12} sm={12} md={4} lg={4} className={cs.spaceTop6}>
          <DashboardSideMenu isEditProfilePage />
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} className={cs.spaceTop6}>
          <EditProfileForm />
        </Col>
      </>
    );
  }

}

export default withStyles(s, cs)(EditProfile);