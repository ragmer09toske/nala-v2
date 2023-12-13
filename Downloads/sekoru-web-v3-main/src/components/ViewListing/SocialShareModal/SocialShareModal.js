// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SocialShareModal.css';
import cs from '../../commonStyle.css';
import {
  Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { openSocialShareModal, closeSocialShareModal } from '../../../actions/modalActions';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

import { url } from '../../../config';
import { ShareButtons, generateShareIcon } from 'react-share';
import history from '../../../core/history';

// Image
import fbIcon from '/public/SiteIcons/fb.svg';
import twitIcon from '/public/SiteIcons/twitterShareIcon.svg';
import emailIcon from '/public/SiteIcons/mailIcon.svg';
import copyTextIcon from '/public/SiteIcons/textCopyIcon.svg';
const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton
} = ShareButtons;

// const FacebookIcon = generateShareIcon('facebook');
// const TwitterIcon = generateShareIcon('twitter');
// const GooglePlusIcon = generateShareIcon('google');
// const LinkedinIcon = generateShareIcon('linkedin');
// const EmailIcon = generateShareIcon('email');

class SocialShareModal extends Component {
  static propTypes = {
    closeSocialShareModal: PropTypes.func,
    socialshareModal: PropTypes.bool,
    openSocialShareModal: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      socialshareModalStatus: false,
      isFormOpen: false,
      value: 'Copy Link',
      copied: false,
    };
    this.openForm = this.openForm.bind(this);
    this.copyText = this.copyText.bind(this);
  }

  openForm() {
    this.setState({ isFormOpen: true });
  }

  componentDidMount() {
    const { socialshareModal } = this.props;
    if (socialshareModal === true) {
      this.setState({ socialshareModalStatus: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { socialshareModal } = nextProps;
    if (socialshareModal === true) {
      this.setState({ socialshareModalStatus: true });
    } else {
      this.setState({ socialshareModalStatus: false });
    }
  }

  async copyText() {

    this.setState({
      value: 'Link Copied',
      copied: true
    })

    setTimeout(() => {
      this.setState({
        value: 'Copy Link',
        copied: false
      })
    }, 2000)

    toastr.success('Success!', 'Link copied successfully')

  }

  handleClick = async () => {
    const { closeSocialShareModal, handleRelease } = this.props;
    await handleRelease();
    await closeSocialShareModal();
  }

  render() {
    const { closeSocialShareModal, openSocialShareModal, listId, title, city, state, country, siteName } = this.props;
    const { socialshareModalStatus, isFormOpen } = this.state;
    let location = history.location ? history.location.pathname : null;
    var locationPath = location ? location.replace('/preview', '') : null;

    const shareUrl = url + locationPath;
    let previewText = `Check out this listing on ${siteName}!`;
    let bodyText = `Check out this listing on ${siteName}!` + ' ' + shareUrl;


    return (
      <div>
        <Modal show={socialshareModalStatus} animation={false} onHide={() => this.handleClick()} dialogClassName={cx(s.signupModalContainer, 'signupModal', 'sharesocialModal')} >
          <Modal.Header closeButton>
            <FormattedMessage {...messages.share} />
          </Modal.Header>
          <Modal.Body>
            <div className={cx(cs.commonContentText, cs.fontWeightBold, cs.paddingBottom2)}><FormattedMessage {...messages.shareModalHeading} /></div>
            <div className={cs.paddingBottom3}>
              <div className={s.content}>
                <FormattedMessage {...messages.socialShareDesc} /> {' '}
                {title} <FormattedMessage {...messages.carsAvailable} /> {city}, {state}, {country}.
              </div>
            </div>
            <div className={s.displayFlex}>
              <FacebookShareButton
                url={shareUrl}
              >
                <img src={fbIcon} />
              </FacebookShareButton>
              <TwitterShareButton
                url={shareUrl}
                className={s.displayIcon}>
                <img src={twitIcon} />
              </TwitterShareButton>
              <EmailShareButton
                url={shareUrl}
                subject={previewText}
                body={bodyText}
                className={s.displayIcon}>
                <img src={emailIcon} />
              </EmailShareButton>
              <CopyToClipboard
                text={shareUrl}
                onCopy={() => this.copyText()}
              >
                <span className={s.poniter}>
                  <img src={copyTextIcon} />
                  {/* {this.state.value === 'Copy Link' ? <FormattedMessage {...messages.copyLink} /> : <FormattedMessage {...messages.linkCopied} />} */}
                </span>
              </CopyToClipboard>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


const mapState = state => ({
  socialshareModal: state.modalStatus.isSocialShareModal,
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
  closeSocialShareModal,
  openSocialShareModal,
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(SocialShareModal)));
