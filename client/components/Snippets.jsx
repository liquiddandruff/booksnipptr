import React from 'react';
import Snippet from './Snippet';
import NewSnippet from './NewSnippet';
import useSheet from 'react-jss';
import { connect } from 'react-redux';
import { addKitten, deleteKitten } from '../actions/kittens';
import { addSnippet, likeSnippet, deleteSnippet } from '../actions/snippets';

import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

const Snippets = ({ sheet, deleteKitten, snippets, addSnippet, likeSnippet, deleteSnippet }) =>
  <div className={sheet.classes.kittens}>
    <Paper className={sheet.classes.paper}>
      {!!snippets.length &&
        <h1>There are {snippets.length} snippets</h1>
      }
      {!snippets.length &&
        <h1>There are no snippets</h1>
      }
      <NewSnippet />
      <RaisedButton label="Add snippet" primary={true} onClick={addSnippet} />
    </Paper>
    {!!snippets.length &&
      <div className={sheet.classes.basket}>
        {snippets.map(snippet => (
          <Snippet key={`snippet-${snippet.id}`}
                  snippet={snippet}
                  onSnippetLike={likeSnippet}
                  onSnippetDelete={deleteSnippet} />
        ))}
      </div>
    }
  </div>;

console.log("here we go");
console.log(Snippets);

const STYLES = {
  credits: {
    fontSize: 10
  },

  link: {
    textDecoration: 'none'
  },

  basket: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    flexWrap: 'wrap'
  },

  kittens: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '60%'
  },

  paper: {
    width: '100%',
    margin: 0,
    textAlign: 'center',
    display: 'inline-block',
  }

};

export default connect(
  state => ({ kittens: state.kittens, snippets: state.snippets }),
  { addKitten, deleteKitten, addSnippet, likeSnippet, deleteSnippet }
)(
  useSheet(Snippets, STYLES)
);
