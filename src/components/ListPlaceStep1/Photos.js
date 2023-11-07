import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  FormGroup,
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import cs from '../commonStyle.css';
// Internal Component
import PhotosUpload from '../PhotosUpload';
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';
import updateStep2 from './updateStep2';
// Locale
import messages from '../../locale/messages';
class Photos extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    listId: PropTypes.number.isRequired,
    photosCount: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      isAvailable: false
    };
  }

  UNSAFE_componentWillMount() {
    const { photosCount } = this.props;
    if (photosCount > 0) {
      this.setState({ isAvailable: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { photosCount } = nextProps;
    if (photosCount > 0) {
      this.setState({ isAvailable: true });
    } else {
      this.setState({ isAvailable: false });
    }
  }

  render() {
    const { nextPage, previousPage, listId, formPage, step } = this.props;
    const { formatMessage } = this.props.intl;
    const { isAvailable } = this.state;

    return (
      <div className={cx(s.stepGrid, 'stepGridRTL')}>
        <SidePanel
          title={formatMessage(messages.step2Heading)}
          landingContent={formatMessage(messages.step2PhotoTitle)}
        />
        <form>
          <div className={s.landingMainContent}>
            <h3 className={cx(cs.commonContentText, cs.spaceBottom3)}><FormattedMessage {...messages.carPhotos} /></h3>
            <FormGroup className={cx(s.formGroup, 'stepPhotoUpload')}>
              <PhotosUpload listId={listId} placeholder={formatMessage(messages.photosPlaceholder)} />
            </FormGroup>
          </div>
          <FooterButton
            nextPage={nextPage}
            previousPage={previousPage}
            previousPagePath={"home"}
            nextPagePath={"description"}
            skipLabel={true}
            isAvailable={isAvailable}
            formPage={formPage}
            step={step}
          />
        </form>
      </div>
    );
  }
}

Photos = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep2
})(Photos);

const mapState = (state) => ({
  photosCount: state.location.photosCount
});
const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Photos)));







