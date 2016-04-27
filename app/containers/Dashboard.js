import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard Page</h1>
        
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Dashboard);
