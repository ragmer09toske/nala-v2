import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import {
    Col,
    Tab,
    Tabs,
    FormGroup,
    FormControl
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Trips.css';
import cs from '../../components/commonStyle.css'
import cx from 'classnames'
import history from '../../core/history';

// Graphql
import getAllReservationQuery from './getAllReservationQuery.graphql';

// Component
import Reservation from '../../components/Reservation';
import NoItem from '../../components/Reservation/NoItem';
import Loader from '../../components/Loader';
import CustomPagination from '../../components/CustomPagination';
import SideMenu from '../../components/ManageListing/SideMenu/SideMenu';

// Locale
import messages from '../../locale/messages';
import debounce from '../../helpers/debounce';

class Trips extends React.Component {
    static propTypes = {
        formatMessage: PropTypes.func,
        userType: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            getAllReservation: PropTypes.shape({
                count: PropTypes.number,
                reservationData: PropTypes.array
            }),
            refetch: PropTypes.func
        })
    };

    paginationData = (currentPage) => {
        const { data: { refetch }, setStateVariable } = this.props;
        let variables = { currentPage };
        setStateVariable(variables);
        refetch(variables);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    handleSearch = (searchKey) => {
        const { data: { refetch }, setStateVariable } = this.props;
        let variables = { searchKey, currentPage: 1 };
        setStateVariable(variables)
        refetch(variables)
    }

    handleSelect = (key) => {
        const { setStateVariable } = this.props;
        key === 1 ? history.push('/trips/current') : history.push('/trips/previous');
        setStateVariable({ currentPage: 1 })
    }

    render() {
        const { data, data: { loading, getAllReservation }, userType, type, searchKey, currentPage } = this.props;
        const { formatMessage } = this.props.intl;
        let title;
        if (userType === 'owner') {
            title = (type == 'current') ? <FormattedMessage {...messages.upcomingReservations} /> : <FormattedMessage {...messages.previousReservations} />;
        } else {
            title = (type == 'current') ? <FormattedMessage {...messages.upcomingTrips} /> : <FormattedMessage {...messages.previousTrips} />;
        }

        return (
            <Col xs={12} sm={12} md={8} lg={8} className={cs.spaceTop6}>
                <div className={cx(cs.tripsReservationPanel, 'youcarsBg', 'bgBlack')}>
                    <div className={cx('tabBarView', 'tabBarViewRTL')}>
                        <Tabs activeKey={type == 'current' ? 1 : 2} id="uncontrolled-tab-example" onSelect={(e) => this.handleSelect(e)}>
                            <Tab eventKey={1} title={<FormattedMessage {...messages.upcomingTab} />} />
                            <Tab eventKey={2} title={<FormattedMessage {...messages.previousTab} />} />
                        </Tabs>
                    </div>
                    {
                        getAllReservation?.totalCount > 0 &&
                        <div className={cx(cs.spaceTop5, cs.spaceBottom4)}>
                            <FormGroup className={s.noMargin}>
                                <FormControl
                                    type="text"
                                    placeholder={formatMessage(messages.searchYourTrips)}
                                    onChange={(e) => debounce(this.handleSearch(e.target && e.target.value))}
                                    className={cx(s.formControlInput, s.locationBgIcon, 'reservationSearchIconRTL')}
                                    maxLength={255}
                                />
                            </FormGroup>
                        </div>
                    }

                    {
                        loading && <Loader type={"text"} />
                    }
                    {
                        !loading && getAllReservation !== undefined && getAllReservation !== null
                        && getAllReservation.reservationData.length > 0 && <Reservation
                            data={getAllReservation.reservationData}
                            userType={userType}
                        />
                    }
                    {
                        getAllReservation !== undefined && getAllReservation !== null
                        && getAllReservation.reservationData.length > 0 &&
                        <div>
                            <CustomPagination
                                total={getAllReservation.count}
                                currentPage={getAllReservation.currentPage}
                                defaultCurrent={1}
                                defaultPageSize={5}
                                change={this.paginationData}
                                paginationLabel={formatMessage(messages.trips)}
                            />
                        </div>
                    }
                    {
                        !loading && getAllReservation !== undefined && getAllReservation !== null
                        && getAllReservation.reservationData.length === 0 && <NoItem
                            userType={userType}
                            type={type}
                        />
                    }
                </div>

            </Col>
        );
    }
}

export default compose(
    injectIntl,
    withStyles(s, cs),
    graphql(getAllReservationQuery,
        {
            options: (props) => ({
                variables: {
                    searchKey: props.searchKey,
                    userType: props.userType,
                    dateFilter: props.type,
                    currentPage: props.currentPage,
                },
                fetchPolicy: 'network-only',
            })
        }
    ),
)(Trips);