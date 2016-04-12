import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { addSnippet, requestSnippets, requestNewest, requestHot, requestRecommended } from '../actions/snippets';
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
    if(value === 1) {
      this.props.requestSnippets();
    }
    else if (value === 2) {
      this.props.requestNewest();
    }
    else if(value === 3) {
      this.props.requestHot();
    }
    else if(value === 4) {
      this.props.requestRecommended();
    }
  }

  render() {
    const { classes } = this.props.sheet;
    return (
      <Toolbar className={classes.toolbar}>
        <ToolbarGroup firstChild={true} float="left">
          <FlatButton label="BookSnipptr" linkButton={true} containerElement={<Link to="/" />} />
          <DropDownMenu value={this.state.value} onChange={this.handleChange} style={menuStyle} >
            <MenuItem value={1} primaryText="Sort by Oldest" style={menuStyle} />
            <MenuItem value={2} primaryText="Sort by Newest" style={menuStyle} />
            <MenuItem value={3} primaryText="Sort by Hot" style={menuStyle} />
            <MenuItem value={4} primaryText="Sort by Recommended" style={menuStyle} />
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
            <MenuItem primaryText="Login" containerElement={<Link to="/login" />} />
            <MenuItem primaryText="Register" containerElement={<Link to="/register" />} />
            
          </IconMenu>
          <ToolbarSeparator />
          <RaisedButton label="Blah blah" primary={true} onClick={this.props.addSnippet} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

const STYLES = {
  toolbar: {
    width: '100%'
  },
  linkstyle: {
    color: '#282828',
    textDecoration : 'none'
  }
};

export default connect(
  state => ({}),
  { addSnippet, requestSnippets, requestNewest, requestHot, requestRecommended }
)(
  useSheet(SiteHeader, STYLES)
);
