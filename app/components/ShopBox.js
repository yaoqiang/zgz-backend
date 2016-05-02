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

    }

    onProductSelect(event, value) {

        console.log('#onProductSelect->', event, value, arguments)
    }

    onRechargeInfoFinished() {

    }

    render() {
        const { open, shopList } = this.props;

        console.log('shopList - ', this.props)
        const actions = [
      <FlatButton
        label="取消"
        secondary={true}
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="充值"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onRechargeInfoFinished}
      />,
    ];

        return (
            <div>
                <Dialog
                    title="商品列表"
                    actions={actions}
                    modal={false}
                    open={open}
                    onRequestClose={this.props.handleClose}
                    contentStyle={customContentStyle}
                    autoScrollBodyContent={true}
                    >
                        
                            <div style={{'OVERFLOWY': 'auto', 'OVERFLOWX': 'hidden'}}>
                                <RadioButtonGroup name="product" ref="product" onChange={this.onProductSelected}>
                                {
                                    _.map(shopList, (product, index) => {

                                        return <RadioButton
                                            key={product.id}
                                            value={product.id}
                                            label={product.title + ' - ' + product.desc + ' - ' + '金币:'+ product.gold + ' - 价钱:' + product.amount}
                                            style={styles.radioButton} />

                                    })
                                }

                            </RadioButtonGroup>
                            
                            <br />
                            {'上传附件(转账凭证): ......'}
                            </div>
                        
                </Dialog>
            </div>
        );
    }
}

