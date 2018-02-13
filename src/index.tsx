export { default as Test2 } from './component/Test1';
export * from './component/Swagchat';
export * from './component/RoomList/RoomList';
export * from './component/Message/MessageList';
export * from './component/Search/SearchText';
export * from './component/Search/SearchResultTab';
export * from './component/Search/SearchResultView';

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
import { common } from 'material-ui/colors';
export const theme: Theme = createMuiTheme({
  palette: {
    // type: 'dark',
    background: {
      default: common.white,
      paper: common.white,
    },
  },
  overrides: {
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
import './index.css';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
