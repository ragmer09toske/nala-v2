import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RedoSearch.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import cs from '../../commonStyle.css';

// Redux
import { connect } from 'react-redux';

// Redux form
import { change, formValueSelector } from 'redux-form';

// Locale
import messages from '../../../locale/messages';

// Components
import CustomCheckbox from '../../CustomCheckbox';

class RedoSearch extends Component {

    constructor(props){
        super(props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { searchByMap, change, isMapDrag } = this.props;
    }

    render () {
        const { searchByMap, change } = this.props;
        
        return (
            <div className={cx(s.redoContainer, 'redoContainerRTL')}>
               <div className={cx(s.redoContent)}>
                    <CustomCheckbox
                        className={'icheckbox_square-green'}
                        value={true}
                        checked={searchByMap}
                        onChange={event => {
                            change('SearchForm', 'searchByMap', event);
                            change('SearchForm', 'initialLoad', false);
                        }}
                    />
                    <small className={cx(s.redoText, 'redoTextRTL', cs.commonMediumText)}>
                        <FormattedMessage {...messages.searchAsIMove} />
                    </small>    
                </div>
            </div>
        );
    }
    

}

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
    searchByMap: selector(state, 'searchByMap')
});

const mapDispatch = {
    change
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(RedoSearch)));