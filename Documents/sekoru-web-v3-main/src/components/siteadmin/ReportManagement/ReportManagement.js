import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReportManagement.css';
import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';

// Translation
import messages from '../../../locale/messages';
import ReportManagementQuery from './ReportManagement.graphql';

class ReportManagement extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            userId: PropTypes.number.isRequired,
            reporterId: PropTypes.string.isRequired,
            reporterType: PropTypes.string.isRequired,
        })),
    };

    static defaultProps = {
        data: []
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            currentPage: 1,
            searchList: '',
            typing: false,
            typingTimeout: 0
        }
        // this.handleChange = this.handleChange.bind(this);
        this.paginationData = this.paginationData.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    paginationData(currentPage) {
        const { reportUserManagement: { refetch }, setStateVariable } = this.props;
        let variables = { currentPage };
        setStateVariable(variables);
        refetch(variables);
    }
    handleClick(searchList) {
        const { reportUserManagement: { refetch }, setStateVariable } = this.props;
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
            { data: formatMessage(messages.idLabel) },
            { data: formatMessage(messages.reporterName) },
            { data: formatMessage(messages.reporterEmail) },
            { data: formatMessage(messages.userNameLabel) },
            { data: formatMessage(messages.userEmailLabel) },
            { data: formatMessage(messages.reportType) },
            { data: formatMessage(messages.transferDate) }
        ]
    };

    tbody = () => {
        const { reportUserManagement: { loading, reportUserManagement } } = this.props;
        return reportUserManagement?.reportsData.map((value) => {
            return {
                id: value?.id,
                data: [
                    { data: value.id },
                    {
                        data: value?.reporterData ? value?.reporterData?.displayName : <FormattedMessage {...messages.userDeletedLabel} />
                    },
                    {
                        data: value?.reporterData ? <a href={"/users/show/" + value.userProfileId.profileId} target="_blank">
                            {value.reporterEmail.email}
                        </a> : <FormattedMessage {...messages.userDeletedLabel} />
                    },
                    {
                        data: value?.userData ? value.userData.displayName : <FormattedMessage {...messages.userDeletedLabel} />
                    },
                    {
                        data: value?.userData ? <a href={"/users/show/" + value.userData.profileId} target="_blank">
                            {value.userEmail.email}
                        </a> : <FormattedMessage {...messages.userDeletedLabel} />
                    },
                    { data: value.reportType },
                    { data: moment(value.createdAt).format('MM/DD/YYYY') }
                ]
            }
        })
    }


    render() {
        const { formatMessage } = this.props.intl;
        const { reportUserManagement: { loading, reportUserManagement }, currentPage } = this.props;

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
                <CommonTable
                    thead={this.thead}
                    tbody={this.tbody}
                    title={formatMessage(messages.reportUser)}
                    isSearch
                    onSearch={this.handleSearchChange}
                />
                {
                    reportUserManagement?.reportsData?.length > 0
                    && <div>
                        <CustomPagination
                            total={reportUserManagement.count}
                            currentPage={currentPage}
                            defaultCurrent={1}
                            defaultPageSize={10}
                            change={this.paginationData}
                            paginationLabel={formatMessage(messages.messages)}
                        />
                    </div>
                }
            </div>
        );
    }

}

const mapState = (state) => ({
});

const mapDispatch = {
};

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(ReportManagementQuery, {
        name: 'reportUserManagement',
        options: (props) => ({
            variables: {
                currentPage: props.currentPage,
                searchList: props.searchList
            },
            fetchPolicy: 'network-only',
        })
    })
)(ReportManagement);