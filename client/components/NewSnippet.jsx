import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
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
import DragIcon from 'material-ui/lib/svg-icons/editor/drag-handle';
import FlatButton from 'material-ui/lib/flat-button';

import TextField from 'material-ui/lib/text-field';

export default class NewSnippet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSubmit = () => {
    console.log("im clicked");
    var formData = {
      title: this.refs.title.getValue(),
      author: this.refs.author.getValue(),
      content: this.refs.content.getValue(),
    };
    console.log(formData);
    this.props.addSnippet(formData);
  };

  render() {
    const { classes } = this.props.sheet;
    return (
      <div>
        <form action='' onSubmit={this.handleSubmit}>
          <TextField className={classes.login} ref="title" floatingLabelText = "Title" hintText = "Book title" />
          <TextField className = {classes.login} ref="author" floatingLabelText = "Author" hintText = "Book author" />
          <TextField className = {classes.login} ref="content" floatingLabelText="Content" hintText="Snippet content"
            multiLine={true}
          /><br />
          <br />
          <FlatButton className = {classes.login} label = "Submit" secondary = {true} type="submit" />
        </form>

      </div>
    )
  }
}

const STYLES = {
  login: {
    textAlign: "left"
  },
  linkstyle: {
    color: '#282828',
    textDecoration : 'none'
  }
};

export default connect(
  state => ({}),
  { addSnippet }
)(
  useSheet(NewSnippet, STYLES)
);
