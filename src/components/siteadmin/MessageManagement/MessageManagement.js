import React, { Component } from 'react';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MessageManagement.css';

import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';
// Redux Action
import { viewReceiptAdmin } from '../../../actions/Reservation/viewReceiptAdmin';
import messages from '../../../locale/messages';
import messageManagementQuery from './messageManagement.graphql';
class MessageManagement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            currentPage: 1,
            searchList: '',
            typing: false,
            typingTimeout: 0
        }
        this.paginationData = this.paginationData.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    paginationData(currentPage) {
        const { messageManagement: { refetch }, setStateVariable } = this.props;
        let variables = { currentPage };
        setStateVariable(variables);
        refetch(variables);
    }
    handleClick(searchList) {
        const { messageManagement: { refetch }, setStateVariable } = this.props;
        const { currentPage } = this.state;
        let variables = {
            currentPage: 1,
            searchList: searchList
        };
        setStateVariable(variables);
        refetch(variables);
    }
    handleSearchChange = (e) => {
        const self = this;
        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }
        self.setState({
            searchList: e.target.value,
            typing: false,
            typingTimeout: setTimeout(function () {
                self.handleClick(self.state.searchList);
            }, 450)
        });
    }

    thead = () => {
        const { formatMessage } = this.props.intl;
        return [
            { data: formatMessage(messages.reservationId) },
            { data: formatMessage(messages.carNameLabel) },
            { data: formatMessage(messages.hosting) },
            { data: formatMessage(messages.ownerEmailLabel) },
            { data: formatMessage(messages.traveling) },
            { data: formatMessage(messages.renterEmail) },
            { data: formatMessage(messages.titleRequiredLabel) },
        ]
    };


    tbody = () => {
        const { messageManagement: { loading, messageManagement } } = this.props;
        return messageManagement?.usersData?.length > 0 && messageManagement?.usersData?.map((value, index) => {
            return {
                id: value?.id,
                data: [
                    {
                        data: index + 1
                    },
                    {
                        data:
                            <a
                                target="_blank"
                                href={"/cars/" + value.listId}
                                className={cx(s.previewLink)}
                            >
                                {
                                    value.listData ? value.listData.title : 'List is missing'
                                }
                            </a>
                    },
                    {
                        data: value?.hostProfile?.displayName
                    },
                    {
                        data: value?.hostProfile?.profileId ? <a href={"/users/show/" + value.hostProfile.profileId} target="_blank" >
                            {value.hostUserData.email}
                        </a> : "-"
                    },
                    {
                        data: value?.guestProfile?.displayName ? value.guestProfile.displayName : ''
                    },
                    {
                        data: value?.guestProfile?.profileId ? <a href={"/users/show/" + value.guestProfile.profileId} target="_blank" >
                            {value.guestUserData.email}
                        </a> : "-"
                    },
                    {
                        data: <a target="_blank" href={"/message/" + value.id + "/owner"} className={cx(s.previewLink)}>
                            <FormattedMessage {...messages.messageHistroyLabel} />
                        </a>
                    }

                ]
            }
        })
    }

    render() {
        const { messageManagement: { loading, messageManagement } } = this.props;
        const { currentPage } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
                {messageManagement?.usersData && <CommonTable
                    thead={this.thead}
                    tbody={this.tbody}
                    title={formatMessage(messages.messages)}
                    isSearch
                    onSearch={this.handleSearchChange}
                />}
                {
                    messageManagement?.usersData?.length > 0
                    && <div>
                        <CustomPagination
                            total={messageManagement.count}
                            currentPage={currentPage}
                            defaultCurrent={1}
                            defaultPageSize={10}
                            change={this.paginationData}
                            paginationLabel={formatMessage(messages.messages)}
                        />
                    </div>
                }
            </div >
        );
    }

}

const mapState = (state) => ({
    completed: state.reservation.completed,
    loading: state.reservation.loading,
});

const mapDispatch = {
    viewReceiptAdmin,
};

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(messageManagementQuery, {
        name: 'messageManagement',
        options: (props) => ({
            variables: {
                currentPage: props.currentPage,
                searchList: props.searchList
            },
            fetchPolicy: 'network-only',
        })
    })
)(MessageManagement);
