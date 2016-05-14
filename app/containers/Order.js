import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import moment from 'moment';


import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import _ from 'lodash';

import { bindActionCreators } from 'redux';

import UserDetail from '../components/UserDetail';

import * as OrderActions from '../actions/order';


const style = {
  margin: 6,
};

const stateList = [
          <MenuItem value={'FINISHED'} primaryText="完成" />,
          <MenuItem value={'PENDING'} primaryText="待付款" />,
          <MenuItem value={'CANCELED'} primaryText="取消" />,
          <MenuItem value={'PAYMENT_FAILED'} primaryText="失败" />,
];

const deviceList = [
          <MenuItem value={'ios'} primaryText="苹果" />,
          <MenuItem value={'android'} primaryText="安卓" />,
];


class Order extends Component {
  constructor(props) {
    super(props);
    this.state = { stateValue: '', deviceValue: '' };

    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onDetail = this.onDetail.bind(this);
    this.onDetailClose = this.onDetailClose.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleDeviceChange = this.handleDeviceChange.bind(this);
  }

  componentDidMount() {
    this.doSearch('', '', '', '', 1);
  }

  doSearch(uid, mobile, state, device, pageIndex) {
    this.props.list(uid, mobile, state, device, pageIndex);
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.onSearch()
    }
  }

  onSearch() {
    const pageIndex = this.props.pageIndex;
    const uid = this.refs.uid.getValue();
    const mobile = this.refs.mobile.getValue();
    this.doSearch(uid, mobile, this.state.stateValue, this.state.deviceValue, pageIndex);
  }

  onDetail(id) {
    this.props.get(id);
  }


  onDetailClose() {
    this.props.closeOrderDetailDialog();
  }

  handleStateChange(event, index, value) {
    this.setState({ stateValue: value });
  }
  
  handleDeviceChange(event, index, value) {
    this.setState({ deviceValue: value });
  }

  render() {

    const { orderList, orderDetail } = this.props;
    const self = this;

    return (
      <div>
        <Helmet title="订单管理"/>

        {'  '}
        <TextField
          ref="uid"
          hintText="ID"
          floatingLabelText="ID"
          style={style}
          onKeyDown={this.onKeyPress}
          type=""/>
        <TextField
          ref="mobile"
          hintText="手机号"
          floatingLabelText="手机号"
          style={style}
          onKeyDown={this.onKeyPress}
          type=""/>
<br />
<SelectField
          value={this.state.stateValue}
          onChange={this.handleStateChange}
          floatingLabelText="订单状态"
        >
          {stateList}
        </SelectField>
        
        <SelectField
          value={this.state.deviceValue}
          onChange={this.handleDeviceChange}
          floatingLabelText="支付设备"
        >
          {deviceList}
        </SelectField>

        <RaisedButton label="搜索" primary style={style} onTouchTap={this.onSearch} />


        <br /><br />

        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <th>订单</th>
              <th>用户</th>
              <th>商品</th>
              <th>状态</th>
              <th>时间</th>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              _.map(orderList, (order, index) => {
                return <TableRow key={order.orderSerialNumber}>
                  <TableRowColumn>{order.orderSerialNumber}</TableRowColumn>
                  <TableRowColumn>{order.uid}</TableRowColumn>
                  <TableRowColumn>{order.productId}</TableRowColumn>
                  <TableRowColumn>{order.state}{'-'}{order.device}</TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                </TableRow>
              })
            }

          </TableBody>
        </Table>

      </div>
    );
  }
}

Order.propTypes = {
  orderList: PropTypes.array
};

function mapStateToProps(state) {
  return {
    pageIndex: state.order.pageIndex || 1,
    orderList: state.order.orderList,
    orderDetail: state.order.orderDetail
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(OrderActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
