import React, { PropTypes } from 'react';
import useSheet from 'react-jss';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import Badge from 'material-ui/lib/badge';
import IconButton from 'material-ui/lib/icon-button';
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications';

const COLORS = [
  '#FFAAAA', '#FFAAFF', '#AAAAFF', '#FFFFAA',
  '#339933', '#333399', '#993399', '#339999'
];

const Comment = ({ sheet, comment }) => (
  <Card className={sheet.classes.comment} >
    <CardText>
      {comment.text}
      <p>
        Created at: <b>{comment.created_at}</b>
      </p>
    </CardText>
    <CardActions>
      <Badge badgeContent={comment.likes} secondary={true} badgeStyle={{top: 15, right: 15}} >
        <FlatButton label="Like" onClick={onCommentLike.bind(this, comment.id)} >
        </FlatButton>

      </Badge>
      
    </CardActions>
  </Card>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired
  }).isRequired
};


const STYLES = {
  comment: {
    width: "100%",
  },
  button: {
    padding: '1rem 1.5rem',
    background: '#FFAAAA',
    '&:hover': {
      background: '#FFBBBB'
    },
    border: 0,
    borderRadius: '0.5rem',
    cursor: 'pointer',
    textAlign: 'center',
    userSelect: 'none'
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& svg': {
      fill: 'currentColor'
    }
  }
};

export default useSheet(Comment, STYLES);
