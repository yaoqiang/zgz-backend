import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import ActionHome from 'material-ui/svg-icons/action/home';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

import Paper from 'material-ui/Paper';


import * as DashboardActions from '../actions/dashboard';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


const iconStyles = {
  marginRight: 24,
};

class Dashboard extends Component {
  componentDidMount() {
    this.props.dashboard();
  }

  render() {
    return (
      <div>
        <h2>综合数据</h2>
        <Paper style={style} zDepth={3} >
          <HardwareVideogameAsset style={iconStyles} color={blue500} /><br />
          当前在线<br />{this.props.onlineUserTotal}
        </Paper>
        <Paper style={style} zDepth={3} >
          <HardwareVideogameAsset style={iconStyles} color={blue500} /><br />
          用户总数：<br />{this.props.acquisition}
        </Paper>
        <Paper style={style} zDepth={3} >
          <HardwareVideogameAsset style={iconStyles} color={blue500} /><br />
          昨日新增：<br />{this.props.acquisitionLastDay}
        </Paper>
        <Paper style={style} zDepth={3} >
          <HardwareVideogameAsset style={iconStyles} color={blue500} /><br />
          上周新增：<br />{this.props.acquisitionLastWeek}
        </Paper>
        <Paper style={style} zDepth={3} >
          <HardwareVideogameAsset style={iconStyles} color={blue500} /><br />
          上两周新增：<br />{this.props.acquisitionLastTwoWeek}
        </Paper>
        <Paper style={style} zDepth={3} >
          <HardwareVideogameAsset style={iconStyles} color={blue500} /><br />
          上月新增：<br />{this.props.acquisitionLastMonth}
        </Paper>
        
        <Paper style={style} zDepth={3} >
          <ActionFlightTakeoff style={iconStyles} color={red500} /><br />
          昨日活跃：<br />{this.props.activationLastDay}
        </Paper>
        
        <Paper style={style} zDepth={3} >
          <ActionFlightTakeoff style={iconStyles} color={red500} /><br />
          上周活跃：<br />{this.props.activationLastWeek}
        </Paper>
        
        <Paper style={style} zDepth={3} >
          <ActionFlightTakeoff style={iconStyles} color={red500} /><br />
          上两周活跃：<br />{this.props.activationLastTwoWeek}
        </Paper>
        
        <Paper style={style} zDepth={3} >
          <ActionFlightTakeoff style={iconStyles} color={red500} /><br />
          上月活跃：<br />{this.props.activationLastMonth}
        </Paper>

      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    onlineUserTotal: state.dashboard.onlineUserTotal,
    acquisition: state.dashboard.acquisition,
    acquisitionLastDay: state.dashboard.acquisitionLastDay,
    acquisitionLastWeek: state.dashboard.acquisitionLastWeek,
    acquisitionLastTwoWeek: state.dashboard.acquisitionLastTwoWeek,
    acquisitionLastMonth: state.dashboard.acquisitionLastMonth,
    activationLastDay: state.dashboard.activationLastDay,
    activationLastWeek: state.dashboard.activationLastWeek,
    activationLastTwoWeek: state.dashboard.activationLastTwoWeek,
    activationLastMonth: state.dashboard.activationLastMonth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DashboardActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
