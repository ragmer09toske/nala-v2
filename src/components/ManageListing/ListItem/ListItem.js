import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// External Component
import moment from 'moment';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Button,
  Row,
  Col,
  ProgressBar,
} from 'react-bootstrap';
import s from './ListItem.css';
import cs from '../../commonStyle.css';
import * as FontAwesome from 'react-icons/lib/fa';
// For Redirect
import history from '../../../core/history';
// Component
import ListCoverPhoto from '../../ListCoverPhoto';
import PublishOption from './PublishOption';
// Redux
import { connect } from 'react-redux';
// Redux action
import { removeListing } from '../../../actions/removeListing';
// Locale
import messages from '../../../locale/messages';

//Image
import closeIcon from '/public/SiteIcons/listCloseIcon.svg';
class ListItem extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.state = {
      isRemove: false
    };
    this.openRemoveList = this.openRemoveList.bind(this);
    this.closeRemoveList = this.closeRemoveList.bind(this);
  }
  percentage(data) {
    let totalPercentage = 100;
    let percentage = 0;
    let step1Percentage = 0, step2Percentage = 0, step2PhotosPercentage = 0, step3Percentage = 0;
    let step1 = data.listingSteps.step1;
    let step2 = data.listingSteps.step2;
    let step3 = data.listingSteps.step3;
    let listPhotos = data.listPhotos;
    if (data) {
      if (step1 === "active") {
        step1Percentage = 0.20;
      }
      if (step1 === "completed") {
        step1Percentage = 0.30;
      }
      if (step2 === "completed") {
        step2Percentage = 0.20;
      }
      if (listPhotos.length > 0) {
        step2PhotosPercentage = 0.10;
      }
      if (step3 === "completed") {
        step3Percentage = 0.40;
      }
    }
    percentage = step1Percentage + step2Percentage + step2PhotosPercentage + step3Percentage;
    return Number(totalPercentage * percentage);
  }
  title(data) {
    if (data) {
      if (data.title != null) {
        return data.title
      } else {
        return data?.settingsData[0]?.listsettings?.itemName + " in " + data.city;
      }
    }
  }
  handlePreview(listId) {
    if (listId) {
      history.push('/cars/' + listId + '/preview');
    }
  }
  handleEditListing(listId) {
    if (listId) {
      history.push('/become-a-owner/' + listId + '/home');
    }
  }
  async handleRemoveListing(listId) {
    const { removeListing, refetch, searchKey } = this.props;
    await removeListing(listId);
    this.setState({ isRemove: false });
    let variables = { searchKey }
    await refetch(variables);
  }
  openRemoveList() {
    this.setState({ isRemove: true });
  }
  closeRemoveList() {
    this.setState({ isRemove: false });
  }
  handleClick() {
    history.push('/become-a-owner/car');
  }
  removeItem(listId) {
    return (
      <li className={s.panelBodyAlert}>
        <div className={cx(s.alertBlock)}>
          <div>
            <p className={cx(s.h5, s.space2)}>
              <span><FormattedMessage {...messages.deleteListing} /></span>
            </p>
            <p className={cx(s.alertText, s.space3)}>
              <span><FormattedMessage {...messages.deleteListingInfo} /></span>
            </p>
            <div className={cx(cs.dFlex, s.noPadding, cs.mrListDeletBtnBox)}>
              <Button
                className={cx(s.button, s.btnPrimary, s.btnlarge, s.spaceRight2, s.smButton, s.btnPad, s.mrdeleteBtn, 'mrListSpaceRight2RTL')}
                onClick={() => this.handleRemoveListing(listId)}>
                <FormattedMessage {...messages.delete} />
              </Button>
              <Button
                className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.smButton, s.btnPad, s.noBgColor, s.mrdeleteBtn)}
                onClick={this.closeRemoveList}>
                <FormattedMessage {...messages.Cancel} />
              </Button>
            </div>
          </div>
        </div>
      </li>
    )
  }
  render() {
    const { isRemove } = this.state;
    const { data } = this.props;
    let updatedDate = moment(data.lastUpdatedAt).format('MMMM DD, YYYY');
    let listId = data.id;
    let coverPhoto = data.coverPhoto;
    let listPhotos = data.listPhotos;
    if (isRemove) {
      return this.removeItem(listId);
    } else {
      return (
        <li className={s.panelBody} >
          <Row>
            <Col xs={12} sm={12} className={cx('hidden-md hidden-lg', s.space2)}>
              <a onClick={this.openRemoveList} className={cx(s.iconRemove, s.icon, 'pull-right', 'iconRemoveRTL')}>
                <img src={closeIcon} />
              </a>
            </Col>
            <Col xs={12} sm={12} md={5} lg={5}>
              <div className={s.listPhotoCover}>
                <div className={s.listPhotoMedia}>
                  <a target="_blank" href={"/cars/" + listId + "/preview"}>
                    <ListCoverPhoto
                      className={s.imgResponsive}
                      coverPhoto={coverPhoto}
                      listPhotos={listPhotos}
                      photoType={"x_medium"}
                    />
                  </a>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={7} lg={7} className={s.listDetailContent}>
              <div>
                <a target="_blank" href={"/cars/" + listId + "/preview"} className={cx(s.listContent, cs.commonContentText, cs.fontWeightMedium)}>
                  {this.title(data)}
                </a>
              </div>
              <a onClick={this.openRemoveList} className={cx(s.iconRemove, s.icon, "hidden-sm hidden-xs", 'iconRemoveRTL')}>
                <img src={closeIcon} />
              </a>
              <div className={cx(cs.spaceTop2)}>
                <div className={cx(cs.commonSmallText, cs.spaceBottom1)}><FormattedMessage {...messages.progressBarText1} /> {this.percentage(data)}% <FormattedMessage {...messages.progressBarText2} /></div>
                <ProgressBar
                  bsClass={s.leanProgressBar}
                  className={s.leanProgressContainer}
                  now={this.percentage(data)}
                />
              </div>

              <div className={cx(s.noPadding, s.spaceTop2)}>
                <span className={s.landingStep}><FormattedMessage {...messages.listingUpdateInfo} /> {updatedDate}</span>
              </div>
              <div className={cx(cs.dFlexWrap, cs.mrListDeletBtnBox)}>
                <Button className={cx(s.button, s.btnPrimary, s.spaceRight2, s.spaceTop14, s.smButton, s.marginRight3, s.fontSize13, s.mrlistingBtn, 'mrListSpaceRight2RTL')} onClick={() => this.handleEditListing(listId)}>
                  {
                    data.listingSteps.step3 === "completed" && listPhotos.length > 0 && <span><FormattedMessage {...messages.editListing} /></span>
                  }
                  {
                    data.listingSteps.step3 === "completed" && listPhotos.length <= 0 && <span><FormattedMessage {...messages.finishListing} /></span>
                  }
                  {
                    data.listingSteps.step3 !== "completed" && <span><FormattedMessage {...messages.finishListing} /></span>
                  }
                </Button>
                {
                  data && data.listingSteps && data.isReady && <a
                    href={"/cars/" + listId + "/preview"}
                    target="_blank"
                    className={cx('btn btn-default', s.button, s.btnPrimaryBorder, s.spaceRight2, s.spaceTop14, s.smButton, s.fontSize13, s.mrlistingBtn, s.bgTransparent, 'mrListSpaceRight2RTL')}
                  >
                    <FormattedMessage {...messages.preview} />
                  </a>
                }
                {
                  data && data.isReady && data.user.userBanStatus != 1 && <PublishOption
                    listId={listId}
                    isPublished={data.isPublished}
                  />
                }
              </div>
            </Col>
          </Row>
        </li>
      );
    }
  }
}
const mapState = (state) => ({
});
const mapDispatch = {
  removeListing
};
export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(ListItem)));