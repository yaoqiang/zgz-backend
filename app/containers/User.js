import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import moment from 'moment';

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

import UserDetail from '../components/UserDetail';

import * as UserActions from '../actions/user';


const style = {
    margin: 6,
};



class User extends Component {
    constructor(props) {
        super(props);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onDetail = this.onDetail.bind(this);
        this.onDetailClose = this.onDetailClose.bind(this);
        this.onRecharge = this.onRecharge.bind(this);
        this.onPageClick = this.onPageClick.bind(this);

    }

    componentDidMount() {
        this.doSearch('', '', '', 0);
    }

    doSearch(uid, mobile, nickName, offset) {
        this.props.list(uid, mobile, nickName, offset);
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
        const nickName = this.refs.nickName.getValue();
        this.doSearch(uid, mobile, nickName, 0);
    }

    onDetail(uid) {
        // console.log('onDetail -> ', uid);
        this.props.get(uid);
    }

    onRecharge(uid) {
        // console.log('onRecharge -> ', uid);

        this.props.getShopList();
    }

    onGrant(uid) {
        // console.log('onGrant -> ', uid);
        this.props.openGrantBoxDialog();
    }

    onDetailClose() {
        // console.log('onDetailClose -> ');
        this.props.closeUserDetailDialog();
    }

    onPageClick(offset) {
        const uid = this.refs.uid.getValue();
        const mobile = this.refs.mobile.getValue();
        const nickName = this.refs.nickName.getValue();
        this.doSearch(uid, mobile, nickName, offset);
    }

    render() {

        const { userList, userDetail } = this.props;
        const self = this;

        return (
            <div>
                <Helmet title="玩家管理"/>

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
                <TextField
                    ref="nickName"
                    hintText="昵称"
                    floatingLabelText="昵称"
                    style={style}
                    onKeyDown={this.onKeyPress}
                    type=""/>
                <RaisedButton label="搜索" primary style={style} onTouchTap={this.onSearch} />


                <br /><br />

                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>操作</TableHeaderColumn>

                            <TableHeaderColumn>手机</TableHeaderColumn>
                            <TableHeaderColumn>昵称</TableHeaderColumn>
                            <TableHeaderColumn>加入</TableHeaderColumn>
                            <TableHeaderColumn>登录</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway
                        showRowHover
                        stripedRows>>
                        {
                            _.map(userList, (u, index) => {
                                return <TableRow key={u.uid}>

                                    <TableRowColumn>
                                        <FloatingActionButton mini={true} secondary={true} style={style} onTouchTap={self.onDetail.bind(this, u.uid) }>
                                            <ContentAdd />
                                        </FloatingActionButton>
                                    </TableRowColumn>
                                    <TableRowColumn>{u.mobile}</TableRowColumn>
                                    <TableRowColumn>{u.nickName}</TableRowColumn>
                                    <TableRowColumn>{new Date(u.createdAt).toLocaleString() }</TableRowColumn>
                                    <TableRowColumn>{new Date(u.lastLoginAt).toLocaleString() }</TableRowColumn>

                                </TableRow>
                            })
                        }

                    </TableBody>

                    <TableFooter>
                        <TableRow>
                        <TableRowColumn colSpan="4">
                            <Pagination offset={offset} total={total} limit={limit} onPageClick={this.onPageClick}/>
                        </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>


                <UserDetail open={userDetail != null}
                    handleClose={this.onDetailClose}
                    onRecharge={this.onRecharge}
                    onGrant={this.onGrant}
                    {...this.props} />



            </div>
        );
    }
}

User.propTypes = {
    userList: PropTypes.array
};

function mapStateToProps(state) {
    return {
        offset: state.user.offset || 0,
        userList: state.user.userList,
        userDetail: state.user.user,
        shopList: state.user.shopList,
        rechargeProductId: state.user.rechargeProductId,
        rechargeAlertState: state.user.rechargeAlertState,
        grantBoxState: state.user.grantBoxState,
        grantAlertState: state.user.grantAlertState,
        itemList: state.user.itemList
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
