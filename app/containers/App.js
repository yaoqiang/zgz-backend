import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {darkWhite, lightWhite, grey900} from 'material-ui/styles/colors';
import AppNavDrawer from '../components/AppNavDrawer';
import FullWidthSection from '../components/FullWidthSection';

import withWidth, {SMALL, LARGE} from '../utils/withWidth';


import Login from 'containers/Login';


import themeDecorator from 'material-ui/styles/themeDecorator';



import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();


const githubButton = (
  <IconButton
    iconClassName="muidocs-icon-custom-github"
    href="https://github.com/callemall/material-ui"
    linkButton={true}
    />
);


class App extends Component {

  getInitialState() {
    return {
      muiTheme: getMuiTheme(),
      navDrawerOpen: false,
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
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

    if (this.props.width === MEDIUM || this.props.width === LARGE) {
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
    const title = 'RRRRRR';

    let docked = false;
    let showMenuIconButton = true;

    if (this.isDeviceSize(styleResizable.statics.Sizes.LARGE) && title !== '') {
      docked = true;
      navDrawerOpen = true;
      showMenuIconButton = false;

      styles.navDrawer = {
        zIndex: styles.appBar.zIndex - 1,
      };
      styles.root.paddingLeft = 256;
      styles.footer.paddingLeft = 256;
    }
    
    
    
    
    const auth = this.props.auth;
    
    
    
    return (
      <div>
      
        <AppBar
          onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
          title={title}
          zDepth={0}
          iconElementRight={githubButton}
          style={styles.appBar}
          showMenuIconButton={showMenuIconButton}
        />
        {title !== '' ?
          <div style={prepareStyles(styles.root)}>
            <div style={prepareStyles(styles.content)}>
              {React.cloneElement(children, {
                onChangeMuiTheme: this.handleChangeMuiTheme,
              })}
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
        
        <FullWidthSection style={styles.footer}>
          <p style={prepareStyles(styles.p)}>
            {'Hand crafted with love by the engineers at '}
            <a style={styles.a} href="http://www.call-em-all.com/Careers">
              Call-Em-All
            </a>
            {' and our awesome '}
            <a
              style={prepareStyles(styles.a)}
              href="https://github.com/callemall/material-ui/graphs/contributors"
            >
              contributors
            </a>.
          </p>
          <IconButton
            iconStyle={styles.iconButton}
            iconClassName="muidocs-icon-custom-github"
            href="https://github.com/callemall/material-ui"
            linkButton={true}
          />
        </FullWidthSection>
      
        

      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
}
App.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object,
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(withWidth()(themeDecorator(getMuiTheme(null, { userAgent: 'all' }))(App)));
