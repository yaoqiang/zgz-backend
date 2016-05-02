import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

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
                label="取消"
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
                    open={this.props.rechargeState != null}
                    onRequestClose={this.handleRechargeAlertClose}
                    >
                    {this.props.rechargeState == 200 ? '充值成功' : '充值失败'}
                </Dialog>
            </div>
        );
    }
}

