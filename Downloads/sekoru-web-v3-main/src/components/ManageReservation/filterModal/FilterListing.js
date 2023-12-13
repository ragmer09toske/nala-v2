import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
    Button, FormControl
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FilterListing.css';
import { connect } from 'react-redux';
import cx from 'classnames';
import messages from '../../../locale/messages';
import DateRange from './DateRange';
import { onChangeListingFilter } from '../../../actions/Listing/onChangeListing';
import { graphql, gql, compose } from 'react-apollo';
import bt from '../../../components/commonStyle.css';
import { closeFilterModal } from "../../../actions/modalActions";

class FilterListing extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        type: PropTypes.string.isRequired,
        searchKey: PropTypes.string.isRequired,
        listId: PropTypes.string.isRequired,
        currentPage: PropTypes.number.isRequired,
        orderBy: PropTypes.string.isRequired,
        setStateVariable: PropTypes.func,
        refetch: PropTypes.any.isRequired,
        formatMessage: PropTypes.any,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            ManageListings: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired
            }))
        }),
    };

    constructor(props) {
        super(props);
        this.state = {
            smallDevice: false,
            listId: null,
            orderBy: null
        };

    }

    componentDidMount() {
        const { listId, orderBy } = this.props;
        let isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
            this.handleResize();
            window.addEventListener('resize', this.handleResize);
        }
        this.setState({ listId: listId ? listId : '0', orderBy: orderBy ? orderBy : 'ASC' })
    }

    componentWillUnmount() {
        let isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
            window.removeEventListener('resize', this.handleResize);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { listId, orderBy } = nextProps;
        this.setState({ listId: listId ? listId : '0', orderBy: orderBy ? orderBy : 'ASC' })
    }

    handleResize = (e) => {
        let isBrowser = typeof window !== 'undefined';
        let smallDevice = isBrowser ? window.matchMedia('(max-width: 767px)').matches : true;
        this.setState({
            smallDevice,
        });
    }

    handleChange = async (e) => {
        const { startDate, endDate, listId, orderBy, onChangeListingFilter, type } = this.props;
        if (e.target.name == 'listId') {
            onChangeListingFilter({ orderBy, startDate, endDate, listId: e.target.value == "0" ? null : e.target.value });
        } else {
            onChangeListingFilter({ orderBy: e.target.value == "ASC" ? null : e.target.value, startDate, endDate, listId });
        }
    }

    handleSubmit = async () => {
        const { closeFilterModal, refetch, setStateVariable } = this.props;
        const { startDate, endDate, listId, orderBy } = this.props;
        let variables = { startDate, endDate, listId, orderBy, currentPage: 1 };
        setStateVariable(variables);
        await closeFilterModal();
        await refetch(variables);
    }

    handleClear = async () => {
        const { onChangeListingFilter } = this.props;
        let variables = { orderBy: null, startDate: null, endDate: null, listId: null };
        await onChangeListingFilter(variables);
    }

    render() {
        const { data: { loading, ManageListingTransaction }, type, startDate, endDate } = this.props;
        const { listId, orderBy } = this.state;
        const { smallDevice } = this.state;
        const { formatMessage } = this.props.intl;

        return (
            <div>
                <div>
                    <div className={cx(bt.spaceBottom3, 'filterModalDatePicker')}>
                        <h3 className={cx(s.fieldTitle, bt.commonContentText, bt.fontWeightMedium)}><FormattedMessage {...messages.filterByDate} /></h3>
                        <DateRange
                            startDate={startDate}
                            endDate={endDate}
                            listId={listId}
                            orderBy={orderBy}
                            smallDevice={smallDevice}
                            type={type}
                        />
                    </div>
                    <div className={bt.spaceBottom3}>
                        <h3 className={cx(s.fieldTitle, bt.commonContentText, bt.fontWeightMedium)}><FormattedMessage {...messages.filterByCar} /></h3>
                        <FormControl componentClass="select" name='listId' className={cx(s.selectField, 'modalFilterSelectFieldRTL')} onChange={this.handleChange} value={listId}>
                            <option value="0">{formatMessage(messages.allCars)}</option>
                            {
                                !loading && ManageListingTransaction && ManageListingTransaction.map((item, index) => {
                                    return (
                                        <option value={item.id} key={index}>{item.title}</option>
                                    )
                                })

                            }
                        </FormControl>
                    </div>
                    <div className={bt.spaceBottom3}>
                        <h3 className={cx(s.fieldTitle, bt.commonContentText, bt.fontWeightMedium)}><FormattedMessage {...messages.sortByoder} /></h3>
                        <FormControl componentClass="select" name='orderBy' className={cx(s.selectField, 'modalFilterSelectFieldRTL')} onChange={this.handleChange} value={orderBy}>
                            <option value="ASC">{formatMessage(messages.sortByNewest)}</option>
                            <option value="DESC">{formatMessage(messages.sortByOldest)}</option>
                        </FormControl>
                    </div>
                    <div className={cx(s.alignRight, bt.spaceTop4, 'textAlignLeftRTL')}>
                        <Button className={cx(bt.btnPrimaryBorder, bt.commonMediumText, bt.fontWeightMedium, s.buttonStyle, s.clearBtnSpaceRight, 'modalcancelBtnRTL')} onClick={() => this.handleClear()}> {formatMessage(messages.clear)}</Button>
                        <Button className={cx(bt.btnPrimary, bt.commonMediumText, bt.fontWeightMedium, s.buttonStyle)} onClick={() => this.handleSubmit()}>
                            <FormattedMessage {...messages.apply} />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapState = (state) => ({
    listId: state.onChangeListing?.listId,
    orderBy: state.onChangeListing?.orderBy,
    startDate: state.onChangeListing?.startDate,
    endDate: state.onChangeListing?.endDate,
})

const mapDispatch = {
    onChangeListingFilter,
    closeFilterModal
}
export default compose(
    injectIntl,
    withStyles(s, bt),
    (connect(mapState, mapDispatch)),
    graphql(gql`
     {
         ManageListingTransaction{
            id
            title
            isReady
        }
    }
     ` , {
        options: {
            ssr: false
        }
    })
)(FilterListing);