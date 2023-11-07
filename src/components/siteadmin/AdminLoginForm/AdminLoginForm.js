import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

import {
  Button,
  FormGroup,
  Grid,
  Row,
  ControlLabel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminLoginForm.css';
import cs from '../../../components/commonStyle.css';

//Translations
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';
import Link from '../../Link';

//Images
import adminLoginImage from '/public/siteImages/siteLoginImage.svg';
import AdminLogo from '/public/AdminIcons/RentALL-logo.png';
import arrowIcon from '/public/SiteIcons/letGoIcon.svg';
import goIcon from '/public/SiteIcons/goSiteIcon.svg';
import languageIcon from '/public/SiteIcons/languageChangeIcon.svg';

//common fields
import CommonFormComponent from '../../CommonField/CommonFormComponent';
import HeaderModal from '../../HeaderModal/HeaderModal';
import { openHeaderModal } from '../../../actions/modalActions';
import { formatLocale } from '../../../helpers/formatLocale';


class AdminLoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true
    }
  }

  componentDidMount() {
    const isBrowser = typeof window !== 'undefined';
    isBrowser && this.setState({
      isDisabled: false
    });
  }


  render() {
    const { error, handleSubmit, submitting, dispatch, siteSettingsData, currentLocale, openHeaderModal } = this.props;
    const { formatMessage } = this.props.intl;
    const title = (
      <h2>{formatMessage(messages.adminlogInLabel)}</h2>
    );
    let adminLogo = siteSettingsData && siteSettingsData.Logo && `/images/logo/${siteSettingsData.Logo}`;

    return (
      <div className={cx('loginpage', 'adminstyle')}>
        <HeaderModal />
        <Grid fluid>
          <Row>
            <div className={s.loginMainBg}>
              <div className={s.bgColor}><div className={s.loginBg} style={{ backgroundImage: `url(${adminLoginImage})` }} /></div>
              <div className={s.formSection}>
                <div className={cx(cs.dFlexWrapAlignEnd, s.topPadding, s.mobileWrap)}>
                  <Link to="/" className={cx(cs.dFlex, s.twoPadding)}>
                    <img src={goIcon} className={'iconGap'} />
                    <span className={cx(cs.commonContentText, cs.fontWeightMedium, cs.reviewHeadingColor)}><FormattedMessage {...messages.GotoMainSite} /></span>
                  </Link>
                  <Link>
                    <div onClick={(e) => openHeaderModal('languageModal')} className={cs.dFlex}>
                      <img src={languageIcon} className={'iconGap'} />
                      <span className={cx(cs.commonContentText, cs.fontWeightMedium, cs.reviewHeadingColor)}>
                        {formatLocale(currentLocale)}
                      </span>
                    </div>
                  </Link>
                </div>
                <div className={s.formInner}>
                  <div className={s.loginTitleScetion}>
                    {
                      adminLogo ?
                        <img src={adminLogo} />
                        :
                        <div className={s.siteNameCss}>{siteSettingsData.siteName}</div>
                    }
                    <p className={s.loginTitle}>{formatMessage(messages.welcomeAdminLabel)}</p>
                  </div>
                  <form onSubmit={handleSubmit(submit)}>
                    {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                    <ControlLabel className={cx(s.labelTextNew, s.loginLabel)}>
                      <FormattedMessage {...messages.emailLabel} />
                    </ControlLabel>
                    <FormGroup className={s.space4}>
                      <Field
                        name="email"
                        type="text"
                        component={CommonFormComponent}
                        inputClass={cx(cs.formControlInput, s.loginInput)}
                        label={formatMessage(messages.enterTheEmailAddress)}
                      />
                    </FormGroup>
                    <ControlLabel className={cx(s.labelTextNew, s.loginLabel)}>
                      <FormattedMessage {...messages.password} />
                    </ControlLabel>
                    <FormGroup className={cs.noMargin}>
                      <Field
                        name="password"
                        type="password"
                        component={CommonFormComponent}
                        inputClass={cx(cs.formControlInput, s.loginInput)}
                        label={formatMessage(messages.enterYourPassword)}
                      />
                    </FormGroup>
                    <div className={cx(s.spaceTop5)}>
                      <Button className={cx(cs.btnPrimary, cs.fullWidth, s.loginbtn, cs.dInlineFlex, cs.justifyCenter)} type="submit" disabled={submitting || this.state.isDisabled}>
                        <FormattedMessage {...messages.logInLabel} />
                        <img src={arrowIcon} className={cx(s.arrowIconCss, 'sliderArrowRTL')} />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Row>
        </Grid>
      </div>
    )
  }

}
const mapState = (state) => ({
  siteSettingsData: state.siteSettings.data,
  currentLocale: state.intl.locale
});

const mapDispatch = {
  openHeaderModal
};

AdminLoginForm = reduxForm({
  form: 'AdminLoginForm', // a unique name for this form
  validate
})(AdminLoginForm);

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(AdminLoginForm)));