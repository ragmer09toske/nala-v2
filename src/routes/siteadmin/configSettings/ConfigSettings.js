import React from "react";
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
//Styles
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from './ConfigSettings.css';
//components
import ConfigSettingsForm from '../../../components/siteadmin/ConfigSettingsForm'
import Loader from '../../../components/Loader/Loader';

class ConfigSettings extends React.Component {

    static PropTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            siteSettings: PropTypes.array,
        })
    }

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {
        const settingsCollection = {};
        const { data, data: { loading, siteSettings }, title } = this.props;
        if (loading) {
            return <Loader type={"text"} />;
        } else {
            siteSettings.map((item, key) => {
                settingsCollection[item.name] = item.value;
            });
            return <ConfigSettingsForm initialValues={settingsCollection} />
        }
    }

}

export default compose(
    withStyles(s),
    graphql(gql`
{
  siteSettings {
    name
    value
  }
}
`, {
        options: (props) => ({
            variables: {
                name: 'config_settings',
            },
            fetchPolicy: 'network-only'
        })
    }

    ),
)(ConfigSettings);





