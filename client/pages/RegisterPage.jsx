import React, { Component } from 'react';
import useSheet from 'react-jss';
import { connect } from 'react-redux';

import { putConfigs } from '../actions/configs';

import Header from '../components/SiteHeader';
import Register from '../components/Register';



export default class RegisterPage extends Component {
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    // if wasn't previously logged in and is now logged in, redirect to home
    if(!this.props.auth.logged_in && nextProps.auth.logged_in) {
      this.props.putConfigs({
        loggedInStateChanged: true,
        loggedInStateChangedMsg: 'You have just logged in'
      });
      this.context.router.push('/');
    }
  }

  render() {
    const { sheet } = this.props;

    return (
      <div className={sheet.classes.register}>
        <Header />
        <Register />
      </div>
    );
  }
}

RegisterPage.contextTypes = {
  router: React.PropTypes.object
};

const STYLES = {
  register: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    color: '#660000'
  }
};

export default connect(
  state => ({ auth: state.auth }),
  { putConfigs }
)(
  useSheet(RegisterPage, STYLES)
);
