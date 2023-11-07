import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import { graphql, gql, compose } from 'react-apollo';

// Redux
import { connect } from 'react-redux';

// Redux Action
import { doRecordListViews } from '../../../actions/recordListViews';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewCount.css';
import cs from '../../../components/commonStyle.css';
import cx from 'classnames';

// Locale
import messages from '../../../locale/messages';


class ViewCount extends Component {

    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            GetListViews: PropTypes.shape({
                count: PropTypes.number
            }),
        }),
        listId: PropTypes.number,
        isAuthenticated: PropTypes.bool,
        isHost: PropTypes.bool.isRequired,
        formatMessage: PropTypes.any,
    };

    static defaultProps = {
        data: {
            loading: true,
            GetListViews: {
                count: 0
            }
        },
        listId: null,
        isAuthenticated: false
    };

    componentDidMount() {
        const { listId, doRecordListViews, isAuthenticated, isHost } = this.props;
        if (listId != null && isAuthenticated && !isHost) {
            doRecordListViews(listId);
        }
    }

    render() {
        const { data: { loading, GetListViews } } = this.props;

        if (!loading) {
            return (
                <>
                    {
                        GetListViews != null && GetListViews.count > 0 && <div className={s.bookItMessage}>
                            <p className={cx(cs.commonSmallText, cs.paddingBottom1, cs.fontWeightBold, s.mobileTextSize)}>
                                <FormattedMessage {...messages.viewCountInfo} />
                            </p>
                            <p className={cs.commonSmallText}>
                                <FormattedMessage {...messages.viewCountTotal1} /> {GetListViews.count}{' '}{GetListViews.count > 1 ? <FormattedMessage {...messages.viewCountTotal2} /> : <FormattedMessage {...messages.viewCountTotal3} />}
                            </p>
                        </div>
                    }
                </>
            );
        } else {
            return (
                <div />
            )
        }
    }
}

const mapState = (state) => ({
    isAuthenticated: state.runtime.isAuthenticated
});

const mapDispatch = {
    doRecordListViews
};

export default compose(
    injectIntl,
    withStyles(s, cs),
    connect(mapState, mapDispatch),
    graphql(gql`
        query ($listId:Int!) {
            GetListViews (listId:$listId) {
                count
            }
        }
    `, {
        options: (props) => ({
            variables: {
                listId: props.listId,
            },
            ssr: false
        })
    }),
)(ViewCount);