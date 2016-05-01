import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import {LinkContainer} from 'react-router-bootstrap';


import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';


import * as AuthActions from '../actions/auth';


class Header extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logout();
    }

    handleMenuSelect(event, eventKey) {
        event.preventDefault()
        console.log(eventKey);
    }

    render() {

        const {user, logout} = this.props;

        return (
            <div>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">eRun</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to="/user">
                                <NavItem eventKey={1} href="#">玩家管理</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/order">
                                <NavItem eventKey={2} href="#">订单管理</NavItem>
                            </LinkContainer>
                            <NavDropdown eventKey={3} title="兑换管理" id="basic-nav-dropdown-exchange">
                                <MenuItem eventKey={3.1}>兑换列表</MenuItem>
                                <MenuItem eventKey={3.2}>兑换记录</MenuItem>
                            </NavDropdown>
                            <NavItem eventKey={4} href="#">活动管理</NavItem>
                            <NavDropdown eventKey={5} title="游戏管理" id="basic-nav-dropdown-game">
                                <MenuItem eventKey={5.1}>游戏公告发送</MenuItem>
                                <MenuItem eventKey={5.2}>系统邮件维护</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={5.3}>苹果审核开关</MenuItem>
                                <MenuItem eventKey={5.4}>游戏版本设置</MenuItem>
                            </NavDropdown>
                            <NavDropdown eventKey={6} title="统计分析" id="basic-nav-dropdown-analysis">
                                <MenuItem eventKey={6.1}>活跃用户</MenuItem>
                                <MenuItem eventKey={6.2}>新增用户</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={6.3}>留存率</MenuItem>
                            </NavDropdown>
                            <NavDropdown eventKey={7} title="系统管理" id="basic-nav-dropdown-system">
                                <MenuItem eventKey={7.1}>账号管理</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavDropdown eventKey={20} title="个人中心" pullRight id="basic-nav-dropdown-profile">
                                <MenuItem eventKey={20.1}>修改密码</MenuItem>
                                <MenuItem eventKey={20.2}>退出</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.auth.user,
        logout: state.auth.logout,
        menu: {}
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(AuthActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);