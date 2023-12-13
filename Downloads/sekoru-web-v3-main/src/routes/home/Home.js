import React from 'react';
import { graphql, compose, gql } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import l from '../../components/Skeleton/Skeleton.css'
import { injectIntl } from 'react-intl';

//Components

import Loader from '../../components/Loader';
import RecommendListing from '../../components/Home/RecommendListing';
import MostViewedListing from '../../components/Home/MostViewedListing';
import PopularLocation from '../../components/Home/PopularLocation';
import ImageBanner from '../../components/Home/ImageBanner';
import StaticInfoBlock from '../../components/Home/StaticInfoBlock';
import HomeBanner from '../../components/Home/HomeBanner';
import { connect } from 'react-redux';

// redux - action 
import { closeWishListModal } from '../../actions/WishList/modalActions';

// Skeleton Loader
class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      popularSkeletonArray: [1, 2, 3, 4, 5, 6],
      sliderArray: [1, 2, 3, 4]
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoad: false });
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillUnmount() {
    const { closeWishListModal } = this.props;
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('resize', this.handleResize);
    }
    closeWishListModal();
  }

  handleResize(e) {
    let isBrowser = typeof window !== 'undefined';
    let tabView = isBrowser ? window.matchMedia('(max-width: 1200px)').matches : false;
    this.setState({
      popularSkeletonArray: tabView ? [1, 2, 3] : [1, 2, 3, 4, 5, 6],
      sliderArray: tabView ? [1, 2, 3] : [1, 2, 3, 4],
    });
  }

  render() {
    const { layoutType } = this.props;
    const { wholeData } = this.props;
    if (!wholeData) return <Loader type="text" />;
    return (
      <div className={s.root}>
        <HomeBanner layoutType={layoutType} wholeData={wholeData} />
        <RecommendListing sekeletonArray={this.state.sliderArray} />
        <MostViewedListing sekeletonArray={this.state.sliderArray} />
        <PopularLocation sekeletonArray={this.state.popularSkeletonArray} />
        <ImageBanner />
        <StaticInfoBlock />
      </div>
    );
  }
}
const mapState = (state) => ({

});

const mapDispatch = {
  closeWishListModal
};

export default compose(
  injectIntl,
  withStyles(s, l),
  connect(mapState, mapDispatch)
)(Homepage);
