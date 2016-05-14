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

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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


    }

    componentDidMount() {
        this.doSearch('', '', 1);
    }

    doSearch(uid, mobile, pageIndex) {
        this.props.list(uid, mobile, pageIndex);
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
        this.doSearch(uid, mobile, pageIndex);
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
                <RaisedButton label="搜索" primary style={style} onTouchTap={this.onSearch} />


                <br /><br />

                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <th>操作</th>

                            <th>手机</th>
                            <th>昵称</th>
                            <th>加入</th>
                            <th>登录</th>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
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
        pageIndex: state.user.pageIndex || 1,
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
