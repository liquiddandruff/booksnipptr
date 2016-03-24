import React, { PropTypes } from 'react';
import useSheet from 'react-jss';

const COLORS = [
  '#FFAAAA', '#FFAAFF', '#AAAAFF', '#FFFFAA',
  '#339933', '#333399', '#993399', '#339999'
];

const Snippet = ({ sheet, onDeleteKitten, snippet }) => (
  <div className={sheet.classes.snippet}>
    <div className={sheet.classes.info}>
      <div>Snippet #{snippet.id}</div>
    </div>
    <a className={sheet.classes.button}
       onClick={onDeleteKitten.bind(this, snippet.id)}>
      Remove snippet
    </a>
  </div>
);

Snippet.propTypes = {
  snippet: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired
  }).isRequired
};


const STYLES = {
  snippet: {
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '33%',
    padding: '0.5rem',
    boxSizing: 'border-box'
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
