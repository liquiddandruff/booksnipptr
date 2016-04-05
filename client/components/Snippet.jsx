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

const Snippet = ({ sheet, snippet, onSnippetLike, onSnippetDelete }) => (
  <Card className={sheet.classes.snippet} >
    <CardTitle title={snippet.title} subtitle={snippet.author} />
    <CardText>
      {snippet.content}
      <p>
        Created at: <b>{snippet.created_at}</b>
      </p>
    </CardText>
    <CardActions>
      <Badge badgeContent={snippet.likes} secondary={true} badgeStyle={{top: 15, right: 15}} >
        <FlatButton label="Like" onClick={onSnippetLike.bind(this, snippet.id)} >
        </FlatButton>
        {/*
        <IconButton tooltip="Notifications">
          <NotificationsIcon />
          </IconButton>*/}
      </Badge>
      <FlatButton label="Comment" />
      <FlatButton label="Remove" onClick={onSnippetDelete.bind(this, snippet.id)} />
    </CardActions>
  </Card>
);

Snippet.propTypes = {
  snippet: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired
  }).isRequired
};


const STYLES = {
  snippet: {
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

export default useSheet(Snippet, STYLES);
