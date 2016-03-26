import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import { loginUser } from '../actions/login';
import { connect } from 'react-redux';
import useSheet from 'react-jss';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import DragIcon from 'material-ui/lib/svg-icons/editor/drag-handle';
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

  handleSubmit = () => {
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
      <Toolbar className={classes.toolbar}>
        <ToolbarGroup firstChild={true} float="left">
          <FlatButton label= {<Link to="/" style = {STYLES.linkstyle} > BookSnippetr </Link> }/>
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText= { <Link to="/register" style = {STYLES.linkstyle} > Register </Link> } />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>

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
  	left: '40%',
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