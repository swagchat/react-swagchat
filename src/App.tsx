import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import { store, routerHistory } from 'swagchat-sdk';
import { init, theme } from './';
import Main from './component/Main';
import { Swagchat } from './component/Swagchat';
import { Container1 } from './component/Component1';
import { RoomList } from './component/RoomList/RoomList';
import { MessageList } from './component/Message/MessageList';

class App extends React.Component {
  constructor(props: {}, context: {}) {
    super(props, context);
    init();
  }

  render() {
    return (
      <Reboot>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <ConnectedRouter history={routerHistory}>
              <Switch>
                <Route exact={true} path="/" render={() => (<Main component={<Container1 name="test" />} />)} />
                <Route
                  exact={true}
                  path="/rooms"
                  render={() => (<Swagchat component={<RoomList isPush={true} />} />)}
                />
                <Route
                  exact={true}
                  path="/messages/:messageId"
                  render={() => (<Swagchat component={<MessageList />} />)}
                />
              </Switch>
            </ConnectedRouter>
          </Provider>
        </MuiThemeProvider>
      </Reboot>
    );
  }
}

export default App;
