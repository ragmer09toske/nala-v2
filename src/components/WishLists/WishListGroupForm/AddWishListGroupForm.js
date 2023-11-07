// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Redux Form
import { Field, reduxForm, reset } from 'redux-form';
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
import s from './WishListGroupForm.css';
import cs from '../../../components/commonStyle.css';
import {
  Button,
  FormGroup,
  FormControl
} from 'react-bootstrap';

import { graphql, gql, compose } from 'react-apollo';

import { closeWishListGroupModal } from '../../../actions/WishList/modalActions';

// GraphQL
import getAllWishListGroupQuery from '../getAllWishListGroup.graphql';

class AddWishListGroupForm extends Component {

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
      isDisabled: true
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
    const { valid } = this.props;

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { fieldType, valid } = nextProps;
    const { formatMessage } = this.props.intl;
    const { wishListLabel } = this.state;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
    if (wishListLabel == null) {
      this.setState({
        wishListLabel: formatMessage(messages.wishList),
        wishListSuccessLabel: formatMessage(messages.wishListAdded),
        wishListErrorLabel: formatMessage(messages.somethingWentWrong)
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
    const { mutate, profileId, closeModal } = this.props;
    const { wishListLabel, wishListSuccessLabel, wishListErrorLabel } = this.state;

    const { data } = await mutate({
      variables: values,
      refetchQueries: [{
        query: getAllWishListGroupQuery,
        variables: {
          profileId
        }
      }]
    });
    if (data && data.CreateWishListGroup) {
      if (data.CreateWishListGroup.status === 'success') {
        dispatch(reset('AddWishListGroupForm'));
        closeModal()
        toastr.success(wishListLabel, wishListSuccessLabel);
      } else {
        toastr.error(wishListLabel, wishListErrorLabel);
      }
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
            label={formatMessage(messages.createWishList)}
            placeholder={formatMessage(messages.name)}
            className={cx(cs.formControlInput)}
          />
          <div className={cx(cs.textAlignRight, 'textAlignLeftRTL')}>
          <Button className={cs.btnPrimaryBorder}  onClick={()=>closeModal()}>
              {formatMessage(messages.cancel)}
            </Button>
            <Button className={cx(cs.btnPrimary, s.marginLeft, 'createBtnRTL')} type="submit" >
              {formatMessage(messages.save)}
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

AddWishListGroupForm = reduxForm({
  form: "AddWishListGroupForm", // a unique name for this form
  validate,
})(AddWishListGroupForm);

const mapState = (state) => ({
  profileId: state.account.data.profileId
});

const mapDispatch = {
  closeWishListGroupModal
};

export default compose(
  injectIntl,
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
        }
    }
  `)
)(AddWishListGroupForm);