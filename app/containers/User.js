import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import TextField from 'material-ui/lib/text-field';

import _ from 'lodash';

import { Breadcrumb, Form, FormGroup, ControlLabel, FormControl, Button, Table, Pager, PageItem } from 'react-bootstrap';

import { bindActionCreators } from 'redux';

import * as UserActions from '../actions/user';


class User extends Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
        this.handleSearch('', '');
    }

    handleSearch(uid, mobile, pageIndex) {
        this.props.list(uid, mobile, pageIndex);
    }

    onSearch() {
        console.log('clicked..')
    }

    render() {
        const { userList } = this.props;

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item active>
                        玩家管理
                    </Breadcrumb.Item>
                </Breadcrumb>


                
                <Form inline>
                    <FormGroup controlId="uid">
                        <ControlLabel>ID</ControlLabel>
                        {' '}
                        <FormControl type="text" placeholder="ID" />
                    </FormGroup>
                    {' '}
                    <FormGroup controlId="mobile">
                        <ControlLabel>手机号</ControlLabel>
                        {' '}
                        <FormControl type="text" placeholder="手机号" />
                    </FormGroup>
                    {' '}
                    <Button onClick={this.onSearch}>
                        搜索
                    </Button>
                </Form>

                <br />

                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>手机号</th>
                            <th>背包</th>
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
                                    <td>...</td>
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
            </div>
        );
    }
}

User.propTypes = {
    search: PropTypes.func,
    userList: PropTypes.array
};

function mapStateToProps(state) {
    return {
        pageIndex: state.user.pageIndex || 1,
        userList: state.user.list
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
