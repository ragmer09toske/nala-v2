import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddBlogDetails.css';
import cs from '../../../components/commonStyle.css';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { graphql, gql, compose } from 'react-apollo';
// Style
import {
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel
} from 'react-bootstrap';
import { url } from '../../../config.js';
import { formatURL } from '../../../helpers/formatURL';
import fetch from '../../../core/fetch';
import Link from '../../Link';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import CommonFormComponent from '../../CommonField/CommonFormComponent';

//Image
import arrowIcon from '/public/AdminIcons/backArrow.svg';

class AddBlogDetails extends React.Component {

  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill');
      this.Quill = require('quill');
    }
    this.state = { editorHtml: '' } // You can also pass a Quill Delta here
    this.handlePageTitle = this.handlePageTitle.bind(this);
  }


  async handlePageTitle(e) {
    const { change } = this.props;
    if (e.target.value) {
      await change('pageUrl', formatURL(e.target.value));
    } else {
      await change('pageUrl', '');
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
    })),
  };

  static defaultProps = {
    data: []
  };




  renderQuill = ({ input, label, type, meta: { touched, error }, className }) => {
    const ReactQuill = this.ReactQuill;
    const Quill = this.Quill;
    const { formatMessage } = this.props.intl;
    let modules = {
      toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        // ['link', 'image'],
      ],
      clipboard: {
        matchVisual: false,
      }
    };

    let formats = [
      'header', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link'
      // 'link', 'image'
    ];
    return (
      <div>
        <ReactQuill
          {...input}
          onChange={(newValue, delta, source) => {
            if (source === 'user') {
              input.onChange(newValue);
            }
          }}
          onBlur={(range, source, quill) => {
            if (quill.getHTML() == '<p><br></p>') {
              input.onBlur('');
            }
            else {
              input.onBlur(quill.getHTML());
            }

          }}
          placeholder="write something......."
          modules={modules}
          formats={formats}
          theme="snow"
        />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    );
  }


  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues, title, siteName } = this.props;
    const ReactQuill = this.ReactQuill;
    const Quill = this.Quill;
    const { formatMessage } = this.props.intl;
    const gobackcss = { padding: '10px' };
    if (typeof window !== 'undefined' && ReactQuill) {
      return (
        <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
          <div className={cx(cs.adminContentPadding)}>
            <div className={s.sectionCenter}>
              <div className={cx(cs.textAlignRight, cs.mobileDisplayBlock, 'textAlignLeftRTL', cs.spaceBottom4)}>
                <Link to={'/siteadmin/content-management'} className={cx(cs.siteLinkColor, cs.commonContentText, cs.fontWeightMedium, cs.commomLinkborderBottom, cs.textDecorationNone)}>
                  <img src={arrowIcon} className={cx(cs.backArrowStyle, 'adminGoBackArrowRTL')} />
                  <FormattedMessage {...messages.goBack} />
                </Link>
              </div>
              <div className={cs.commonAdminBorderSection}>
                <h1 className={s.headerTitle}><FormattedMessage {...messages.addPageDetails} /></h1>
                <form onSubmit={handleSubmit(submit)}>
                  {error && <strong>{formatMessage(error)}</strong>}
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cs.labelTextNew}>
                      <FormattedMessage {...messages.metaTitleLabel} />
                    </ControlLabel>
                    <Field name="metaTitle" type="text" component={CommonFormComponent} label={formatMessage(messages.metaTitleLabel)} inputClass={cx(cs.formControlInput)} />
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cs.labelTextNew}>
                      <FormattedMessage {...messages.metaDescriptionLabel} />
                    </ControlLabel>
                    <Field name="metaDescription" inputClass={s.textareaInput} componentClass={'textarea'} component={CommonFormComponent} label={formatMessage(messages.metaDescriptionLabel)} />
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cs.labelTextNew}>
                      <FormattedMessage {...messages.pageTitleLabel} />
                    </ControlLabel>
                    <Field name="pageTitle" type="text" component={CommonFormComponent} label={formatMessage(messages.pageTitleLabel)} onChange={(event) => this.handlePageTitle(event)} inputClass={cx(cs.formControlInput)} />
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cs.labelTextNew}>
                      <FormattedMessage {...messages.pageUrl} />
                    </ControlLabel>
                    <Field name="pageUrl" type="text" isAddon={true} component={CommonFormComponent} suffixLabel={`${url}${formatMessage(messages.pageLabel)}`} label={formatMessage(messages.pageUrl)} inputClass={cx(cs.formControlInput, s.addonInputRadius)} />
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cs.labelTextNew}>
                      <FormattedMessage {...messages.footerCategoryLabel} />
                    </ControlLabel>
                    <Field name="footerCategory" component={CommonFormComponent} inputClass={cx(cs.formControlSelect)} label={formatMessage(messages.footerCategoryLabel)}>
                      <option value="">{formatMessage(messages.ChooseFooterCategory)}</option>
                      <option value={siteName}>{siteName}</option>
                      <option value="discover">{formatMessage(messages.discover)}</option>
                      <option value="hosting">{formatMessage(messages.hosting)}</option>
                    </Field>
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cs.labelTextNew} ><FormattedMessage {...messages.contentLabel} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field name="content" component={this.renderQuill} />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className={s.noMargin}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className={cx(cs.textAlignRight, 'textAlignLeftRTL')}>
                        <Button className={cx(cs.btnPrimary, cs.btnlarge)} type="submit" disabled={submitting} ><FormattedMessage {...messages.save} /></Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <textarea />;
    }
  }

}

AddBlogDetails = reduxForm({
  form: 'BlogDetails', // a unique name for this form
  validate
})(AddBlogDetails);



const blogFormSelector = formValueSelector('BlogDetails');

const mapState = (state) => ({
  pageTitle: blogFormSelector(state, 'pageTitle'),
  pageURL: blogFormSelector(state, 'pageUrl'),
  siteName: state.siteSettings.data.siteName,
});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(AddBlogDetails)));