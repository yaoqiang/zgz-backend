import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';

import _ from 'lodash';

import gameConstants from '../config/gameConstants';

import ShopBox from './ShopBox';
import GrantBox from './GrantBox';

export default class UserDetail extends React.Component {
    constructor(props) {
        super(props);

    }

    handleOpen() {
    };

    handleClose() {

    };

    render() {
        const { open, shopList } = this.props;

        const userDetail = this.props.userDetail || {};

        const actions = [
            <FlatButton
                label="关闭"
                secondary={true}
                onTouchTap={this.props.handleClose}
                />
        ];

        return (
            <div>
                <Dialog
                    title="玩家信息"
                    actions={actions}
                    modal={false}
                    open={open}
                    onRequestClose={this.props.handleClose}
                    autoScrollBodyContent={true}
                    >
                    <Card>
                        <CardHeader
                            title={userDetail.mobile}
                            subtitle={userDetail.nickName}
                            actAsExpander={false}
                            showExpandableButton={false}
                            />
                        <CardText expandable={false}>
                            {'ID:  '} {userDetail.uid} <br />
                            {'头像: '} {userDetail.avatar} <br />
                            {'性别: '} {userDetail.gender} <br />
                            {'元宝: '} {userDetail.fragment} <br />
                            {'金币: '} {userDetail.gold} <br />
                            {'战绩: '} {userDetail.winNr} {'/'} {userDetail.tieNr} {'/'} {userDetail.loseNr} <br />
                            {'开会: '} {userDetail.meetingTimes}<br />
                            {'物品: '} {_.map(userDetail.items, (item) => {
                                return <p key={item.id}>{item.title} {':'} { (() => {
                                    if (item.mode == gameConstants.GLOBAL.ITEM_MODE.COUNT) {
                                        return item.value;
                                    }
                                    else {
                                        return new Date(item.value).toLocaleDateString() + ' 到期';
                                    }
                                })(item) }</p>
                            })}
                        </CardText>
                        <CardActions expandable={false}>
                            <RaisedButton label="充值" primary  onTouchTap={this.props.onRecharge.bind(this, userDetail.uid)} />
                            <RaisedButton label="奖励" secondary  onTouchTap={this.props.onGrant.bind(this, userDetail.uid)} />
                            <RaisedButton label="金币日志" default  onTouchTap={this.props.onGrant.bind(this, userDetail.uid)} />
                            <RaisedButton label="登录日志" default  onTouchTap={this.props.onGrant.bind(this, userDetail.uid)} />
                            <RaisedButton label="支付日志" default  onTouchTap={this.props.onGrant.bind(this, userDetail.uid)} />
                        </CardActions>
                    </Card>
                </Dialog>
                
                {shopList && <ShopBox 
                    open                
                    uid={userDetail.uid}
                    shopList={shopList} 
                    {...this.props}/>
                }
                
                {this.props.grantBoxState && <GrantBox 
                    open                
                    uid={userDetail.uid}
                    {...this.props}/>
                }
                
            </div>
        );
    }
}

