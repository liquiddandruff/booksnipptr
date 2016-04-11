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

import TextField from 'material-ui/lib/text-field';

export default class NewSnippet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("im clicked");
    var formData = {
      title: this.refs.title.getValue(),
      author: this.refs.author.getValue(),
      content: this.refs.content.getValue(),
      tags: this.refs.tags.getValue(),
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
          <br />
          <TextField className = {classes.login} ref="author" floatingLabelText = "Author" hintText = "Book author" />
          <br />
          <TextField className = {classes.login} ref="content" floatingLabelText="Content" hintText="Snippet content"
            multiLine={true}/>
          <br />
          <TextField className = {classes.login} ref="tags" floatingLabelText = "Tags" hintText = "E.g: Fantasy,Action,Drama" />          
          <br />
          <RaisedButton className = {classes.login} label = "Submit" primary={true} type="submit" />
          <br />
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
