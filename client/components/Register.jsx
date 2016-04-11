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
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register Button Clicked');
    var formData = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue()
    };
    console.log(formData);
    this.props.registerUser(formData);
  };
  
  render() {
    const { classes } = this.props.sheet;
    return (
      <div>
        <form action='' onSubmit={this.handleSubmit}>
          <TextField className = {classes.register} ref="username" floatingLabelText = "Username" hintText = "Enter Username"/>
          <br></br>
          <TextField className = {classes.register} ref="password" floatingLabelText = "Password" hintText = "Enter Password" type = "password"/>
          <br></br>
          <FlatButton className={classes.registerButton} label="Register" secondary={true} type="submit"/>
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
  registerButton: {
    left: '5em',
  	top: '7em'
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
