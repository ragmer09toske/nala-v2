// General
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Translation
import { injectIntl } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button } from 'react-bootstrap';
import s from './IncrementButton.css';

//Image
import minusIcon from '/public/SiteIcons/incrementPlus.svg';
import plusIcon from '/public/SiteIcons/incrementMinus-sign.svg';

class IncrementButton extends React.Component {
  static propTypes = {
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    labelSingluar: PropTypes.string,
    labelPlural: PropTypes.string,
    incrementBy: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.any
  };

  increment = (value, maxValue, incrementBy) => {
    if (value < maxValue) {
      return (Number(value) + Number(incrementBy));
    }
  }

  decrement = (value, minValue, incrementBy) => {
    if (value > minValue) {
      return (Number(value) - Number(incrementBy));
    }
  }

  render() {

    const { input: { value, onChange }, maxValue, minValue, labelSingluar, labelPlural, incrementBy } = this.props;
    const { formatMessage } = this.props.intl;

    let label;
    if (value > 1) {
      label = labelPlural;
    } else {
      label = labelSingluar;
    }

    return (
      <div className={s.incrementDecrementButton}>
        <label className={cx(s.incrementDecrementText, 'floatRightRTL')}> {value} {label}</label>
        <Button className={cx(s.iconButton, 'floatRightRTL', 'iconButtonRTL')} onClick={() => onChange(this.decrement(value, minValue, incrementBy))}>
          <img src={plusIcon} />
        </Button>
        <Button className={cx(s.iconButton, 'floatRightRTL', 'iconButtonRTL')} onClick={() => onChange(this.increment(value, maxValue, incrementBy))}>
          <img src={minusIcon} />
        </Button>
      </div>
    )
  }
}

export default injectIntl(withStyles(s)(IncrementButton));
