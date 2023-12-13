import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Style
import cx from 'classnames';
import {
  Button,
  Row,
  FormGroup,
  Col,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FindYourVehicleForm.css';
import cs from '../../../components/commonStyle.css';
import Uploader from './Uploader/Uploader';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import { url } from '../../../config';
import CommonFormComponent from '../../CommonField/CommonFormComponent';

class FindYourVehicleForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      addMore: [],
      addMoreCount: 1
    };
    this.handleAddMore = this.handleAddMore.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    const { initialValues } = this.props;

    let list = [], num = 0
    const values = Object.keys(initialValues).map((item) => {
      if (item.startsWith('content') && initialValues[item] != '') {
        num = num + 1
        return list.push(`${num}`)
      }
    })
    if (list.length < 1) {
      this.setState({
        addMore: ["1"],
        addMoreCount: 1
      });
    } else {
      this.setState({
        addMore: list,
        addMoreCount: num
      });
    }

  }

  handleAddMore() {
    const { addMore, addMoreCount } = this.state;
    let count = addMoreCount + 1;
    let addMoreUpdate = addMore.concat(`${count}`);
    if (count < 6) {
      this.setState({
        addMore: addMoreUpdate,
        addMoreCount: count
      });
    }
  }

  async handleRemove() {
    const { change } = this.props;
    const { addMore, addMoreCount } = this.state;
    let addMoreUpdate = addMore.filter((item) => item != addMoreCount);
    let count = addMoreCount - 1;
    if (count >= 3) {
      this.setState({
        addMore: addMoreUpdate,
        addMoreCount: count
      });
      await change(`content${addMoreCount}`, null);
    }
  }


  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { formatMessage } = this.props.intl;
    const { addMore, addMoreCount } = this.state;
    return (
      <div className={cx(s.pagecontentWrapper, 'linkAddon')}>
        <div>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h1 className={s.headerTitle}><FormattedMessage {...messages.findYourCarInfo} /></h1>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <Row>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <div className={cx(s.siteContainer)}>
                      <label className={cs.labelTextNew} ><FormattedMessage {...messages.imageLabel} /></label>
                      <Uploader />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12} className={s.mobileTop}>
                    <label className={cx(cs.labelTextNew)}><FormattedMessage {...messages.headingLabel} /></label>
                    <Field
                      name="heading"
                      component={CommonFormComponent}
                      inputClass={cx(cs.formControlInput)}
                    />
                    <label className={cx(cs.labelTextNew, cs.spaceTop3)} ><FormattedMessage {...messages.buttonLabel} /></label>
                    <Field
                      name="buttonLabel"
                      component={CommonFormComponent}
                      inputClass={cx(cs.formControlInput)}
                    />
                    <label className={cx(cs.labelTextNew, cs.spaceTop3)} ><FormattedMessage {...messages.buttonLink} /></label>
                    <Field
                      name="buttonLink"
                      component={CommonFormComponent}
                      isAddon={true}
                      suffixLabel={url}
                      inputClass={cx(cs.formControlInput, s.addonInputRadius)}
                    />
                      <label className={cx(cs.labelTextNew, cs.spaceTop3)} ><FormattedMessage {...messages.contentLabel} />#1</label>
                    <Field
                      name="content1"
                      component={CommonFormComponent}
                      componentClass={'textarea'}
                    />
                    <label className={cx(cs.labelTextNew, cs.spaceTop3)} ><FormattedMessage {...messages.contentLabel} />#2</label>
                    <Field
                      name="content2"
                      component={CommonFormComponent}
                      componentClass={'textarea'}
                    />
                    <label className={cx(cs.labelTextNew, cs.spaceTop3)} ><FormattedMessage {...messages.contentLabel} />#3</label>

                    <Field
                      name="content3"
                      component={CommonFormComponent}
                      componentClass={'textarea'}
                    />

                    {
                      addMore.includes('4') && <>

                        <label className={cx(cs.labelTextNew, cs.spaceTop3)} ><FormattedMessage {...messages.contentLabel} />#4</label>

                        <Field
                          name="content4"
                          component={CommonFormComponent}
                          componentClass={'textarea'}
                        />
                      </>}

                    {
                      addMore.includes('5') && <>
                        <label className={cx(cs.labelTextNew, cs.spaceTop3)} ><FormattedMessage {...messages.contentLabel} />#5</label>
                        <Field
                          name="content5"
                          component={CommonFormComponent}
                          componentClass={'textarea'}
                        />
                      </>}

                    <div className={cs.dFlexWrapAlignEnd}>
                    {addMoreCount > 3 && <Button className={cx(cs.btnPrimaryBorder, cs.btnLarge, cs.nofocus, cs.spaceTop3, s.addLink, s.removeColor)} type="button" disabled={submitting} onClick={() => this.handleRemove()}>
                        <FormattedMessage {...messages.remove} />
                      </Button>}
                      {addMoreCount < 5 && <Button className={cx(cs.btnPrimary, cs.btnLarge, cs.spaceTop3, s.addLink)} type="button" disabled={submitting} onClick={() => this.handleAddMore()}>
                        <FormattedMessage {...messages.addLabel} />
                      </Button>}
                     
                    </div>
                  </Col>
                </Row>

                <FormGroup className={s.noMargin}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(cs.textAlignRight, 'textAlignLeftRTL', cs.spaceTop3)}>
                      <Button className={cx(cs.btnPrimary, cs.btnlarge)} type="submit" disabled={submitting}>
                        <FormattedMessage {...messages.save} />
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

FindYourVehicleForm = reduxForm({
  form: 'FindYourVehicleForm', // a unique name for this form
  validate
})(FindYourVehicleForm);

export default injectIntl(withStyles(s, cs)(FindYourVehicleForm));