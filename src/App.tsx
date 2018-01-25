import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { store, routerHistory } from './store';
import Component1 from './component/Component1';
import Login from './component/Login/Login';

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
  },
  overrides: {
    MuiButton: {
      root: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // borderRadius: 3,
        // border: 0,
        // color: 'white',
        // height: 48,
        // padding: '0 30px',
        // boxShadow: 'none',
      },
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <ConnectedRouter history={routerHistory}>
            <div>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
                <li><Link to="/login">login</Link></li>
              </ul>
              <Switch>
                <Route exact={true} path="/" render={() => (<Component1 name="home" />)} />
                <Route exact={true} path="/about" render={() => (<Component1 name="about" />)} />
                <Route exact={true} path="/topics" render={() => (<Component1 name="topics" />)} />
                <Route exact={true} path="/login" render={() => (<Login />)} />
              </Switch>
            </div>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
