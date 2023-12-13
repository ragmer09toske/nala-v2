import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';
import SubnavBar from '../SubnavBar';
import CookiesDisclaimer from '../CookiesDisclaimer';
import SideMenu from '../ManageListing/SideMenu/SideMenu';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cs from '../../components/commonStyle.css'
class UserLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <>
        <Header />
        <div className={s.userLayoutBg}>
          <SubnavBar />
          <Grid fluid className={'listingContainer'}>
             <Row>
              {this.props.showSideMenu && 
                <Col xs={12} sm={12} md={4} lg={4} className={cs.spaceTop6}>
                  <SideMenu showSideMenu={this.props.showSideMenu} />
                </Col> 
              }
              {this.props.children}
             </Row>
          </Grid>
          <Footer whiteBg={true} />
        </div>
        <CookiesDisclaimer />
      </>
    );
  }
}

export default withStyles(s)(UserLayout);