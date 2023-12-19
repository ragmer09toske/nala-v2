import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Loader.css';

// Component
import MDSpinner from 'react-md-spinner';

class ButtonLoader extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    handleClick: PropTypes.any,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    spinnerColor: PropTypes.string,
  };

  static defaultProps = {
    label: 'Submit',
    show: false,
    type: 'button',
    spinnerColor: '#fff'
  };

  render() {
    const { label, show, type, handleClick, className, disabled, spinnerColor, image, tickIcon, tickIconStyle } = this.props;
    let isDisabled = false;
    if (show || disabled) {
      isDisabled = true;
    }
    return (
      <Button
        className={className}
        disabled={isDisabled}
        type={type}
        onClick={handleClick}
      >
        {
          show && <MDSpinner
            singleColor={spinnerColor}
            size={18}
          />
        }
        {tickIcon && <img src={tickIcon} className={tickIconStyle} />}
        &nbsp;{label}&nbsp;
        {image && <img src={image} className={cx(s.imgCss, 'loginArrowRTL')} />}
      </Button>
    );
  }
}

export default withStyles(s)(ButtonLoader);