import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Style
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PanelItem.css';
import cx from 'classnames';
import messages from '../../../locale/messages';
// Component
import ListItem from '../ListItem';
import { FormattedMessage, injectIntl } from 'react-intl';
import addIcon from '/public/siteImages/addIcon.svg';
import Loader from '../../Loader/Loader';

import bt from '../../../components/commonStyle.css';
import history from '../../../core/history';
import debounce from '../../../helpers/debounce';
import NoDataView from '../../NoDataView/NoDataView';
//Image
import noDataIcon from '/public/SiteIcons/noItemCars.svg';
class PanelItem extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        panelTitle: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.handleSearchChange = debounce(this.handleSearchChange.bind(this))
    }

    handleSearchChange(e) {
        const { refetch } = this.props;
        let variables = {
            searchKey: e && e.toString().trim()
        }
        refetch(variables);
    }

    render() {
        const { data, panelTitle, refetch, searchKey, loading, setValue } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div className={cx('manageListingItem')}>
                <div className={cx(s.listFlex)}>
                    <div className={s.mobileSearchWidth}>
                        <FormGroup className={s.noMargin}>
                            <FormControl
                                type="text"
                                placeholder={formatMessage(messages.searchByCars)}
                                onChange={(e) => setValue(e.target && e.target.value)}
                                onKeyUp={() => this.handleSearchChange(searchKey)}
                                className={cx(s.formControlInput, s.jumboInput, s.locationBgIcon, 'locationBgIconRTL')}
                                value={searchKey}
                                maxLength={255}
                            />
                        </FormGroup>
                    </div>
                    <div className={s.mobileSearchWidth}>
                        <Button onClick={() => history.push('/become-a-owner?mode=new')} className={cx(bt.btnPrimary, s.linkCss, s.btnMinWidth)}>
                            <img src={addIcon} className={cx(s.plusIcon, 'addPlusIcon')} />
                            <FormattedMessage {...messages.addNewListing} />
                        </Button>
                    </div>
                </div>

                <div header={panelTitle}>
                    {
                        loading && <Loader type={"text"} />
                    }
                    {!loading && <ul className={cx(s.listContainer, 'listLayoutArbic')}>
                        {
                            data && data.length > 0 && data.map((item, index) => {
                                return (
                                    <ListItem data={item} key={index} refetch={refetch} searchKey={searchKey} />
                                )
                            })
                        }
                        {
                            data && data.length == 0 && <div className={s.textCenter}>
                                <NoDataView
                                    noDataIcon={noDataIcon}
                                    title={formatMessage(messages.title)}
                                    content1={formatMessage(messages.content)}
                                />
                            </div>
                        }
                    </ul>}
                </div>
            </div>
        )
    }
}

export default injectIntl(withStyles(s)(PanelItem));
