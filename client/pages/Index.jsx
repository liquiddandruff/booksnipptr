import React, { Component } from 'react';
import useSheet from 'react-jss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/SiteHeader';
import Snippets from '../components/Snippets';

import { requestKittens } from '../actions/kittens';
import { requestSnippets } from '../actions/snippets';
import { requestConfigs, putConfigs } from '../actions/configs';



export default class Index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('statel', this.props.statel);
    console.log('configs:', this.props.configs);
    if(!this.props.configs.isFirstLoad) {
      console.log('IS FIRST LOAD');
      this.props.putConfigs({isFirstLoad: true});
      this.props.requestKittens();
      this.props.requestSnippets();
    } else {
      console.log('IS NOT FIRST LOAD');
    }
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

function mapStateToProps(state) {
  return {
    configs: state.configs,
    state1: state,
  };
}

function mapDispatchToProps(dispatch) {
  // http://stackoverflow.com/questions/34458261/how-to-get-simple-dispatch-from-this-props-using-connect-w-redux
  return {
    ...bindActionCreators({ requestKittens, requestSnippets, requestConfigs, putConfigs }, dispatch),
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  useSheet(Index, STYLES)
);
