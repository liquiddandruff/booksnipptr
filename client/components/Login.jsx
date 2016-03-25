import React, { Component, PropTypes } from 'react'
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


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 2};
  }

  handleChange = (event, index, value) => {
    console.log(event, index, value);
    console.log("setting state: " + {value});
    this.setState({value});
  }

  render() {
    const { classes } = this.props.sheet;
    return (
      <Toolbar className={classes.toolbar}>
        <ToolbarGroup firstChild={true} float="left">
          <FlatButton label="BookSnippetr" />
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Login" />
            <MenuItem primaryText="Register" />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>

    )
  }
}

const STYLES = {
  toolbar: {
    width: '100%'
  }
};

export default useSheet(Login, STYLES)
