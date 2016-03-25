import React from 'react';
import Snippet from './Snippet';
import useSheet from 'react-jss';
import { connect } from 'react-redux';
import { addKitten, deleteKitten } from '../actions/kittens';
import { addSnippet, deleteSnippet } from '../actions/snippets';

import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

const Snippets = ({ sheet, kittens, addKitten, deleteKitten, snippets, addSnippet }) =>
  <div className={sheet.classes.kittens}>
    <Paper className={sheet.classes.paper}>
      {!!snippets.length &&
        <h1>There are {snippets.length} actual snippets</h1>
      }
      {!snippets.length &&
        <h1>There are no actual snippets</h1>
      }
      {!!kittens.length &&
        <h1>There are {kittens.length} snippets</h1>
      }
      {!kittens.length &&
        <h1>There are no snippets</h1>
      }
      <RaisedButton label="Add snippet" primary={true} onClick={addSnippet} />
    </Paper>
    {!!kittens.length &&
      <div className={sheet.classes.basket}>
        {kittens.map(kitten => (
          <Snippet key={`kitten-${kitten.id}`}
                  snippet={kitten}
                  onDeleteKitten={deleteKitten} />
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
    height: 300,
    width: '100%',
    margin: 0,
    textAlign: 'center',
    display: 'inline-block',
  }

};

export default connect(
  state => ({ kittens: state.kittens, snippets: state.snippets }),
  { addKitten, deleteKitten, addSnippet }
)(
  useSheet(Snippets, STYLES)
);
