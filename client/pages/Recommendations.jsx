import React, { Component } from 'react';
import useSheet from 'react-jss';
import { connect } from 'react-redux';

import Header from '../components/SiteHeader';
import Snippets from '../components/Snippets';

import { requestSnippets } from '../actions/snippets';


export default class Recommendations extends Component {
  componentDidMount() {
    this.props.requestSnippets();
  }

  render() {
    const { sheet } = this.props;

    return (
      <div className={sheet.classes.index}>
        <Header />
        <Snippets />
      </div>
    );
  }
}

const STYLES = {
  index: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
};

export default connect(
  () => ({}),
  { requestSnippets }
)(
  useSheet(Index, STYLES)
);
