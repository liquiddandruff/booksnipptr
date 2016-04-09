import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import { loginUser } from '../actions/login';
import { connect } from 'react-redux';
import useSheet from 'react-jss';

import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("im clicked");
    var formData = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue(),
    };
    console.log(formData);
  };

  render() {
    const { classes } = this.props.sheet;
    return (
      <div>
        <form action='' onSubmit={this.handleSubmit}>
          <TextField className = {classes.login} ref="username" floatingLabelText = "Username" hintText = "Enter Username"/>
          <br></br>
          <TextField className = {classes.login} ref="password" floatingLabelText = "Password" hintText = "Enter Password" type = "password"/>
          <FlatButton className = {classes.login} label = "Login" secondary = {true} type="submit" />
        </form>
      </div>
    )
  }
}

const STYLES = {
  toolbar: {
    width: '100%',
    style: 'none'
  },
  login: {
  	right: 'auto',
  	top: '12em'
  },
  linkstyle: {
    color: '#282828',
    textDecoration : 'none'
  }
};

export default connect(
  state => ({}),
  { loginUser }
)(
  useSheet(Login, STYLES)
);
