import React, { Component } from 'react';
import useSheet from 'react-jss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/SiteHeader';
import Snippets from '../components/Snippets';
import Snackbar from 'material-ui/lib/snackbar';

import { requestSnippets } from '../actions/snippets';
import { putConfigs } from '../actions/configs';
import { requestComments } from '../actions/comments';
import { reloadFromLocalStorage } from '../actions/auth';



export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    // es6 does not autobind this
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }


  componentDidMount() {
    if(!this.props.configs.isFirstLoad) {
      console.log('IS FIRST LOAD');
      this.props.putConfigs({isFirstLoad: true});
      this.props.requestSnippets();
      this.props.requestComments();
      // TODO: rename to reloadAUTH...
      this.props.reloadFromLocalStorage();
      console.log(this.props.requestComments);
    } else {
      console.log('IS NOT FIRST LOAD');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.configs.loggedInStateChanged) {
      this.props.putConfigs({loggedInStateChanged: false});
      this.setState({
        open: true,
      });
    }
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { sheet } = this.props;

    return (
      <div className={sheet.classes.index}>
        <Header showSortOptions={true} />
        <Snippets />
        <Snackbar
          open={ this.state.open }
          message={ this.props.configs.loggedInStateChangedMsg }
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

const STYLES = {
  index: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
};

function mapStateToProps(state) {
  return {
    configs: state.configs
  };
}

function mapDispatchToProps(dispatch) {
  // http://stackoverflow.com/questions/34458261/how-to-get-simple-dispatch-from-this-props-using-connect-w-redux
  return {
    ...bindActionCreators({ requestSnippets, putConfigs, requestComments, reloadFromLocalStorage }, dispatch),
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  useSheet(Index, STYLES)
);
