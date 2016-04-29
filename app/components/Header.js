import React, {Component} from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import Divider from 'material-ui/lib/divider';
import ArrowDropRight from 'material-ui/lib/svg-icons/navigation-arrow-drop-right';


import Helmet from 'react-helmet';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import PersonalTheme from '../themes/personal';
import { bindActionCreators } from 'redux';



import * as AuthActions from '../actions/auth';


class Header extends Component {

    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logout();
    }

    handleToggle() {
        console.log('blabla');
    }

    render() {
        const iconStyles = {
            marginRight: 24,
        };
        const {user, leftNavState, gameMenu, logout} = this.props;

        let menuItems = [
            { payload: '0', text: 'Mon - Sun' },
            { payload: '1', text: 'Mon - Sat' },
            { payload: '2', text: 'Mon - Fri' },
            { payload: '3', text: 'Mon - Fri / Mon - Thu' },
        ];

        return (
            <div>
                <AppBar
                    title={<span>eRun</span>}
                    iconElementLeft={<IconButton><FontIcon
                        className="muidocs-icon-action-home"
                        style={iconStyles}
                        /></IconButton>}
                    iconElementRight={<FlatButton label="退出" />}
                    />
                <LeftNav style={{ paddingTop: '70px' }} open={leftNavState}>
                    <Link to="/"><MenuItem>首页</MenuItem></Link>
                    <Link to="/"><MenuItem>玩家管理</MenuItem></Link>
                    <Link to="/"><MenuItem>订单管理</MenuItem></Link>
                    <Link to="/"><MenuItem>兑换管理</MenuItem></Link>
                    <Link to="/"><MenuItem>活动管理</MenuItem></Link>

                    <Link to="/"><MenuItem>统计分析</MenuItem></Link>

                    <MenuItem
                        primaryText="Custom: 1.2"
                        checked={true}
                        rightIcon={<ArrowDropRight />}
                        menuItems={[
                            <MenuItem
                                primaryText="Show"
                                rightIcon={<ArrowDropRight />}
                                menuItems={[
                                    <MenuItem primaryText="Show Level 2" />,
                                    <MenuItem primaryText="Grid lines" checked={true} />,
                                    <MenuItem primaryText="Page breaks" insetChildren={true} />,
                                    <MenuItem primaryText="Rules" checked={true} />,
                                ]}
                                />,
                            <MenuItem primaryText="Grid lines" checked={true} />,
                            <MenuItem primaryText="Page breaks" insetChildren={true} />,
                            <MenuItem primaryText="Rules" checked={true} />,
                        ]}
                        />

                </LeftNav>
            </div>
        );
    }
}

Header.getChildContext = {
    muiTheme: ThemeManager.getMuiTheme(PersonalTheme)
};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        logout: state.auth.logout,
        leftNavState: true
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(AuthActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);