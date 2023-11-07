import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';
import CookiesDisclaimer from '../CookiesDisclaimer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { viewListingBottom, becomeHeader, becomeHeaderCss } = this.props;
    return (
      <div className={viewListingBottom}>
        <Header becomeHeader={becomeHeader} becomeHeaderCss={becomeHeaderCss}/>
        <>
          {this.props.children}
        </>
        <Footer />
        <CookiesDisclaimer />
      </div>
    );
  }
}

export default withStyles(s)(Layout);