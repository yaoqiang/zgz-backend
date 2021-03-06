import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';

import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import {List, ListItem, MakeSelectable} from 'material-ui/List';

import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700, grey100, grey500, grey700, grey900, darkWhite, lightWhite, deepPurple700} from 'material-ui/styles/colors';


import StyleResizable from 'material-ui/utils/styleResizable';

import { mixin } from 'core-decorators';


import AppNavDrawer from 'components/AppNavDrawer';

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();



const muiTheme = getMuiTheme({
  palette: {

  },
}, {
    
  });



@mixin(StyleResizable)
class App extends Component {

  constructor(props) {
    super(props);
    this.getStyles = this.getStyles.bind(this);
    this.handleTouchTapLeftIconButton = this.handleTouchTapLeftIconButton.bind(this);
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
    this.handleRequestChangeList = this.handleRequestChangeList.bind(this);
    this.handleChangeMuiTheme = this.handleRequestChangeList.bind(this);
  }


  componentWillMount() {
    this.setState({
      muiTheme: this.state.muiTheme,
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  }

  state = {
    muiTheme: getMuiTheme(),
    navDrawerOpen: false,
  }

  static propTypes = {
    children: React.PropTypes.node,
    location: React.PropTypes.object,
  }
  
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  childContext = {
    muiTheme: this.state.muiTheme,
  }

  getStyles() {
    const styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      content: {
        margin: spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      footer: {
        backgroundColor: grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356,
      },
      iconButton: {
        color: darkWhite,
      },
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
      this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }

    return styles;
  }

  handleTouchTapLeftIconButton() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  }

  handleChangeRequestNavDrawer(open) {
    this.setState({
      navDrawerOpen: open,
    });
  }

  handleRequestChangeList(event, value) {
    this.context.router.push(value);
    this.setState({
      navDrawerOpen: false,
    });
  }

handleChangeMuiTheme(muiTheme) {
    this.setState({
      muiTheme: muiTheme,
    });
  }

  render() {
    const auth = this.props.auth;

    const {
      location,
      children,
    } = this.props;

    let {
      navDrawerOpen,
    } = this.state;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const router = this.context.router;
    const styles = this.getStyles();
    
    
    let docked = false;
    let showMenuIconButton = true;
    const title = 'eRun'
    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE) && title !== '') {
      docked = true;
      navDrawerOpen = true;
      showMenuIconButton = false;

      styles.navDrawer = {
        zIndex: styles.appBar.zIndex - 1,
      };
      styles.root.paddingLeft = 256;
      styles.footer.paddingLeft = 256;
    }

    return (
       <MuiThemeProvider muiTheme={muiTheme}>

        <div>
          {!auth.loggedIn &&
            <Login />
          }
          {auth.loggedIn &&
            <div>
              <AppBar
                onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
                title={title}
                zDepth={0}
                style={styles.appBar}
                showMenuIconButton={showMenuIconButton}
                />
              {title !== '' ?
                <div style={prepareStyles(styles.root) }>
                  <div style={prepareStyles(styles.content) }>
                    {React.cloneElement(children, {
                      onChangeMuiTheme: this.handleChangeMuiTheme,
                    }) }
                  </div>
                </div> :
                children
              }
              <AppNavDrawer
                style={styles.navDrawer}
                location={location}
                docked={docked}
                onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
                onRequestChangeList={this.handleRequestChangeList}
                open={navDrawerOpen}
                />

            </div>

          }

        </div>
      </MuiThemeProvider>
    );
  }
}



function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(App);
