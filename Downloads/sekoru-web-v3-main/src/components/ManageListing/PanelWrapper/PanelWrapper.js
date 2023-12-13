import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Component
import PanelItem from '../PanelItem';
import NoItem from '../NoItem';

// Locale
import messages from '../../../locale/messages';

import {
    Tabs,
    Tab
} from 'react-bootstrap';
import cx from 'classnames';


class PanelWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        }
    }

    static propTypes = {
        data: PropTypes.array.isRequired,
        formatMessage: PropTypes.any,
    };

    setValue = (value) => {
        this.setState({ searchValue: value })
    }

    render() {
        const { data: { refetch, loading, ManageListings } } = this.props;
        const { searchValue } = this.state;
        let inProgressItems = [];
        let completedItems = [];
        let unListedItems = [];
        if (ManageListings && ManageListings.status == 200 && ManageListings.userListingCount > 0) {
            ManageListings.results && ManageListings.results.length > 0 && ManageListings.results.map((item) => {
                if (item.isReady && item.isPublished) {
                    completedItems.push(item);
                } else if (!item.isReady) {
                    inProgressItems.push(item);
                } else if (item.isReady && !item.isPublished) {
                    unListedItems.push(item);
                }
            });
            return (
                <div className={cx('youcarsBg')}>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title={<FormattedMessage {...messages.panelHeader1} />}>
                            <PanelItem data={inProgressItems} refetch={refetch} loading={loading} searchKey={searchValue} setValue={this.setValue} />
                        </Tab>
                        <Tab eventKey={2} title={<FormattedMessage {...messages.listed} />}>
                            <PanelItem data={completedItems} refetch={refetch} loading={loading} searchKey={searchValue} setValue={this.setValue} />
                        </Tab>
                        <Tab eventKey={3} title={<FormattedMessage {...messages.unListed} />}>
                            <PanelItem data={unListedItems} refetch={refetch} loading={loading} searchKey={searchValue} setValue={this.setValue} />
                        </Tab>
                    </Tabs>
                </div>
            );
        } else {
            return <NoItem />;
        }

    }
}

export default injectIntl(PanelWrapper);
