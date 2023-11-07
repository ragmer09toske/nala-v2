import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

import {
  Grid,
  Row,
  Col } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Warning.css';

// Components
import Link from '../../components/Link';

class Warning extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
  };

  render() {
    const {siteName} = this.props;
    
    return (
        <div className={s.container}>
          <Grid fluid>
            <Row className={cx(s.space6, s.spaceTop6)}>
              <Col xs={12} sm={12} md={12} lg={12} className={s.textCenter}>
                <h3 className={cx(s.textJumbo, 'hidden-xs', 'hidden-sm')}>
                <FormattedMessage {...messages.somethingWrong} />
                </h3>
                <h3 className={cx(s.textMedium, 'visible-xs', 'visible-sm')}>
                <FormattedMessage {...messages.somethingWrong} />
                </h3>
                <h2>
                <FormattedMessage {...messages.weCouldnt} />
                  </h2>
                <span className={s.subTitle}>
                <FormattedMessage {...messages.errorcode} />
                </span>
                <ul className={cx(s.spaceTop2, s.listStyled)}>
                  <li className={s.space2}>
                    <FormattedMessage {...messages.hereAre} />
                  </li>
                  <li>
                    <Link to={"/"}><FormattedMessage {...messages.home} /></Link>
                  </li>
                  <li>
                    <Link to={"/s"}><FormattedMessage {...messages.search} /></Link>
                  </li>
                  <li>
                    <a><FormattedMessage {...messages.help} /></a>
                  </li>
                  <li>
                    <a><FormattedMessage {...messages.hostingOn} />{' '}{siteName}</a>
                  </li>
                  <li>
                    <a><FormattedMessage {...messages.trustSafety} /></a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }
}

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Warning)));
