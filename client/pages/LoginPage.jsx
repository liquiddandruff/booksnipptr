import React, { Component } from 'react';
import useSheet from 'react-jss';
import { connect } from 'react-redux';

import { putConfigs } from '../actions/configs';

import Header from '../components/SiteHeader';
import Login from '../components/Login';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    console.log("extprops", nextProps);
    // if wasn't previously logged in and is now logged in, redirect to home
    if(!this.props.auth.logged_in && nextProps.auth.logged_in) {
      this.props.putConfigs({
        loggedInStateChanged: true,
        loggedInStateChangedMsg: 'You have logged in'
      });
      this.context.router.push('/');
    }
  }

  render() {
    const { sheet } = this.props;

    return (
      <div className={sheet.classes.login}>
        <Header />
        <Login />
      </div>
    );
  }
}

LoginPage.contextTypes = {
  router: React.PropTypes.object
};

const STYLES = {
  login: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
};


export default connect(
  state => ({ auth: state.auth }),
  { putConfigs }
)(
  useSheet(LoginPage, STYLES)
);
