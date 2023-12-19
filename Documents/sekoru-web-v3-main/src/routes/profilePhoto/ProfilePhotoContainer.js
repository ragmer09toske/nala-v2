import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProfilePhotoContainer.css';
import cs from '../../components/commonStyle.css'
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

// Components
import ProfilePhoto from '../../components/ProfilePhoto';
import SideMenu from '../../components/ManageListing/SideMenu/SideMenu';

class ProfilePhotoContainer extends React.Component {

  static propTypes = {
  };

  render() {
    return (
      <Grid fluid className={'listingContainer'}>
        <Row>
          <Col xs={12} sm={12} md={8} lg={8} className={cs.spaceTop6}>
            <ProfilePhoto />
          </Col>
        </Row>
      </Grid>
    );
  }

}

export default withStyles(s, cs)(ProfilePhotoContainer);