import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import _ from 'lodash';

import { Breadcrumb, Form, FormGroup, ControlLabel, FormControl, Button, Table, Pager, PageItem } from 'react-bootstrap';

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
        console.log('onDetail -> ', uid);
        this.props.get(uid);
    }

    onRecharge(uid) {
        console.log('onRecharge -> ', uid);

        this.props.getShopList();
    }

    onGrant(uid) {
        console.log('onGrant -> ', uid);
        this.props.openGrantBoxDialog();
    }

    onDetailClose() {
        console.log('onDetailClose -> ');
        this.props.closeUserDetailDialog();
    }
    
   

    render() {

        const { userList, userDetail } = this.props;
        const self = this;

        return (
            <div>
                <Helmet title="玩家管理"/>
                <Breadcrumb>
                    <Breadcrumb.Item active>
                        玩家管理
                    </Breadcrumb.Item>
                </Breadcrumb>
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
                <RaisedButton label="搜索" secondary style={style} onTouchTap={this.onSearch} />


                <br /><br />

                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>手机号</th>
                            <th>昵称</th>
                            <th>加入时间</th>
                            <th>上次登录时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(userList, (u, index) => {
                                return <tr key={u.uid}>
                                    <td>{index + 1}</td>
                                    <td>{u.mobile}</td>
                                    <td>{u.nickName}</td>
                                    <td>{new Date(u.createdAt).toLocaleString() }</td>
                                    <td>{new Date(u.lastLoginAt).toLocaleString() }</td>
                                    <td>
                                        <RaisedButton label="详情" secondary style={style} onTouchTap={self.onDetail.bind(this, u.uid) } />
                                    </td>
                                </tr>
                            })
                        }

                    </tbody>
                </Table>
                <Pager>
                    <PageItem href="#">上一页</PageItem>
                    {' '}
                    <PageItem href="#">下一页</PageItem>
                </Pager>
                
                

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
