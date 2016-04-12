import React, { Component } from 'react';
import useSheet from 'react-jss';
import { connect } from 'react-redux';

import Snackbar from 'material-ui/lib/snackbar';

import { putConfigs } from '../actions/configs';

import Header from '../components/SiteHeader';
import Register from '../components/Register';

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    
    // es6 does not autobind this
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if wasn't previously logged in and is now logged in, redirect to home
    if(this.props.auth && !this.props.auth.logged_in && nextProps.auth.logged_in) {
      this.props.putConfigs({
        loggedInStateChanged: true,
        loggedInStateChangedMsg: 'You have just logged in'
      });
      this.context.router.push('/');
    }
    if(nextProps.configs.snackbarOpen) {
      this.props.putConfigs({snackbarOpen: false});
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
      <div className={sheet.classes.register}>
        <Header />
        <Register />
        <Snackbar
          open={ this.state.open }
          message={ this.props.configs.snackbarMsg }
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

RegisterPage.contextTypes = {
  router: React.PropTypes.object
};

const STYLES = {
  register: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    color: '#660000'
  }
};

export default connect(
  state => ({ configs: state.configs, auth: state.auth }),
  { putConfigs }
)(
  useSheet(RegisterPage, STYLES)
);
