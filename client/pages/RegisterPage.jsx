import React, { Component } from 'react';
import useSheet from 'react-jss';
import { connect } from 'react-redux';

import Header from '../components/SiteHeader';

import Register from '../components/Register';



export default class RegisterPage extends Component {
  componentDidMount() {
  }

  render() {
    const { sheet } = this.props;

    return (
      <div className={sheet.classes.register}>
        <Header />
        <Register />
      </div>
    );
  }
}

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

export default useSheet(RegisterPage, STYLES)
