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
import { RoomSetting } from './component/RoomSetting/RoomSetting';
import { Profile } from './component/Profile/Profile';

export interface AppProps {
  clientParams: IClientParams;
}

class App extends React.Component<AppProps, {}> {
  constructor(props: AppProps, context: {}) {
    super(props, context);
    init(props.clientParams);
  }

  render() {
    const { clientParams } = this.props;
    let roomListPath = '/rooms';
    let messageListPath = '/messages/:roomId';
    let roomSettingPath = '/roomSetting/:roomId';
    let profilePath = '/profile/:userId';

    if (clientParams.paths !== undefined) {
      roomListPath = clientParams.paths.roomListPath ? clientParams.paths.roomListPath : roomListPath;
      messageListPath = clientParams.paths.messageListPath ? clientParams.paths.messageListPath : messageListPath;
      roomSettingPath = clientParams.paths.roomSettingPath ? clientParams.paths.roomSettingPath : roomSettingPath;
      profilePath = clientParams.paths.profilePath ? clientParams.paths.profilePath : profilePath;
    }

    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <ConnectedRouter history={routerHistory}>
            <Switch>
              <Route exact={true} path="/" render={() => (<Top />)} />
              <Route
                exact={true}
                path={roomListPath}
                render={() => (<RoomList enablePush={true} enableSearch={true} enableSearchResult={true} />)}
              />
              <Route
                exact={true}
                path={messageListPath}
                render={() => (<MessageList />)}
              />
              <Route
                exact={true}
                path={roomSettingPath}
                render={() => (<RoomSetting />)}
              />
              <Route
                exact={true}
                path={profilePath}
                render={() => (<Profile />)}
              />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
