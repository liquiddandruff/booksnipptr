import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import useSheet from 'react-jss';

import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

export default class Register extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { classes } = this.props.sheet;
    return (
      <div>
        <form>
          <TextField className = {classes.register} floatingLabelText = "Username" hintText = "Enter Username"/>
          <br></br>
          <TextField className = {classes.register} floatingLabelText = "Password" hintText = "Enter Password" type = "password"/>
          <br></br>
          <TextField className = {classes.register} floatingLabelText = "E-mail Address" hintText = "Enter E-mail" type = "email"/>
          <br></br>
          <FlatButton className = {classes.register} label = "Register" secondary = {true}/>
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

export default useSheet(Register, STYLES)
