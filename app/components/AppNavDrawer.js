import React from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';


import {Link} from 'react-router';

const SelectableList = MakeSelectable(List);

const AppNavDrawer = React.createClass({

  propTypes: {
    docked: React.PropTypes.bool.isRequired,
    location: React.PropTypes.object.isRequired,
    onRequestChangeList: React.PropTypes.func.isRequired,
    onRequestChangeNavDrawer: React.PropTypes.func.isRequired,
    open: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
  },

  getInitialState: () => {
    return ({
    });
  },

  componentDidMount: function() {
    const self = this;
    
  },

  
  handleTouchTapHeader() {
    this.context.router.push('/');
    this.props.onRequestChangeNavDrawer(false);
  },

  styles: {
    logo: {
      cursor: 'pointer',
      fontSize: 24,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: cyan500,
      paddingLeft: spacing.desktopGutter,
      marginBottom: 8,
    }
  },

  render() {
    const {
      location,
      docked,
      onRequestChangeNavDrawer,
      onRequestChangeList,
      open,
      style,
    } = this.props;

    return (
      <Drawer
        style={style}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeNavDrawer}
        containerStyle={{zIndex: zIndex.navDrawer - 100}}
      >
        <div style={this.styles.logo} onTouchTap={this.handleTouchTapHeader}>
          eRun
        </div>

        
        <SelectableList
          valueLink={{value: location.pathname, requestChange: onRequestChangeList}}
        >
          <Link to="/user"><ListItem primaryText="玩家管理" value="/user" /></Link>
          <ListItem primaryText="订单管理" value="/order" />
          <ListItem
            primaryText="兑换管理"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="兑换列表" value="/exchange/list" />,
              <ListItem primaryText="兑换记录" value="/exchange/record" />,
            ]}
          />
          <ListItem primaryText="活动管理" value="/exchange/list" />
          <ListItem
            primaryText="游戏管理"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="游戏公告发送" value="/exchange/list" />,
              <ListItem primaryText="系统邮件维护" value="/exchange/record" />,
              <Divider />,
              <ListItem primaryText="苹果审核开关" value="/exchange/list" />,
              <ListItem primaryText="游戏版本设置" value="/exchange/record" />,
            ]}
          />
          
          <ListItem
            primaryText="统计分析"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="活跃用户" value="/exchange/list" />,
              <ListItem primaryText="新增用户" value="/exchange/record" />,
              <Divider />,
              <ListItem primaryText="留存率" value="/exchange/list" />,
              <ListItem primaryText="..." value="/exchange/record" />,
            ]}
          />
          
          <ListItem
            primaryText="系统管理"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="账号管理" value="/exchange/list" />,
            ]}
          />
          
          
        </SelectableList>
        <Divider />
        <SelectableList
          valueLink={{value: '', requestChange: this.handleRequestChangeLink}}
        >
          <Subheader>Resources</Subheader>
          
        </SelectableList>
      </Drawer>
    );
  },
});

export default AppNavDrawer;
