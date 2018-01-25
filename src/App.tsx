import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { store, routerHistory } from './store';
import Main from './component/Main';
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
            <Switch>
              <Route exact={true} path="/" render={() => (<Main />)} />
              <Route exact={true} path="/login" render={() => (<Login />)} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
