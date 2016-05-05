import React from 'react';
import TextField from 'material-ui/TextField';

import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';


import RadioButton from 'material-ui/RadioButton';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';

import _ from 'lodash';


import gameConstants from '../config/gameConstants';


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
        const gold = this.refs.gold.getValue() == '' ? null : parseInt(this.refs.gold.getValue());
        const fragment = this.refs.fragment.getValue() == '' ? null : parseInt(this.refs.fragment.getValue());
        
        const itemMap = _.map(this.props.itemList, (item) => {
            return {key: 'item_'+item.id, id: item.id}
        });
        
        const itemList = _.filter(_.map(itemMap, (m) => {
            return {id: m.id, value:  _.get(this.refs, m.key).getValue()}
        }), (item) => {
            return item.value !== '' && item.value != null;
        });
        
        const itemListFinal = _.map(itemList, (item) => {
            return {id: item.id, value: parseInt(item.value)};
        })
        
        this.props.grant({ uid: this.props.uid, type: gameConstants.GLOBAL.ADD_GOLD_TYPE.ACTIVITY, gold: gold, fragment: fragment, items: itemListFinal })
    }

    render() {
        const { open, shopList } = this.props;

        const actions = [
            <FlatButton
                label="关闭"
                secondary={true}
                onTouchTap={this.props.closeGrantBoxDialog}
                />,
            <FlatButton
                label="奖!!!"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.submitGrant}
                />,
        ];

        const grantAlertActions = [
            <FlatButton
                label="关闭"
                secondary={true}
                onTouchTap={this.props.handleGrantAlertClose}
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
                    autoDetectWindowHeight={false}
                    >

                    <div>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            >
                            <Tab label="金币" value="a" >
                                <div>
                                        <TextField
                                        style={{textAlign: 'left'}}
                                        ref="gold"
                                        hintText="$$$"
                                        floatingLabelText="$$$"/>
                                </div>
                            </Tab>
                            <Tab label="道具" value="b">
                                <div>
                                    {
                                        _.map(this.props.itemList, (item) => {
                                            return <TextField
                                                key={'item_' + item.id}
                                                style={{textAlign: 'left'}}
                                                ref={'item_' + item.id}
                                                hintText={item.title}
                                                floatingLabelText={item.title}/>
                                        })
                                    }
                                </div>
                            </Tab>
                            <Tab label="元宝" value="c">
                                <div>
                                        <TextField
                                        style={{textAlign: 'left'}}
                                        ref="fragment"
                                        hintText="元宝"
                                        floatingLabelText="元宝"/>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>

                </Dialog>

<Dialog
                    title="奖励发放结果"
                    actions={grantAlertActions}
                    modal={false}
                    open={this.props.grantAlertState != null}
                    onRequestClose={this.props.handleGrantAlertClose}
                    >
                    {this.props.grantAlertState == 200 ? '奖励发放成功' : '奖励发放失败'}
                </Dialog>
            </div>
        );
    }
}

