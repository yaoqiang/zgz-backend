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

        
        <SelectableList value={location.pathname} onChange={onRequestChangeList}>
          <ListItem primaryText="玩家管理" key={1} value="/user" />
          <ListItem primaryText="订单管理" key={2} value="/order" />
          <ListItem
            primaryText="兑换管理"
            primaryTogglesNestedList={true}
            key={3}
            nestedItems={[
              <ListItem primaryText="兑换列表" value="/exchange/list" key={3.1}/>,
              <ListItem primaryText="兑换记录" value="/exchange/record" key={3.2}/>,
            ]}
          />
          <ListItem primaryText="活动管理" value="/activity/list" key={4}/>
          <ListItem
            primaryText="游戏管理"
            primaryTogglesNestedList={true}
            key={5}
            nestedItems={[
              <ListItem primaryText="游戏公告发送" value="/game/bbs" key={5.1}/>,
              <ListItem primaryText="系统邮件维护" value="/game/mail" key={5.2}/>,
              <Divider />,
              <ListItem primaryText="苹果审核开关" value="/game/apple" key={5.3}/>,
              <ListItem primaryText="游戏版本设置" value="/game/version" key={5.4}/>,
            ]}
          />
          
          <ListItem
            primaryText="统计分析"
            primaryTogglesNestedList={true}
            key={6}
            nestedItems={[
              <ListItem primaryText="活跃用户" value="/analysis/list" key={6.1}/>,
              <ListItem primaryText="新增用户" value="/analysis/record" key={6.2}/>,
              <Divider />,
              <ListItem primaryText="留存率" value="/analysis/list" key={6.3}/>,
              <ListItem primaryText="..." value="/analysis/record" key={6.4}/>,
            ]}
          />
          
          <ListItem
            primaryText="系统管理"
            primaryTogglesNestedList={true}
            key={7}
            nestedItems={[
              <ListItem primaryText="账号管理" value="/system/list" key={7.1}/>,
            ]}
          />
          
          
        </SelectableList>
        <Divider />
        <SelectableList value="" onChange={this.handleRequestChangeLink}>
          <Subheader>Resources</Subheader>
          
        </SelectableList>
      </Drawer>
    );
  },
});

export default AppNavDrawer;
