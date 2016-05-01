import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

export default class UserDetail extends React.Component {
    constructor(props) {
        super(props);

    }

    handleOpen() {
    };

    handleClose() {

    };

    render() {
        const { open, userDetail } = this.props;

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
                            {'性别: '} {userDetail.gender} <br />
                            {'元宝: '} {userDetail.fragment} <br />
                            {'金币: '} {userDetail.gold} <br />
                            {'战绩: '} {userDetail.winNr} {'/'} {userDetail.tieNr} {'/'} {userDetail.loseNr}
                        </CardText>
                        <CardActions expandable={false}>
                            <RaisedButton label="充值" primary  onTouchTap={this.props.onRecharge.bind(this, userDetail.uid)} />
                            <RaisedButton label="奖励" secondary  onTouchTap={this.props.onGrant.bind(this, userDetail.uid)} />
                        </CardActions>
                    </Card>
                </Dialog>
            </div>
        );
    }
}

