export { default as Test2 } from './component/Test1';
export * from './component/RoomList/RoomList';
export * from './component/Message/MessageList';
export * from './component/Swagchat';

// ##################################################

import { Client, IRealtimeConfig } from 'swagchat-sdk';
import { store } from 'swagchat-sdk';
import { setClientActionCreator, setAuthParamsActionCreator } from 'swagchat-sdk';
export function init() {
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
}

// ##################################################

import { createMuiTheme, Theme } from 'material-ui/styles';
export const theme: Theme = createMuiTheme({
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
    MuiAppBar: {
      root: {
        boxShadow: 'none',
      }
    },
  },
  
});

// ##################################################

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
