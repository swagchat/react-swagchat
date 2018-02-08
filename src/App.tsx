import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { Client, IRealtimeConfig } from 'swagchat-sdk';
import { store, routerHistory } from './store';
import Main from './component/Main';
import { Swagchat } from './component/Swagchat';
import { Container1 } from './component/Component1';
import { RoomList } from './component/RoomList/RoomList';
import { MessageList } from './component/Message/MessageList';
import { setClientActionCreator, setAuthParamsActionCreator } from './action/client';
import { fetchUserRequestActionCreator } from './action/user';

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
  constructor(props: {}, context: {}) {
    super(props, context);

    const realtimeConfig: IRealtimeConfig = {
      endpoint: 'ws://localhost:9100/v0',
    };

    store.dispatch(setClientActionCreator(
      new Client({
        apiKey: '',
        apiSecret: '',
        apiEndpoint: 'http://localhost:8000/v0',
        realtime: realtimeConfig,
      })
    ));

    store.dispatch(setAuthParamsActionCreator(
      '00581ea9-3547-4c81-930c-a3ed042e4b21',
      'dummy-token',
    ));

    store.dispatch(fetchUserRequestActionCreator());
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <ConnectedRouter history={routerHistory}>
            <Switch>
              <Route exact={true} path="/" render={() => (<Main component={<Container1 name="test" />} />)} />
              <Route exact={true} path="/roomList" render={() => (<Swagchat component={<RoomList />} />)} />
              <Route exact={true} path="/message" render={() => (<Swagchat component={<MessageList />} />)} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
