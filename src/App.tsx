import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { store, routerHistory, IClientParams } from 'swagchat-sdk';
import { init, theme } from './';
import { Top } from './component/Top';
import { RoomList } from './component/RoomList';
import { MessageList } from './component/MessageList';
import { RoomSetting } from './component/RoomSetting';
import { Profile } from './component/Profile';
import { Account } from './component/Account';
import { NotFound } from './component/NotFound';

export interface AppProps {
  clientParams: IClientParams;
}

class App extends React.Component<AppProps, {}> {
  constructor(props: AppProps, context: {}) {
    super(props, context);
    window.console.log('props', props);
    init(props.clientParams);
  }

  render() {
    const { clientParams } = this.props;
    let roomListPath = '/rooms';
    let messageListPath = '/messages/:roomId';
    let roomSettingPath = '/roomSetting/:roomId';
    let profilePath = '/profile/:userId';
    let accountPath = '/account';

    if (clientParams.paths !== undefined) {
      roomListPath = clientParams.paths.roomListPath ? clientParams.paths.roomListPath : roomListPath;
      messageListPath = clientParams.paths.messageListPath ? clientParams.paths.messageListPath : messageListPath;
      roomSettingPath = clientParams.paths.roomSettingPath ? clientParams.paths.roomSettingPath : roomSettingPath;
      profilePath = clientParams.paths.profilePath ? clientParams.paths.profilePath : profilePath;
      accountPath = clientParams.paths.accountPath ? clientParams.paths.accountPath : accountPath;
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
                render={() => (<Profile isModal={false} />)}
              />
              <Route
                exact={true}
                path={accountPath}
                render={() => (<Account isModal={false} />)}
              />
              <Route
                render={() => (<NotFound />)}
              />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;

export const renderMessenger = (params: AppProps) => {
  window.console.log('params', params);
  ReactDom.render(
    <App clientParams={params.clientParams}/>, document.getElementById('swag')
  );
};
