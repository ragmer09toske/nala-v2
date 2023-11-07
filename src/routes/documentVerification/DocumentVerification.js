import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DocumentVerification.css';
import cs from '../../components/commonStyle.css';
import cx from 'classnames';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

import DocumentUpload from '../../components/DocumentUpload';

class DocumentVerification extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <Grid fluid className={'listingContainer'}>
        <Row>
          <Col xs={12} sm={12} md={8} lg={8} className={cs.spaceTop6}>
            <div className={cx('youcarsBg', 'documentDropCss')}>
              <h3 className={s.infoTitle}>
                <FormattedMessage {...messages.documentverificaiton} />
              </h3>
              <DocumentUpload placeholder={formatMessage(messages.documentUploadPlaceholder)} />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default injectIntl(withStyles(s, cs)(DocumentVerification));
