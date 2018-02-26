import * as React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { init, theme } from '../';
import { store, fetchUserRequestActionCreator, IClientParams } from 'swagchat-sdk';

export interface SwagchatProps {
  component?: React.ReactNode;
  clientParams: IClientParams;
}

export class Swagchat extends React.Component<SwagchatProps> {
  constructor(props: SwagchatProps, context: {}) {
    super(props, context);
    if (store.getState().client.client === null) {
      init(props.clientParams);
      store.dispatch(fetchUserRequestActionCreator());
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          {this.props.component}
        </Provider>
      </MuiThemeProvider>
    );
  }
}
