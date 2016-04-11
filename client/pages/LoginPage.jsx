import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import useSheet from 'react-jss';
import { connect } from 'react-redux';

import Header from '../components/SiteHeader';

import Login from '../components/Login';


export default class LoginPage extends Component {
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    console.log("extprops", nextProps);
    // if wasn't previously logged in and is now logged in, redirect to home
    if(!this.props.auth.logged_in && nextProps.auth.logged_in) {
      this.props.history.push('/');
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
  {}
)(
  useSheet(LoginPage, STYLES)
);
