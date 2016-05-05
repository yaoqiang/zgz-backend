import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';




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
    
    

    render() {

        const {user, logout} = this.props;

        return (
            <div>
                
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.auth.user,
        logout: state.auth.logout,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(AuthActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);