// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux Form
import { Field, reduxForm, reset, formValueSelector, change } from 'redux-form';

// Locale
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import getAllWishListGroupQuery from '../getAllWishListGroup.graphql';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
    Button,
    FormGroup,
    FormControl,
} from 'react-bootstrap';
import s from './CreateWishList.css';
import cs from '../../../components/commonStyle.css';
import cx from 'classnames';

import pluseIcon from '../../../../public/SiteIcons/plus.svg';
import validate from './validate';

class CreateWishList extends Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        listId: PropTypes.number,
        getListingData: PropTypes.shape({
            loading: PropTypes.bool,
            UserListing: PropTypes.object
        }),
    };

    constructor(props) {
        super(props);
        this.state = {
            shown: true,
            disabled: true,
        };
        this.toggle = this.toggle.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    toggle() {
        this.setState({
            shown: !this.state.shown
        });
        this.props.change('name', null);
    }


    renderFormControl = ({ input, label, type, meta: { touched, error }, className, placeholder }) => {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={cs.spaceBottom3}>
                <label>{label}</label>
                <FormControl {...input} placeholder={placeholder} type={type} className={className} maxLength={255} />
                {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
        );
    }

    async submitForm(values, dispatch) {
        const { mutate, profileId, wishListGroups, change, createWishListGroup, createWishList, listId } = this.props;
        if (values.name.trim() != '') {
            let updatedWishLists = wishListGroups;
            const { data } = await createWishListGroup({
                variables: values,
                /*refetchQueries: [{
                    query: getAllWishListGroupQuery,
                    variables: {
                        profileId
                    }
                }]*/
            });

            if (data && data.CreateWishListGroup) {
                if (data.CreateWishListGroup.status === 'success') {
                    this.setState({
                        shown: !this.state.shown
                    });
                    const { data: { CreateWishList } } = await createWishList({
                        variables: {
                            listId,
                            wishListGroupsId: data.CreateWishListGroup.id,
                            eventKey: true
                        },
                        refetchQueries: [{
                            query: getAllWishListGroupQuery,
                            variables: {
                                profileId
                            }
                        }]
                    });
                    await updatedWishLists.push(data.CreateWishListGroup.id);
                    await change('WishListModalForm', 'wishListGroups', updatedWishLists);
                    dispatch(reset('CreateWishList'));
                }
            }
        }
    }

    render() {
        const { error, handleSubmit, submitting, dispatch, listId } = this.props;
        const { formatMessage } = this.props.intl;
        const { disabled, shown } = this.state;

        return (
            <div className={'inputFocusColor'}>
                <form onSubmit={handleSubmit(this.submitForm)} autoComplete="off">
                    {
                        shown && <a onClick={this.toggle} className={cx(cs.siteLinkColor, cs.textDecorationNone,
                            cs.curserPointer, cs.fontWeightMedium, cs.dFlex)}>
                            <span className={s.plusIconSection}>
                                <img src={pluseIcon} className={s.plusIcon} />
                            </span>
                            <span className={s.createTextMargin}>
                                <FormattedMessage {...messages.createWishList} />
                            </span>
                        </a>
                    }
                    {
                        !shown && <>
                            <Field
                                name="name"
                                type="text"
                                label={formatMessage(messages.createWishList)}
                                component={this.renderFormControl}
                                placeholder={formatMessage(messages.name)}
                                className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
                            />
                            <div className={cx(cs.spaceTop3, cs.textAlignRight, 'textAlignLeftRTL')}>
                                <Button className={cx(cs.btnPrimaryBorder, s.btnPadding)}
                                    disabled={submitting}
                                    onClick={this.toggle}>
                                    {formatMessage(messages.cancel)}
                                </Button>
                                <Button className={cx(cs.btnPrimary, s.marginLeft, 'createBtnRTL', s.btnPadding)}
                                    type="submit"
                                >{formatMessage(messages.save)}
                                </Button>
                            </div>
                        </>
                    }
                </form>
            </div>
        )
    }
}

CreateWishList = reduxForm({
    form: 'CreateWishList', // a unique name for this form
    validate
})(CreateWishList);

const selector = formValueSelector('WishListModalForm');

const mapState = (state) => ({
    listId: state.modalStatus.listId,
    profileId: state.account.data.profileId,
    wishListGroups: selector(state, 'wishListGroups')
});

const mapDispatch = {
    change
};

export default compose(injectIntl,
    withStyles(s, cs),
    connect(mapState, mapDispatch),
    graphql(gql`
        mutation CreateWishListGroup(
        $name: String!,
        $isPublic: String,
        ){
            CreateWishListGroup(
            name: $name,
            isPublic: $isPublic
            ) {
                status
                id
            }
        }
    `, {
        name: 'createWishListGroup'
    }),
    graphql(gql`
        mutation CreateWishList(
            $listId: Int!,
            $wishListGroupsId:Int,
            $eventKey:Boolean,
        ){
            CreateWishList(
                listId: $listId,
                wishListGroupId: $wishListGroupsId,
                eventKey: $eventKey,
            ) {
                status
            }
        }
    `, {
        name: 'createWishList'
    })
)(CreateWishList);