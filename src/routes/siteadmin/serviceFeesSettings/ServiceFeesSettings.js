import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ServiceFeesSettings.css';

// Component
import ServiceFeesForm from '../../../components/siteadmin/ServiceFeesForm';
import Loader from '../../../components/Loader';

class ServiceFeesSettings extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getServiceFees: PropTypes.shape({
        guestType: PropTypes.string.isRequired,
        guestValue: PropTypes.number.isRequired,
        hostType: PropTypes.string.isRequired,
        hostValue: PropTypes.number.isRequired,
        currency: PropTypes.string
      }),
    })
  };


  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const isBrowser = typeof window !== 'undefined';
    isBrowser && this.setState({
      loading: false
    });
  }


  render() {
    const { data: { getServiceFees }, title } = this.props;
    if (this.state.loading) {
      return <Loader type={"text"} />;
    } else {
      return <ServiceFeesForm initialValues={getServiceFees} title={title} />
    }
  }

}

export default compose(
  withStyles(s),
  graphql(gql`
        query getServiceFees{
          getServiceFees{
              id
              guestType
              guestValue
              hostType
              hostValue
              currency
              status
          }
        }
      `),
)(ServiceFeesSettings);
