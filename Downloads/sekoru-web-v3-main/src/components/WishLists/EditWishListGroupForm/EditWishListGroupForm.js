// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Redux Form
import { Field, reduxForm, reset, formValueSelector } from 'redux-form';
import validate from './validate';

// Translation
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

import { toastr } from 'react-redux-toastr';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './EditWishListGroupForm.css';
import cs from '../../../components/commonStyle.css';
import {
  Button,
  FormGroup,
  FormControl
} from 'react-bootstrap';

import { graphql, gql, compose } from 'react-apollo';

import { closeWishListGroupModal } from '../../../actions/WishList/modalActions';

// GraphQL
import getWishListGroupQuery from '../EditWishListGroup/getWishListGroup.graphql';

class EditWishListGroupForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
    formatMessage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      fieldType: null,
      wishListLabel: null,
      wishListSuccessLabel: null,
      wishListErrorLabel: null,
      isDisabled: true,
    }
    this.submitForm = this.submitForm.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { fieldType } = this.props;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
  }

  componentDidMount() {
    const { fieldType, valid } = this.props;
    const { formatMessage } = this.props.intl;
    const { wishListLabel } = this.state;

    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
    if (wishListLabel == null) {
      this.setState({
        wishListLabel: formatMessage(messages.wishList),
        wishListSuccessLabel: formatMessage(messages.wishListUpdated),
        wishListErrorLabel: formatMessage(messages.somethingWentWrong),
      });
    }
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { fieldType, valid, wishListFormName } = nextProps;
    const { formatMessage } = this.props.intl;
    const { wishListLabel } = this.state;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
    if (wishListLabel == null) {
      this.setState({
        wishListLabel: formatMessage(messages.wishList),
        wishListSuccessLabel: formatMessage(messages.wishListUpdated),
        wishListErrorLabel: formatMessage(messages.somethingWentWrong),
      });
    }
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }


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
    const { mutate, profileId, userId, closeModal } = this.props;
    const { wishListLabel, wishListSuccessLabel, wishListErrorLabel } = this.state;

    if (values.userId == userId) {
      const { data } = await mutate({
        variables: values,
        refetchQueries: [{
          query: getWishListGroupQuery,
          variables: {
            profileId,
            id: values.id
          }
        }]
      });

      if (data && data.UpdateWishListGroup) {
        if (data.UpdateWishListGroup.status === 'success') {
          dispatch(reset('EditWishListGroupForm'));
          closeModal();
          toastr.success(wishListLabel, wishListSuccessLabel);
        } else {
          toastr.error(wishListLabel, wishListErrorLabel);
        }
      }
    } else {
      toastr.error(wishListLabel, wishListErrorLabel);
      return;
    }
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues, closeModal } = this.props;
    const { formatMessage } = this.props.intl;
    const { fieldType, isDisabled } = this.state;

    return (
      <div className={'inputFocusColor'}>
        <form onSubmit={handleSubmit(this.submitForm)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <Field
            name="name"
            type="text"
            component={this.renderFormControl}
            label={formatMessage(messages.editWishList)}
            placeholder={formatMessage(messages.name)}
            className={cx(cs.formControlInput)}
          />
          <div className={cx(cs.textAlignRight, 'textAlignLeftRTL')}>
            <Button className={cx(cs.btnPrimaryBorder, s.mobileBtn)}  onClick={()=>closeModal()}>
              {formatMessage(messages.cancel)}
            </Button>
            <Button className={cx(cs.btnPrimary, s.marginLeft, 'createBtnRTL', s.mobileBtn, 'wishPopupBtnRTL')} type="submit">
              {formatMessage(messages.save)}
            </Button>
          </div>
        </form>
      </div>
    )
  }

}

EditWishListGroupForm = reduxForm({
  form: "EditWishListGroupForm", // a unique name for this form
  validate,
})(EditWishListGroupForm);

const selector = formValueSelector('EditWishListGroupForm');

const mapState = (state) => ({
  profileId: state.account.data.profileId,
  userId: state.account.data.userId,
  wishListFormName: selector(state, 'name'),
});

const mapDispatch = {
  closeWishListGroupModal
};

export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation UpdateWishListGroup(
        $name: String!,
        $isPublic: Int,
        $id: Int!
    ){
        UpdateWishListGroup(
            name: $name,
            isPublic: $isPublic,
            id: $id
        ) {
            status
        }
    }
  `)
)(EditWishListGroupForm);