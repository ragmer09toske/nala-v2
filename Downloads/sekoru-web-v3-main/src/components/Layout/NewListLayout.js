import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import CookiesDisclaimer from '../CookiesDisclaimer';

class NewListLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={'stepHeader'}>
        <Header />
        <div className={s.paddingTop}>
          {this.props.children}
        </div>
        <CookiesDisclaimer />
      </div>
    );
  }
}

export default withStyles(s)(NewListLayout);