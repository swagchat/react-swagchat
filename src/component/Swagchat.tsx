import * as React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { init, theme } from '../';
import { store } from '../store';

export interface SwagchatProps {
  inner?: React.ReactNode;
}

export class Swagchat extends React.Component<SwagchatProps> {
  constructor(props: SwagchatProps, context: {}) {
    super(props, context);
    init();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          {this.props.inner}
        </Provider>
      </MuiThemeProvider>
    );
  }
}
