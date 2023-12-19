import React from 'react';
import {
    Popover, Button, ButtonToolbar, OverlayTrigger, Tooltip
} from 'react-bootstrap';
// Redux form
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from '../../components/commonStyle.css';
import cx from 'classnames';

//Images
import dotIcon from '../../../public/SiteIcons/adminTableDotIcon.svg';
import deleteIcon from '../../../public/AdminIcons/delete.svg';
import editIcon from '../../../public/AdminIcons/edit.svg';
import EyeIcon from '../../../public/AdminIcons/eye.svg'
import tooltipIcon from '/public/SiteIcons/tableTooltipIcon.svg';

import Link from '../../components/Link';

// Locale
import messages from '../../locale/messages';

class TableAction extends React.Component {

    render() {
        const { onClickEdit, onClickDelete, showEdit, showDelete, showView, link, newLink, editNewLink, editLink, editAction } = this.props;
        const { payoutDefaultLoader, payoutVerifyLoader, index, setDefaultPayout, verifyPayout, item } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <ButtonToolbar>
                    <OverlayTrigger
                        placement="bottom"
                        rootClose={true}
                        trigger="click"
                        adaptivePosition="false"
                        overlay={(
                            <Popover positionLeft={200}
                                positionTop={50} placement="bottom">
                                {showView && link &&
                                    <Link to={link} className={cx(cs.dFlex, cs.noTextDecration, cs.commonMediumText, cs.fontWeightBold, cs.siteTextColor, 'popoverContentPadding', 'wordBreak', cs.alignItemBaseline)}>
                                        <img src={EyeIcon} className={cs.csvImageSpace} />
                                        <span>{formatMessage(messages.viewLabel)}</span>
                                    </Link>
                                }
                                {showView && newLink &&
                                    <a href={newLink} target="_blank" className={cx(cs.dFlex, cs.noTextDecration, cs.commonMediumText, cs.fontWeightBold, cs.siteTextColor, 'popoverContentPadding', 'wordBreak', cs.alignItemBaseline)}>
                                        <img src={EyeIcon} className={cs.csvImageSpace} />
                                        <span>{formatMessage(messages.viewLabel)}</span>
                                    </a>
                                }
                                {showEdit && onClickEdit && <Button onClick={onClickEdit} className={cx(cs.dFlex, cs.tabelDropDownBtn, cs.fontWeightBold, 'popoverContentPadding', 'wordBreak', cs.alignItemBaseline)}>
                                    <img src={editIcon} className={cs.csvImageSpace} />
                                    <span>{formatMessage(messages.editLabel)}</span>
                                </Button>}
                                {
                                    showEdit && editNewLink && <a href={editNewLink} target="_blank" className={cx(cs.dFlex, cs.noTextDecration, cs.commonMediumText, cs.fontWeightBold, cs.siteTextColor, 'popoverContentPadding', 'wordBreak', cs.alignItemBaseline)}>
                                        <img src={editIcon} className={cs.csvImageSpace} />
                                        <span>{formatMessage(messages.editLabel)}</span>
                                    </a>
                                }
                                {
                                    showEdit && editLink && <Link to={editLink} className={cx(cs.dFlex, cs.noTextDecration, cs.commonMediumText, cs.fontWeightBold, cs.siteTextColor, 'popoverContentPadding', 'wordBreak', cs.alignItemBaseline)}>
                                        <img src={editIcon} className={cs.csvImageSpace} />
                                        <span>{formatMessage(messages.editLabel)}</span>
                                    </Link>
                                }
                                {
                                    showEdit && editAction && <Link noLink onClick={editAction} className={cx(cs.dFlex, cs.noTextDecration, cs.commonMediumText, cs.fontWeightBold, cs.siteTextColor, 'popoverContentPadding', 'wordBreak', cs.alignItemBaseline)}>
                                        <img src={editIcon} className={cs.csvImageSpace} />
                                        <span>{formatMessage(messages.editLabel)}</span>
                                    </Link>
                                }
                                {
                                    item && <> {
                                        !item.default && item.isVerified && <a
                                            className={cx(cs.dFlex, cs.noTextDecration, cs.commonMediumText, cs.fontWeightBold, cs.siteTextColor, 'popoverContentPadding', cs.popoverPayout, 'wordBreak', cs.alignItemBaseline)}
                                            onClick={() => {
                                                if (!payoutDefaultLoader) {
                                                    setDefaultPayout(item.id)
                                                }
                                                document && document.body.click();
                                            }}
                                        >
                                            {formatMessage(messages.setDefault)}
                                        </a>
                                    }
                                        {
                                            !item.default && !item.isVerified && item.methodId === 2 && <a
                                                href='javascript:void(0)'
                                                onClick={() => {
                                                    if (!payoutVerifyLoader) {
                                                        verifyPayout(item.payEmail, item.userId);
                                                    }
                                                    document && document.body.click();
                                                }}
                                                className={cx(cs.dFlex, cs.noTextDecration, cs.commonMediumText, cs.fontWeightBold, cs.siteTextColor, 'popoverContentPadding', cs.popoverPayout)}
                                            >
                                                {formatMessage(messages.payoutVerify)}
                                                <OverlayTrigger
                                                    overlay={<Tooltip id={'tooltip' + index}><FormattedMessage {...messages.payoutVerifyStripeInfo} /></Tooltip>}
                                                    placement='top'
                                                >
                                                    <span>
                                                        <img src={tooltipIcon} className={cs.tolltipMargin} />
                                                    </span>
                                                </OverlayTrigger>
                                            </a>
                                        }
                                    </>
                                }

                                {showDelete && <Button type='button' onClick={() => {
                                    onClickDelete();
                                    document && document.body.click();
                                }}
                                    className={cx(cs.dFlex, cs.tabelDropDownBtn, cs.fontWeightBold, 'popoverContentPadding', cs.popoverPayout)}>
                                    {!item && <img src={deleteIcon} className={cs.csvImageSpace} />}
                                    <span>{item ? formatMessage(messages.remove) : formatMessage(messages.delete)}</span>
                                </Button>}
                            </Popover>
                        )}>
                        <Button className={cs.tabelDropDownBtn}>
                            <img src={dotIcon} />
                        </Button>
                    </OverlayTrigger>
                </ButtonToolbar>
            </div>
        );
    }
}


export default injectIntl(withStyles(cs)(TableAction));