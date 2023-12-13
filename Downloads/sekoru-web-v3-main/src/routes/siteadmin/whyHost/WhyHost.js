import React from 'react';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHost.css';

// Component
import WhyHostForm from '../../../components/siteadmin/WhyHostForm/WhyHostForm';
import Loader from '../../../components/Loader/Loader';
import getWhyHostData from './getWhyHostData.graphql';

class WhyHost extends React.Component {
  render() {
    const { getWhyHostData: { loading, getWhyHostData }, title } = this.props;
    let initialValues = {
      dataList: [{
        imageName: null,
        title: null,
        buttonLabel: null
      }]
    };

    if (getWhyHostData && getWhyHostData.dataList && getWhyHostData.dataList.length > 0) {
      initialValues = getWhyHostData
    }

    if (loading) {
      return <Loader type={"text"} />;
    } else {
      return !loading && <WhyHostForm title={title} initialValues={initialValues} />
    }
    
  }
}

export default compose(
  withStyles(s),
  graphql(getWhyHostData, {
    name: 'getWhyHostData',
    options: {
      fetchPolicy: 'network-only',
      ssr: false
    }
  })
)(WhyHost);
