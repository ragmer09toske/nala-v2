import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Document.css';

// Query
import showAllDocumentQuery from './showAllDocumentQuery.graphql';

// Component
import DocumentVerification from '../../../components/siteadmin/DocumentVerification';
import Loader from '../../../components/Loader';

class Document extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getAllDocument: PropTypes.array,
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
    };
    this.setStateVariable = this.setStateVariable.bind(this);
  }

  static defaultProps = {
    data: {
      loading: true
    }
  };

 
  setStateVariable(variables) {
    this.setState(variables)
  }


  render() {
    const { data: { loading, showAllDocument, refetch }, title } = this.props;
    const { searchList, currentPage } = this.state;

    if (loading) {
      return <Loader type={"text"} />;
    } else {
      return <DocumentVerification showAllDocument={showAllDocument}  searchList={searchList} currentPage={currentPage}  refetch={refetch} setStateVariable={this.setStateVariable} title={title} />;
    }
  }

}

export default compose(
  withStyles(s),
  graphql(showAllDocumentQuery, {
    options: (props) => ({

      fetchPolicy: 'network-only'
    })
  }),
)(Document);




