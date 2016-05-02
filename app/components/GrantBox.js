import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import _ from 'lodash';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
};

export default class GrantBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
        this.submitGrant = this.submitGrant.bind(this);
        this.closeGrantBoxDialog = this.closeGrantBoxDialog.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    
    componentDidMount() {
        this.props.getItemList();
    }

    handleChange (value) {
        this.setState({
        value: value,
        });
    };


    submitGrant() {
        
        this.props.grant({ uid: this.props.uid, productId: this.props.rechargeProductId })
    }

    closeGrantBoxDialog() {
        this.props.closeGrantBoxDialog();
    }

    render() {
        const { open, shopList } = this.props;

        const actions = [
            <FlatButton
                label="取消"
                secondary={true}
                onTouchTap={this.props.closeGrantBoxDialog}
                />,
            <FlatButton
                label="奖!"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.submitRecharge}
                />,
        ];

        const grantAlertActions = [
            <FlatButton
                label="关闭"
                secondary={true}
                onTouchTap={this.closeGrantBoxDialog}
                />,
        ];

        return (
            <div>
                <Dialog
                    title="添加奖励"
                    actions={actions}
                    modal={false}
                    open={open}
                    contentStyle={customContentStyle}
                    onRequestClose={this.props.closeGrantBoxDialog}
                    autoScrollBodyContent={true}
                    >

                    <div>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            >
                            <Tab label="金币" value="a" >
                                <div>
                                    <p>
                                        <TextField
                                        style={{textAlign: 'left'}}
                                        ref="gold"
                                        hintText="$$$"
                                        floatingLabelText="$$$"/>
                                    </p>
                                </div>
                            </Tab>
                            <Tab label="道具" value="b">
                                <div>
                                    {
                                        _.map(this.props.itemList, (item) => {
                                            return <p>
                                                <TextField
                                                style={{textAlign: 'left'}}
                                                ref={'item_' + item.id}
                                                hintText={item.title}
                                                floatingLabelText={item.title}/>
                                            </p>
                                        })
                                    }
                                </div>
                            </Tab>
                            <Tab label="元宝" value="c">
                                <div>
                                    <p>
                                        <TextField
                                        style={{textAlign: 'left'}}
                                        ref="fragment"
                                        hintText="元宝"
                                        floatingLabelText="元宝"/>
                                    </p>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>

                </Dialog>

            </div>
        );
    }
}

