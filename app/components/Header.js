import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';


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
                <AppBar
                    zDepth={0}
                    title={<Link style={{color: '#fff'}} to="/">Prototype</Link>}
                    iconElementRight={<div>
                    <a target="_blank" href="https://github.com/WapGeaR/redux-react-material-boilerplate"><IconButton iconStyle={{color: '#fff'}} iconClassName="fa fa-github"></IconButton></a>
                    <a target="_blank" href="http://www.material-ui.com/#/components/app-bar"><IconButton iconStyle={{color: '#fff'}} iconClassName="fa fa-rocket"></IconButton></a>
              </div>}
          />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.auth.user,
        logout: state.auth.logout
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(AuthActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);