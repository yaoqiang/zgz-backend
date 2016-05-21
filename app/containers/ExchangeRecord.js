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

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import _ from 'lodash';

import { bindActionCreators } from 'redux';

import Pagination from '../components/Pagination';

import * as ExchangeRecordActions from '../actions/exchangeRecord';


const style = {
  margin: 6,
};

const stateList = [
          <MenuItem value={'FINISHED'} primaryText="完成" />,
          <MenuItem value={'SUBMIT'} primaryText="待.." />,
          <MenuItem value={'CANCELED'} primaryText="取消" />,
          <MenuItem value={'FAILED'} primaryText="失败" />,
];


class ExchangeRecord extends Component {
  constructor(props) {
    super(props);
    this.state = { stateValue: '' };

    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onDetail = this.onDetail.bind(this);
    this.onDetailClose = this.onDetailClose.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.onPageClick = this.onPageClick.bind(this);
    
  }

  componentDidMount() {
    this.doSearch('', '', '', 0);
  }

  doSearch(uid, mobile, state, offset) {
    this.props.list(uid, mobile, state == null ? '' : state, offset);
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.onSearch()
    }
  }

  onSearch() {
    const offset = this.props.offset;
    const uid = this.refs.uid.getValue();
    const mobile = this.refs.mobile.getValue();
    this.doSearch(uid, mobile, this.state.stateValue, offset);
  }
  
  onPageClick(offset) {
    const uid = this.refs.uid.getValue();
    const mobile = this.refs.mobile.getValue();
    this.doSearch(uid, mobile, this.state.stateValue, offset);
  }

  onDetail(id) {
    this.props.get(id);
  }


  onDetailClose() {
    this.props.closeExchangeRecordDetailDialog();
  }

  handleStateChange(event, index, value) {
    this.setState({ stateValue: value });
  }
  
  handleDeviceChange(event, index, value) {
    this.setState({ deviceValue: value });
  }

  render() {

    const { exchangeRecordList, exchangeRecordDetail, total, offset, limit } = this.props;
    const self = this;

    return (
      <div>
        <Helmet title="兑换记录管理"/>

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
          floatingLabelText="兑换状态"
        >
          {stateList}
        </SelectField>
       
        <RaisedButton label="搜索" primary style={style} onTouchTap={this.onSearch} />

        <br />
        共{total}条数据
        <br />

        <Table selectable={false}>
          <TableHeader displaySelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>用户</TableHeaderColumn>
              <TableHeaderColumn>兑换手机号</TableHeaderColumn>
              <TableHeaderColumn>商品</TableHeaderColumn>
              <TableHeaderColumn>状态</TableHeaderColumn>
              <TableHeaderColumn>时间</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody 
            displayRowCheckbox={false}
            deselectOnClickaway
            showRowHover
            stripedRows>
            {
              _.map(exchangeRecordList, (record, index) => {
                return <TableRow key={record._id}>
                  <TableRowColumn>{record.uid}</TableRowColumn>
                  <TableRowColumn>{record.mobile}</TableRowColumn>
                  <TableRowColumn>{record.productName}</TableRowColumn>
                  <TableRowColumn>{record.state}</TableRowColumn>
                  <TableRowColumn>{new Date(record.createdAt).toLocaleString() }</TableRowColumn>
                </TableRow>
              })
            }

          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn colSpan="5">
                <Pagination offset={offset} total={total} limit={limit} onPageClick={this.onPageClick}/>
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>

      </div>
    );
  }
}

ExchangeRecord.propTypes = {
  exchangeRecordList: PropTypes.array
};

function mapStateToProps(state) {
  return {
    offset: state.exchangeRecord.offset || 0,
    limit: state.exchangeRecord.limit || 15,
    exchangeRecordList: state.exchangeRecord.exchangeRecordList,
    total: state.exchangeRecord.total,
    exchangeRecordDetail: state.exchangeRecord.exchangeRecordDetail
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ExchangeRecordActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRecord)
