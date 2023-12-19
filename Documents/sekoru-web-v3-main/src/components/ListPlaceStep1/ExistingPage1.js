// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Locale
import messages from '../../locale/messages';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ExistingPage.css';
import cs from '../commonStyle.css';

// Component
import Loader from '../Loader';
// Component
import Avatar from '../Avatar';
// Redux action
import { ManagePublishStatus } from '../../actions/Listing/ManagePublishStatus';
//Image
import sayIcon from '/public/SiteIcons/sayIcon.png';
import footerImage from '/public/siteImages/stepFooter.svg';
import stepOne from '/public/SiteIcons/editStepOne.svg';
import arrowIcon from '/public/SiteIcons/stepEditArrow.svg';
import stepTwo from '/public/SiteIcons/editStepTwo.svg';
import tickIcon from '/public/SiteIcons/stepCompletedIcon.svg';
import stepThree from '/public/SiteIcons/editStepThree.svg';
import Link from '../Link/Link';
class ExistingPage1 extends Component {
  static propTypes = {
    guestDisplayName: PropTypes.string,
    listingSteps: PropTypes.shape({
      step1: PropTypes.string.isRequired,
      step2: PropTypes.string.isRequired,
      step3: PropTypes.string.isRequired,
      listing: PropTypes.shape({
        id: PropTypes.number.isRequired,
        isReady: PropTypes.bool.isRequired,
        isPublished: PropTypes.bool.isRequired
      }),
      user: PropTypes.shape({
        userBanStatus: PropTypes.number,
      }),
    }),
    nextPage: PropTypes.any.isRequired,
    stepsLoading: PropTypes.bool,
    ManagePublishStatus: PropTypes.any.isRequired,
    publishListLoading: PropTypes.bool,
    userData: PropTypes.shape({
      firstName: PropTypes.string.isRequired
    }).isRequired
  };
  static defaultProps = {
    listingSteps: {
      step1: "inactive",
      step2: "inactive",
      step3: "inactive",
      listing: {
        id: 0,
        isReady: false,
        isPublished: false
      },
      user: {
        userBanStatus: 0,
      }
    },
    photosCount: 0,
    stepsLoading: false,
    publishListLoading: false,
    userData: {
      firstName: ''
    }
  };
  render() {
    const { nextPage, listingSteps, photosCount, stepsLoading, account, publishListLoading, guestDisplayName, userData, listId } = this.props;
    const { formatMessage } = this.props.intl;
    if (stepsLoading) {
      return <Loader type={"text"} />
    }
    const { listingSteps: { listing: { id, isReady, isPublished, user } } } = this.props;

    let userDelete = user && user.userDeletedAt;
    let isShowButton = false, stepOneCircle = false, stepTwoCircle = false, stepThreeCircle = false;


    if (!userDelete) {
      isShowButton = true;
    } else {
      isShowButton = false;
    }

    let userBanStatusValue;
    if (user) {
      const { listingSteps: { listing: { user: { userBanStatus } } } } = this.props;
      userBanStatusValue = userBanStatus;
    }
    const { listingSteps: { step1, step2, step3 } } = this.props;
    const { ManagePublishStatus } = this.props;
    let isPhotoAvailable = false;
    if (photosCount > 0) {
      isPhotoAvailable = true;
    }

    if (step1 == 'completed') {
      stepOneCircle = true;
    }
    if (step2 == 'completed' && isPhotoAvailable) {
      stepTwoCircle = true;
    }
    if (step3 == 'completed') {
      stepThreeCircle = true;
    }

    let isAdmin = false;
    if (!account) {
      isAdmin = true;
    }

    return (

      <div className={cx(s.stepGrid, 'stepGridRTL')}>
        <div className={cx(s.leftBg, cs.textAlignCenter)}>
          <div className={s.userRight}>
            <Avatar
              isUser
              title={guestDisplayName}
              className={s.profileImage}
              width={'120'}
              height={'120'}
            />
          </div>
          <h3 className={cx(cs.commonTitleText, cs.fontWeightMedium, cs.spaceTop3)}><img src={sayIcon} className={s.sayCss} /> <FormattedMessage {...messages.hiText} />, <span className={s.userNameColor}>{!isAdmin && userData.firstName} {isAdmin && <FormattedMessage {...messages.admin} />}!</span></h3>
          <p className={cx(cs.commonTotalText, cs.spaceTop3, cs.spaceBottom6)}><FormattedMessage {...messages.onboardText} /></p>
          <img src={footerImage} className={s.stepFooterImage} />
        </div>
        <div className={s.rightPadding}>
          <div className={cx(cs.commonSubTitleText, cs.fontWeightMedium, cs.paddingBottom2)}><FormattedMessage {...messages.step1HeadingNew} /></div>
          <div className={cx(s.contentSection, cs.spaceBottom5, 'contentSectionRTL', cs.spaceTop3)}>
            <div className={s.flexCenter}>
              <div className={s.imgSection}>
                <img src={stepOne} />
                {step1 == "completed" && <img src={tickIcon} className={cx(s.tickPosition, 'tickPositionStepRTL')} />}
              </div>
              <div className={cx(s.contentLeft, 'contentLeftStepRTL')}>
                <h3 className={cx(cs.spaceBottom1, cs.commonContentText, cs.fontWeightMedium)}><FormattedMessage {...messages.step1SubHeading} /></h3>
                <p className={cx(cs.commonMediumText)}><FormattedMessage {...messages.step1HeadingContent} /></p>
              </div>
            </div>
            {
              step1 == "active" && <Link to={`/become-a-owner/${listId}/map`} className={cx(s.modalCaptionLink, 'modalCaptionLinkStepRTL')}>
                <FormattedMessage {...messages.continue} /> <img src={arrowIcon} className={'stepEditArrow'} />
              </Link>
            }
            {
              step1 == "completed" && <Link to={`/become-a-owner/${listId}/car`} className={cx(s.modalCaptionLink, 'modalCaptionLinkStepRTL')}>
                <FormattedMessage {...messages.editLabel} /> <img src={arrowIcon} className={'stepEditArrow'} />
              </Link>
            }
          </div>
          <div className={cx(cs.commonSubTitleText, cs.fontWeightMedium, cs.paddingBottom2)}><FormattedMessage {...messages.step2Heading} /></div>
          <div className={cx(s.contentSection, cs.spaceBottom5, 'contentSectionRTL', cs.spaceTop3)}>
            <div className={s.flexCenter}>
              <div className={s.imgSection}>
                {step2 == "completed" && isPhotoAvailable && <img src={tickIcon} className={cx(s.tickPosition, 'tickPositionStepRTL')} />}
                <img src={stepTwo} />
              </div>
              <div className={cx(s.contentLeft, 'contentLeftStepRTL')}>
                <h3 className={cx(cs.spaceBottom1, cs.commonContentText, cs.fontWeightMedium)}><FormattedMessage {...messages.step2SubHeading} /></h3>
                <p className={cx(cs.commonMediumText)}><FormattedMessage {...messages.step2HeadingContent} /></p>
              </div>
            </div>
            {
              step2 == "active" && <Link to={`/become-a-owner/${listId}/photos`} className={cx(s.button, s.modalCaptionLink, 'modalCaptionLinkStepRTL')} >
                <FormattedMessage {...messages.continue} /> <img src={arrowIcon} className={'stepEditArrow'} />
              </Link>
            }
            {
              step2 == "completed" && !isPhotoAvailable && <Link to={`/become-a-owner/${listId}/photos`} className={cx(s.button, s.modalCaptionLink, 'modalCaptionLinkStepRTL')} >
                <FormattedMessage {...messages.continue} /> <img src={arrowIcon} className={'stepEditArrow'} />
              </Link>
            }
            {
              step2 == "completed" && isPhotoAvailable && <Link to={`/become-a-owner/${listId}/photos`} className={cx(s.modalCaptionLink, 'modalCaptionLinkStepRTL')} >
                <FormattedMessage {...messages.editLabel} /> <img src={arrowIcon} className={'stepEditArrow'} />
              </Link>
            }
          </div>
          <div className={cx(cs.commonSubTitleText, cs.fontWeightMedium, cs.paddingBottom2)}><FormattedMessage {...messages.step3Heading} /></div>
          <div className={cx(s.contentSection, cs.spaceBottom5, 'contentSectionRTL', cs.spaceTop3)}>
            <div className={s.flexCenter}>
              <div className={s.imgSection}>
                <img src={stepThree} />
                {step3 == "completed" && <img src={tickIcon} className={cx(s.tickPosition, 'tickPositionStepRTL')} />}
              </div>
              <div className={cx(s.contentLeft, 'contentLeftStepRTL')}>
                <h3 className={cx(cs.spaceBottom1, cs.commonContentText, cs.fontWeightMedium)}><FormattedMessage {...messages.step3SubHeading} /></h3>
                <p className={cx(cs.commonMediumText)}><FormattedMessage {...messages.step3HeadingContent} /></p>
              </div>
            </div>
            {
              step3 == "active" && <Link to={`/become-a-owner/${listId}/car-rules`} className={cx(s.modalCaptionLink, 'modalCaptionLinkStepRTL')} >
                <FormattedMessage {...messages.continue} /> <img src={arrowIcon} className={'stepEditArrow'} />
              </Link>
            }
            {
              step3 == "completed" && <Link to={`/become-a-owner/${listId}/car-rules`} className={cx(s.modalCaptionLink, 'modalCaptionLinkStepRTL')} >
                <FormattedMessage {...messages.editLabel} /> <img src={arrowIcon} className={'stepEditArrow'} />
              </Link>
            }
          </div>
          <div className={cx(s.exitFooter, 'exitFooterRTL')}>
            {
              listingSteps && isReady && !isPublished && !userBanStatusValue && isShowButton && <div>
                <h3 className={cx(s.mbMargin)}>
                  <FormattedMessage {...messages.readyToPublish} />
                </h3>
                <div className={s.spaceBetween}>
                  <a target="_blank" href={"/cars/" + id + "/preview"} className={cx(s.modalCaptionLink, 'modalCaptionLinkStepRTL')}>
                    <FormattedMessage {...messages.previewListing} /> <img src={arrowIcon} className={'stepEditArrow'} />
                  </a>
                  <div className={s.displayInline}>
                    <Loader
                      type={"button"}
                      className={cx(s.btnPrimary)}
                      handleClick={() => ManagePublishStatus(id, 'publish')}
                      show={publishListLoading}
                      label={formatMessage(messages.publishNow)}
                    />
                  </div>

                </div>
              </div>
            }
            {
              listingSteps && isReady && isPublished && !userBanStatusValue && isShowButton && <div>
                <h3 className={cx(s.mbMargin)}>
                  <FormattedMessage {...messages.listingPublished} />
                </h3>
                <div className={s.spaceBetween}>
                  <a target="_blank" href={"/cars/" + id + "/preview"} className={cx(s.modalCaptionLink, 'modalCaptionLinkStepRTL')}><FormattedMessage {...messages.previewListing} /> <img src={arrowIcon} className={'stepEditArrow'} /></a>
                  <div className={s.displayInline}>
                    <Loader
                      type={"button"}
                      className={cx(s.btnPrimary)}
                      handleClick={() => ManagePublishStatus(id, 'unPublish')}
                      show={publishListLoading}
                      label={formatMessage(messages.unPublishNow)}
                    />
                  </div>
                </div>
              </div>
            }


            {
              userBanStatusValue == true && isShowButton && <span className={cs.displayinlineBlock}>
                <a target="_blank" href={"/cars/" + id + "/preview"} className={cx(s.modalCaptionLink, 'modalCaptionLinkStepRTL')}>
                  <FormattedMessage {...messages.previewListing} /> <img src={arrowIcon} className={'stepEditArrow'} />
                </a>
              </span>
            }
          </div>
        </div>
      </div>
    );
  }
}
const mapState = (state) => ({
  listingSteps: state.location.listingSteps,
  stepsLoading: state.location.stepsLoading,
  account: state.account.data,
  publishListLoading: state.location.publishListLoading,
  userData: state.account.data,
});
const mapDispatch = {
  ManagePublishStatus
};
export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(ExistingPage1)));
