import React, { Component } from 'react';
import { Link } from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Helmet from 'react-helmet';


import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import * as GameSystemActions from '../actions/gameSystem';



class BBS extends Component {
    
    
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const content = this.refs.content.getValue();
    if (content === '') return;
    this.props.sendBBS(content);
  }
  
  onKeyPress(event) {
    if(event.keyCode === 13) {
      this.onSubmit(event)
    }
  }


  render() {
    return (
      <div>
        <form style={{textAlign: 'center'}} onSubmit={this.onSubmit}>
            <Helmet title="发送游戏公告"/>
              <TextField
                  ref="content"
                  hintText="发送游戏公告"
                  floatingLabelText="公告" 
                  onKeyDown={this.onKeyPress}/><br/>
              <RaisedButton label="发送" primary onClick={this.onSubmit} onTouchTap={this.onSubmit} />
          </form>
        </div>
        
    );
  }
}


function mapStateToProps (state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GameSystemActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BBS)
