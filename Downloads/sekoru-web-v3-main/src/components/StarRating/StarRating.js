import React from 'react';
import PropTypes from 'prop-types';

import StarRatingComponent from 'react-star-rating-component';
import * as FontAwesome from 'react-icons/lib/fa';
import { START_FILL_COLOR } from '../../constants/index';

class StarRating extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    change: PropTypes.any,
    editing: PropTypes.bool,
    value: PropTypes.number
  };

  static defaultProps = {
    editing: false,
    value: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    }
    this.onStarClick = this.onStarClick.bind(this);
  }

  onStarClick(nextValue, prevValue, name) {
    const { change } = this.props;
    this.setState({ rating: nextValue });
    change(nextValue);
  }

  render() {
    const { rating } = this.state;
    const { className, name, editing, value, starCount } = this.props;
    return (
      <div className={className}>
        <StarRatingComponent
          name={name}
          starCount={starCount ? starCount : 1}
          editing={editing}
          value={editing ? rating : value}
          starColor={START_FILL_COLOR}
          emptyStarColor={starCount ? "#B4B4B4" : START_FILL_COLOR}
          onStarClick={this.onStarClick}
          renderStarIcon={(index, value) => {
            return (
              <span>
                <FontAwesome.FaStar />
              </span>
            );
          }}
        />
      </div>
    );
  }
}

export default StarRating;


