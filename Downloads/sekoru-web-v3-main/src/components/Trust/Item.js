import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Trust.css';
import Loader from '../Loader';
import { injectIntl } from 'react-intl';
import messages from '../../locale/messages';
import { COMMON_COLOR } from '../../constants/index';

//Image
import mail from './icons/gmail.png';
import document from './icons/document.png';
import email from './icons/email.png';
import facebook from './icons/facebook.png';
import tick from './icons/tick.png';
import arrow from './icons/arrow.png';

class Item extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        handleClick: PropTypes.any,
        isAction: PropTypes.bool,
        buttonLabel: PropTypes.string,
        url: PropTypes.string,
        isLink: PropTypes.bool,
        show: PropTypes.bool,
    };
    render() {
        const { title, content, handleClick, isAction, buttonLabel, url, isLink, show, isImage } = this.props;
        const { isEmailConfirmed, name } = this.props;
        const { formatMessage } = this.props.intl;

        let bgImage;
        if (name == 'email') {
            bgImage = email
        } else if (name == 'facebook') {
            bgImage = facebook
        } else if (name == 'google') {
            bgImage = mail
        } else if (name == 'document') {
            bgImage = document
        }
        return (
            <div className={cx(s.trustGridSec)}>
                <Image src={bgImage} className={s.iconSize} />
                <div>
                    <h4 className={cx(s.commonContentText, s.titleText, s.fontWeightBold)}>{title}</h4>
                    <p className={cx(s.commonMediumText, s.fontWeightNormal)}>{content}</p>
                </div>
                <div className={cx(s.btnSecAlignment, 'btnSecAlignmentRTL')}>
                    {
                        isAction && isLink && <>
                            <a className={cx(cx(s.commonContentText, s.textLink, s.fontWeightMedium, s.commomLinkborderBottom))} href={url}>
                                <span className={cx(s.siteLinkColor, s.linkSpaceRight, 'linkSpaceLeftRTL')}>{buttonLabel}</span><img src={arrow} className={cx(s.arrowIcon, 'trustArrowIconRTL')} />
                            </a>
                        </>
                    }

                    {
                        isAction && !isLink &&
                        <div className={cx(cx(s.commonContentText, s.textLink, s.fontWeightMedium, s.commomLinkborderBottom))} onClick={handleClick}>
                            <span className={cx(s.siteLinkColor, s.linkSpaceRight, 'linkSpaceLeftRTL')}>{buttonLabel}</span><img src={arrow} className={cx(s.arrowIcon, 'trustArrowIconRTL')} />
                        </div>

                    }
                    {
                        isImage && <>
                            <Loader
                                type={"button"}
                                className={cx(s.btnVerified, s.commonMediumText, s.fontWeightMedium)}
                                show={show}
                                label={formatMessage(messages.verified)}
                                disabled
                                tickIcon={tick}
                                tickIconStyle={cx(s.tickIcon, 'verifiedTickIconRTL')}
                            />
                        </>
                    }
                </div>
            </div>
        )
    }
}
export default injectIntl(withStyles(s)(Item));