import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostNew.css';
import { graphql, gql, compose } from 'react-apollo';
import Scroll from 'react-scroll'; // Imports all Mixins

import EarnBlock from '../../components/WhyHost/EarnBlock/EarnBlock';
import EasyHost from '../../components/WhyHost/EasyHost/EasyHost';
import Peace from '../../components/WhyHost/Peace/Peace';
import Works from '../../components/WhyHost/Works/Works';
import WhyHostBanner from './WhyHostBanner';
import WhyBlock from '../../components/WhyHost/WhyBlock';
import Loader from '../../components/Loader';
import SharingSection from '../../components/WhyHost/SharingSection/SharingSection';
import getWhyHostPageSettings from './getWhyHostPageSettings.graphql';
import getWhyHostReview from './getWhyHostReview.graphql';

let Link = Scroll.Link;
let Element = Scroll.Element;
let Events = Scroll.Events;
let scroll = Scroll.animateScroll;
let scrollSpy = Scroll.scrollSpy;

class EditProfile extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { data: { getWhyHostPage }, title } = this.props
    const { getWhyHostReview: { getHomeWhyHostReview } } = this.props;

    let settingsCollection = {}

    if (!getWhyHostPage || (getWhyHostPage?.length == 0)) {

      return <Loader type={"text"} />;

    } else {

      getWhyHostPage.map((item, key) => {
        settingsCollection[item.name] = item.value
      });

      return (
        <div className="whyhost-content">
          <WhyHostBanner data={settingsCollection} />
          <Element name="scrollSection" className="element">
            <EarnBlock data={settingsCollection} />
            <WhyBlock data={settingsCollection} />
            <EasyHost data={settingsCollection} />
            <Works data={settingsCollection} />
            {getHomeWhyHostReview && getHomeWhyHostReview.results && getHomeWhyHostReview.results.length > 0 && <Peace data={settingsCollection} reviewData={getHomeWhyHostReview.results} />}
            <SharingSection data={settingsCollection} />
          </Element>
        </div>
      );
    }

  }

}


export default compose(
  withStyles(s),
  graphql(getWhyHostPageSettings, {
    options: {
      fetchPolicy: 'network-only',
      ssr: true
    }
  }),
  graphql(getWhyHostReview, {
    name: "getWhyHostReview",
    options: {
      fetchPolicy: 'network-only',
      ssr: true
    }
  })
)(EditProfile);
