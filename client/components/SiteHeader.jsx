import React, { Component, PropTypes } from 'react';
import { addSnippet } from '../actions/snippets';
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

const menuStyle = {
  textTransform: 'uppercase'
};
export default class SiteHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 1};
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
          <DropDownMenu value={this.state.value} onChange={this.handleChange} style={menuStyle} >
            <MenuItem value={1} primaryText="Sort by Hot" style={menuStyle} />
            <MenuItem value={2} primaryText="Sort by New" style={menuStyle} />
            <MenuItem value={3} primaryText="Sort by Rising" style={menuStyle} />
            <MenuItem value={4} primaryText="Sort by Top" style={menuStyle} />
          </DropDownMenu>
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
          <ToolbarSeparator />
          <RaisedButton label="Add snippet" primary={true} onClick={this.props.addSnippet} />
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

export default connect(
  state => ({}),
  { addSnippet }
)(
  useSheet(SiteHeader, STYLES)
);
