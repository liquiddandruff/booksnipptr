import React, { Component } from 'react';
import useSheet from 'react-jss';
import { connect } from 'react-redux';

import Header from '../components/SiteHeader';
import Kittens from '../components/Kittens';
import Register from '../components/Register';

import { requestKittens } from '../actions/kittens';


export default class RegisterPage extends Component {
  componentDidMount() {
    this.props.requestKittens();
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

export default connect(
  () => ({}),
  { requestKittens }
)(
  useSheet(Register, STYLES)
);