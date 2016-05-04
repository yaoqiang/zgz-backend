import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import * as AuthActions from '../actions/auth';

// import {reduxForm} from 'redux-form';
import Helmet from 'react-helmet';

class Login extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const login = this.refs.login.getValue();
    const password = this.refs.password.getValue();
    this.props.login(login, password);
    console.log(`Login: ${login} Password: ${password}`);
  }
  
  onKeyPress(event) {
    if(event.keyCode === 13) {
      this.onSubmit(event)
    }
  }

  render() {
    return (
      <div>
        <form style={{textAlign: 'center'}} className="login" onSubmit={this.onSubmit}>
            <Helmet title="Login page"/>
              <TextField
                  style={{textAlign: 'left'}}
                  ref="login"
                  hintText="Enter your login"
                  floatingLabelText="Login"
                  errorText={this.props.auth.err}/><br/>
              <TextField
                  ref="password"
                  hintText="Enter your password"
                  floatingLabelText="Password"
                  type="password" 
                  onKeyDown={this.onKeyPress} 
                  errorText={this.props.auth.err}/><br/>
              <RaisedButton label="Login" secondary onClick={this.onSubmit} onTouchTap={this.onSubmit} />
          </form>
        </div>
    );
  }

}

Login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  login: PropTypes.func,
  user: PropTypes.object
};


function mapStateToProps (state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
