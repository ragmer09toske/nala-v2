import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
    Button,
    Col
} from 'react-bootstrap';
import s from '../ListPlaceStep1.css';
import cs from '../../commonStyle.css';
// Component
import ImportCalendar from './ImportCalendar';
import ExportCalendar from './ExportCalendar';
import CalendarsList from './CalendarsList';
import Loader from '../../Loader';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

//Image
import importIcon from '/public/SiteIcons/importIcon.svg';
import exportIcon from '/public/SiteIcons/exportIcon.svg'

class SyncCalendar extends Component {

    static propTypes = {
        listId: PropTypes.number.isRequired,
        loading: PropTypes.bool,
    };

    static defaultProps = {
        loading: false
    };

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showExport: false,
        };
        this.openImportModal = this.openImportModal.bind(this);
        this.closeImportModal = this.closeImportModal.bind(this);
        this.openExportModal = this.openExportModal.bind(this);
        this.closeExportModal = this.closeExportModal.bind(this);
    }

    openImportModal() {
        this.setState({ showModal: true });
    }

    closeImportModal() {
        this.setState({ showModal: false });
    }

    openExportModal() {
        this.setState({ showExport: true });
    }

    closeExportModal() {
        this.setState({ showExport: false });
    }

    render() {
        const { showModal, showExport } = this.state;
        const { listId, loading } = this.props;
        return (
            <div>
                <Loader
                    show={loading}
                    type={"page"}
                >
                    <ImportCalendar listId={listId} showModal={showModal} close={this.closeImportModal} />
                    <ExportCalendar
                        listId={listId}
                        showModal={showExport}
                        close={this.closeExportModal}
                    />
                    <CalendarsList />

                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space5, s.noPadding)}>
                        <ul className={cx(s.listType, 'splitListRTL')}>
                            <li className={s.space2}>
                                <Button className={s.btnContainer} onClick={this.openImportModal}>
                                    <div className={s.displayTable}>
                                        <div className={s.displayTableCellVertical}>
                                            <img src={importIcon} />
                                        </div>
                                        <div className={cx(s.paddingLeft, s.displayTableCellVertical, cs.siteLinkColor)}>
                                            <FormattedMessage {...messages.importCalendar} />
                                        </div>
                                    </div>
                                </Button>
                            </li>
                            <li>
                                <Button className={s.btnContainer} onClick={this.openExportModal}>
                                    <div className={s.displayTable}>
                                        <div className={s.displayTableCellVertical}>
                                            <img src={exportIcon} />
                                        </div>
                                        <div className={cx(s.paddingLeft, s.displayTableCellVertical, cs.siteLinkColor)}>
                                            <FormattedMessage {...messages.exportCalendar} />
                                        </div>
                                    </div>
                                </Button>
                            </li>
                        </ul>
                    </Col>
                </Loader>
            </div>
        );
    }
}

const mapState = (state) => ({
    loading: state.calendar.importCalLoading,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(SyncCalendar))); 