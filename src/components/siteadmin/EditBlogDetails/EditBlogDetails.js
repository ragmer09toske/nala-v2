import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditBlogDetails.css';
import cp from '../../../components/commonStyle.css';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import submit from './submit';
import validate from './validate';

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
class EditBlogDetails extends React.Component {

  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
    }
    this.state = { editorHtml: '' } // You can also pass a Quill Delta here
    this.handlePageTitle = this.handlePageTitle.bind(this);

  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
  };

  static defaultProps = {
    data: []
  };

  async handlePageTitle(e) {
    const { change } = this.props;
    if (e.target.value) {
      await change('pageUrl', formatURL(e.target.value));
    } else {
      await change('pageUrl', '');
    }
  }


  renderQuill = ({ input, label, type, meta: { touched, error }, className }) => {
    const ReactQuill = this.ReactQuill;
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
    const { parentData } = this.props;
    const ReactQuill = this.ReactQuill;
    const { formatMessage } = this.props.intl;
    const gobackcss = { padding: '10px' };
    if (typeof window !== 'undefined' && ReactQuill) {
      return (
        <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
          <div className={cx(cp.adminContentPadding)}>
            <div className={s.sectionCenter}>
              <div className={cx(cp.textAlignRight, cp.mobileDisplayBlock, 'textAlignLeftRTL', cp.spaceBottom4)}>
                <Link to={"/siteadmin/content-management"} className={cx(cp.siteLinkColor, cp.commonContentText, cp.fontWeightMedium, cp.commomLinkborderBottom, cp.textDecorationNone)}>
                  <FormattedMessage {...messages.goBack} />
                </Link>
              </div>
              <div className={cp.commonAdminBorderSection}>
                <h1 className={s.headerTitle}> <FormattedMessage {...messages.editPageDetails} /></h1>
                <form onSubmit={handleSubmit(submit)}>
                  {error && <strong>{formatMessage(error)}</strong>}
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cp.labelTextNew}>
                      <FormattedMessage {...messages.metaTitleLabel} />
                    </ControlLabel>
                    <Field name="metaTitle" type="text" component={CommonFormComponent} label={formatMessage(messages.metaTitleLabel)} inputClass={cx(cp.formControlInput)} />
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cp.labelTextNew}>
                      <FormattedMessage {...messages.metaDescriptionLabel} />
                    </ControlLabel>
                    <Field name="metaDescription" componentClass={'textarea'} className={s.textareaInput} component={CommonFormComponent} label={formatMessage(messages.metaDescriptionLabel)} />
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cp.labelTextNew}>
                      <FormattedMessage {...messages.pageTitleLabel} />
                    </ControlLabel>
                    <Field name="pageTitle" type="text" component={CommonFormComponent} label={formatMessage(messages.pageTitleLabel)} onChange={(event) => this.handlePageTitle(event)} inputClass={cx(cp.formControlInput)} />
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cp.labelTextNew}>
                      <FormattedMessage {...messages.pageUrl} />
                    </ControlLabel>
                    <Field name="pageUrl" type="text" component={CommonFormComponent} isAddon={true} suffixLabel={`${url}${formatMessage(messages.pageLabel)}`} label={formatMessage(messages.pageUrl)} inputClass={cx(cp.formControlInput, s.addonInputRadius)} />
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <ControlLabel className={cp.labelTextNew}>
                      <FormattedMessage {...messages.footerCategoryLabel} />
                    </ControlLabel>
                    <Field name="footerCategory" className={s.formControlSelect} component={CommonFormComponent} label={formatMessage(messages.footerCategoryLabel)} inputClass={cp.formControlSelect}>
                      <option value="">{formatMessage(messages.ChooseFooterCategory)}</option>
                      <option value={siteName}>{siteName}</option>
                      <option value="discover">{formatMessage(messages.discover)}</option>
                      <option value="hosting">{formatMessage(messages.hosting)}</option>
                    </Field>
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.contentLabel} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field name="content" component={this.renderQuill} />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className={s.noMargin}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
                        <Button bsSize="small" className={cx(cp.btnPrimary, cp.btnlarge)} type="submit" disabled={submitting} ><FormattedMessage {...messages.save} /></Button>
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

EditBlogDetails = reduxForm({
  form: 'BlogDetails', // a unique name for this form
  validate
})(EditBlogDetails);


const blogFormSelector = formValueSelector('BlogDetails');

const mapState = (state) => ({
  pageTitle: blogFormSelector(state, 'pageTitle'),
  parentPage: blogFormSelector(state, 'parentPage'),
  siteName: state.siteSettings.data.siteName,
});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(EditBlogDetails)));