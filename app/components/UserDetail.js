import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

import _ from 'lodash';

import gameConstants from '../config/gameConstants';

import ShopBox from './ShopBox';

export default class UserDetail extends React.Component {
    constructor(props) {
        super(props);

    }

    handleOpen() {
    };

    handleClose() {

    };

    render() {
        const { open, userDetail, shopList } = this.props;

        console.log('userDetail - ', userDetail, this.props)
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
                
                {shopList && <ShopBox open shopList={shopList} handleClose={this.props.closeShopBoxDialog}/>}
                
            </div>
        );
    }
}

