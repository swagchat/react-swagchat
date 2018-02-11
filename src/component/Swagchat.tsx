import * as React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import { init, theme } from '../';
import { store, fetchUserRequestActionCreator } from 'swagchat-sdk';

export interface SwagchatProps {
  component?: React.ReactNode;
}

export class Swagchat extends React.Component<SwagchatProps> {
  constructor(props: SwagchatProps, context: {}) {
    super(props, context);
    init();
    store.dispatch(fetchUserRequestActionCreator());
  }

  render() {
    return (
      <Reboot>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            {this.props.component}
          </Provider>
        </MuiThemeProvider>
      </Reboot>
    );
  }
}
