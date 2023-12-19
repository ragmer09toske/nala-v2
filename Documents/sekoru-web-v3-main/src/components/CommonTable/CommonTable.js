import React from 'react';
import { Table } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from '../../components/commonStyle.css';
import Link from '../../components/Link';
// Locale
import messages from '../../locale/messages';

//Images
import tickIcon from '../../../public/SiteIcons/adminPlusIcon.svg';
import csvIcon from '../../../public/AdminIcons/uploadCSV.svg';

class CommonTable extends React.Component {
    render() {
        const { thead, tbody, title, onSearch, isSearch, isLink, isExport, exportLink, redirectionLabel, href, addAction, className, isHeadingHide } = this.props;
        const { formatMessage } = this.props.intl;
        const theadData = thead();
        const tbodyData = tbody();
        return (
            <div>{!isHeadingHide && <h1 className={cx(cs.commonTotalText, cs.spaceBottom5, cs.fontWeightBold)}>{title}</h1>}
                <div className={cx(cs.dFlexContainer, cs.mobileTableSearch, cs.flexEnd, 'mobileTableSearchRTL')}>
                    <div>
                        {isSearch && <>
                            <FormControl
                                type="text"
                                placeholder={formatMessage(messages.search)}
                                onChange={(e) => onSearch(e)}
                                className={cx('searchInputControl', 'searchInputControlWidth')}
                            />
                        </>}
                    </div>
                    <div>
                        {
                            isLink && href && <Link to={href} className={cx(cs.dFlex, cs.spaceBottom5, cs.commonLinkBorder, cs.noTextDecration, cs.commonContentText, cs.fontWeightMedium, cs.siteLinkColor)}>
                                <img src={tickIcon} className={cs.csvImageSpace} /> {redirectionLabel}
                            </Link>
                        }
                        {
                            isLink && addAction && <Link noLink onClick={addAction} className={cx(cs.dFlex, cs.spaceBottom5, cs.commonLinkBorder, cs.noTextDecration, cs.commonContentText, cs.fontWeightMedium, cs.siteLinkColor)}>
                                <img src={tickIcon} className={cs.csvImageSpace} /> {redirectionLabel}
                            </Link>
                        }
                        {
                            tbodyData?.length > 0 && isExport && <a href={exportLink} className={cx(cs.dFlex, cs.spaceBottom5, cs.commonLinkBorder, cs.noTextDecration, cs.commonContentText, cs.fontWeightMedium, cs.siteLinkColor)}>
                                <FormattedMessage {...messages.exportDataIntoCSV} />
                                <img src={csvIcon} className={cs.csvImageSpace} />
                            </a>
                        }
                    </div>
                </div>
                <div className={cx('tableFixHead', 'tableSelect', className)}>
                    <Table responsive>
                        <thead>
                            <tr>
                                {
                                    theadData?.map((item, index) => {
                                        return <th scope="col" key={index}>{item.data}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tbodyData && tbodyData.length > 0 && tbodyData?.map((item, index) => {
                                    return <tr key={item.id}>
                                        {item.data.map((value, index) => <td
                                            data-label={theadData[index].data}
                                            key={index}>{value.data}
                                        </td>)}
                                    </tr>
                                })
                            }
                            {
                                (!tbodyData || tbodyData?.length == 0) && <tr><td colSpan={theadData?.length} className={'noRecordsText'}><FormattedMessage {...messages.noRecordFound} /></td></tr>
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default injectIntl(withStyles(cs)(CommonTable));