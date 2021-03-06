import React from 'react';


import RadioButton from 'material-ui/RadioButton';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },

};
const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
};

export default class ShopBox extends React.Component {
    constructor(props) {
        super(props);
        this.onProductSelected = this.onProductSelected.bind(this);
        this.submitRecharge = this.submitRecharge.bind(this);
        this.handleRechargeAlertClose = this.handleRechargeAlertClose.bind(this);

    }

    onProductSelected(event, value) {

        this.props.selectProduct(value);

    }

    submitRecharge() {
        this.props.recharge({ uid: this.props.uid, productId: this.props.rechargeProductId })
    }

    handleRechargeAlertClose() {
        this.props.handleRechargeAlertClose();
    }

    render() {
        const { open, shopList } = this.props;

        const actions = [
            <FlatButton
                label="关闭"
                secondary={true}
                onTouchTap={this.props.closeShopBoxDialog}
                />,
            <FlatButton
                label="充值"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.submitRecharge}
                />,
        ];
        
        const rechargeAlertActions = [
            <FlatButton
                label="关闭"
                secondary={true}
                onTouchTap={this.handleRechargeAlertClose}
                />,
        ];

        return (
            <div>
                <Dialog
                    title="商品列表"
                    actions={actions}
                    modal={false}
                    open={open}
                    onRequestClose={this.props.closeShopBoxDialog}
                    contentStyle={customContentStyle}
                    autoScrollBodyContent={true}
                    >

                    <div>
                        <RadioButtonGroup name="product" ref="product" onChange={this.onProductSelected}>
                            {
                                _.map(shopList, (product, index) => {

                                    return <RadioButton
                                        key={product.id}
                                        value={product.id.toString() }
                                        label={product.title + ' - ' + product.desc + ' - ' + '金币:' + product.gold + ' - 价钱:' + product.amount}
                                        style={styles.radioButton} />

                                })
                            }

                        </RadioButtonGroup>

                        <br />
                        {'上传附件(转账凭证): ......'}
                    </div>

                </Dialog>

                <Dialog
                    title="充值结果"
                    actions={rechargeAlertActions}
                    modal={false}
                    open={this.props.rechargeAlertState != null}
                    onRequestClose={this.handleRechargeAlertClose}
                    >
                    {this.props.rechargeAlertState == 200 ? '充值成功' : '充值失败'}
                </Dialog>
            </div>
        );
    }
}

