import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import { registerUser } from '../actions/auth'
import { connect } from 'react-redux'
import useSheet from 'react-jss';

import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
  }

  handleSubmit = () => {
    console.log('Register Button Clicked');
    var formData = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue(),
      email: this.refs.email.getValue(),
    };
    console.log(formData);
  };
  
  render() {
    const { classes } = this.props.sheet;
    return (
      <div>
        <form action ='' onSubmit = {this.handleSubmit}>
          <TextField className = {classes.register} ref="username" floatingLabelText = "Username" hintText = "Enter Username"/>
          <br></br>
          <TextField className = {classes.register} ref="password" floatingLabelText = "Password" hintText = "Enter Password" type = "password"/>
          <br></br>
          <TextField className = {classes.register} ref="email" floatingLabelText = "E-mail Address" hintText = "Enter E-mail" type = "email"/>
          <br></br>
          <FlatButton className = {classes.register} label = "Register" secondary = {true} type = "submit"/>
        </form>
      </div>
    )
  }
}

const STYLES = {
  toolbar: {
    width: '100%'
  },
  register: {
  	right: 'auto',
  	top: '5em'
  },
  linkstyle: {
    color: '#282828',
    textDecoration : 'none'
  }
};

export default connect(
  state => ({}),
  { registerUser }
)(
useSheet(Register, STYLES)
);