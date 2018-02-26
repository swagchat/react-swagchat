import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { store, routerHistory, IClientParams } from 'swagchat-sdk';
import { init, theme } from './';
import { Top } from './component/Top';
import { RoomList } from './component/RoomList/RoomList';
import { MessageList } from './component/Message/MessageList';

export interface AppProps {
  clientParams: IClientParams;
}

class App extends React.Component<AppProps, {}> {
  constructor(props: AppProps, context: {}) {
    super(props, context);
    init(props.clientParams);
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <ConnectedRouter history={routerHistory}>
            <Switch>
              <Route exact={true} path="/" render={() => (<Top />)} />
              <Route
                exact={true}
                path="/rooms"
                render={() => (<RoomList enablePush={true} enableSearch={true} enableSearchResult={true} />)}
              />
              <Route
                exact={true}
                path="/messages/:messageId"
                render={() => (<MessageList />)}
              />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
