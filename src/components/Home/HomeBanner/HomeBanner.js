import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose, gql } from 'react-apollo';
import { injectIntl } from 'react-intl';
//Components
import HomeBannerContent from './HomeBannerContent';
import SliderAnimation from '../SliderAnimation';
import Layout4 from '../Layout4/Layout4';

class HomeBanner extends React.Component {

  static propTypes = {
    getImageBannerData: PropTypes.shape({
      loading: PropTypes.bool,
      getImageBanner: PropTypes.object
    }),
  };

  static defaultProps = {
    getImageBannerData: {
      loading: true
    },
  }

  render() {
    const { layoutType, wholeData, getBannerData } = this.props;
    let infoCollection = {}, title, content, bannerImage;
    if (wholeData) {
      title = wholeData.title;
      content = wholeData.content;
      wholeData?.getFindYouCar.map((item, key) => {
        infoCollection[item.name] = item.value
      });
      bannerImage = '/images/home/' + wholeData.getBanner.image;
    }
    return (
      <>
        {layoutType && (layoutType == 1 || layoutType == 3) && <SliderAnimation layoutType={layoutType} data={getBannerData} />}
        {
          layoutType && layoutType == 4 &&
          <Layout4 title={title} content={content} bannerImage={bannerImage} />
        }
        <HomeBannerContent layoutType={layoutType} wholeData={wholeData} infoCollection={infoCollection} getBannerData={getBannerData} />
      </>
    )
  }
}

export default compose(
  injectIntl,
  graphql(gql`
        query getBanner{
          getBanner {
            id
            title
            content
            image
          }
        }
      `, {
    name: 'getBannerData',
    options: {
      ssr: false
    }
  }),
)(HomeBanner);
