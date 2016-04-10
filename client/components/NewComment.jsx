import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import { addComment } from '../actions/comments';
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

export default class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Comment Clicked");
    var formData = {
      text: this.refs.text.getValue(),
    };
    console.log(formData);
    this.props.addComment(formData);
  };

  render() {
    const { classes } = this.props.sheet;
    return (
      <div>
        <form action='' onSubmit={this.handleSubmit}>
          <TextField className={classes.login} ref="text" floatingLabelText = "Comment" hintText = "Enter Comment" />
          <br></br>
          <RaisedButton className = {classes.login} label = "Submit" primary={true} type="submit" />
          <br></br>
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
  { addComment }
)(
  useSheet(NewComment, STYLES)
);
