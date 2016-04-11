import React, { Component } from 'react';
import useSheet from 'react-jss';
import { connect } from 'react-redux';

import Header from '../components/SiteHeader';

import Login from '../components/Login';


export default class LoginPage extends Component {
  componentDidMount() {
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


export default useSheet(LoginPage, STYLES)
