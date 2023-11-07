import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import cs from '../../commonStyle.css'
// Component
import Avatar from '../../Avatar';

class ToMessage extends Component {
  static propTypes = {
    profileId: PropTypes.number.isRequired,
    picture: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    content: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  };

  static defaultProps = {
    createdAt: null
  };

  render() {
    const { profileId, picture, displayName, content, createdAt } = this.props;
    let date = createdAt != null ? moment(createdAt).format('MM/D/YYYY') : '';

    return (
      <div className={cx(s.messageMainContainer, cs.spaceBottom4)}>
        <div className={cx(s.rsFromMessageContainer, s.rsFromMessageMarginRight, 'rsFromMessageContainerRTL', 'rsFromMessageMarginRightRLT')}>
          <div className={cx()}>
            <span className={cx(s.messageText)}>
              {
                content && (content.trim()).split("\n").map(function (item, index) {
                  return (
                    <span key={index}>{item}<br /></span>
                  )
                })
              }
            </span>
            <div className={cx(s.dateText, s.spaceTop1)}>
              <span>{date}</span>
            </div>
          </div>
        </div>
        <div className={cx(s.lsMessageContainer)}>
          <div className={s.messageAvatar}>
            <Avatar
              source={picture}
              title={displayName}
              className={s.profileAvatar}
              withLink
              linkClassName={s.commonProfileAvatarLink}
              profileId={profileId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s, cs)(ToMessage);