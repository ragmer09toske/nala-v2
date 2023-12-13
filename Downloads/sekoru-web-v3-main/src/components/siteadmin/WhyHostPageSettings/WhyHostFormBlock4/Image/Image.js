import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Image.css';
import cp from '../../../../../components/commonStyle.css';
import { formValueSelector, change } from 'redux-form';

import { connect } from 'react-redux';
import DropZone from './DropZone';
import Loader from '../../../../Loader/Loader';

// Asset
import defaultPic from '../../../../../../public/AdminIcons/default.svg';
import DeleteIcon from '../../../../../../public/AdminIcons/dlt.png';

class Image extends React.Component {

  static defaultProps = {
    loader: false
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(e) {
    const { change } = this.props;
    await change('WhyHostForm', 'workImage1', null);
  }

  render() {
    const { loader, image } = this.props;

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Loader show={loader} type={"page"}>
            <div className={cp.picContainerMain}>
              <div className={cp.picContainer}>
                {
                  image && <div
                    style={{ backgroundImage: `url(/images/home/${image})` }}
                    className={s.bannerImageBg}
                  />
                }
                {
                  !image && <div
                    style={{ backgroundImage: `url(${defaultPic})` }}
                    className={cp.profileImageBg}
                  />
                }
                {
                  image && <a href="javascript:void(0);" onClick={() => this.handleChange()}
                  className={cx(cp.trashIconNew, 'trashIconRTL')}>
                    <img src={DeleteIcon} />
                  </a>
                }
              </div>
            </div>
          </Loader>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.fullWidth, cp.btnPrimaryBorder, cp.btnlarge, s.noPadding, 'adminUploader')}>
            <DropZone />
          </Col>
        </Col>
      </Row>
    );
  }
}
const selector = formValueSelector('WhyHostForm');

const mapState = (state) => ({
  loader: state.image.loader,
  image: selector(state, 'workImage1')
});

const mapDispatch = {
  change
};

export default compose(withStyles(s, cp), connect(mapState, mapDispatch))(Image);