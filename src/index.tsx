export { default as Test2 } from './component/Test1';
export * from './component/Swagchat';
export * from './component/RoomList/RoomList';
export * from './component/Message/MessageList';
export * from './component/Search/SearchText';
export * from './component/Search/SearchResultTab';
export * from './component/Search/SearchResultView';

// ##################################################

import { Client } from 'swagchat-sdk';
import { store } from 'swagchat-sdk';
import { setClientActionCreator, IClientParams } from 'swagchat-sdk';
export { IClientParams } from 'swagchat-sdk';

export function init(params: IClientParams) {
  store.dispatch(setClientActionCreator(
    new Client({
      apiEndpoint: params.apiEndpoint, // 'http://localhost:8000/v0',
      wsEndpoint: params.wsEndpoint ? params.wsEndpoint : undefined, // 'ws://localhost:9100/v0',
      accessToken: params.accessToken,
      userId: params.userId,
      username: params.username,
    })
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
    MuiButton: {
      raised: {
        boxShadow: 'none',
      },
    },
    MuiAppBar: {
      root: {
        boxShadow: 'none',
      },
    },
    MuiCardMedia: {
      root: {
        boxShadow: 'none',
      },
    },
    MuiPaper: {
      shadow2: {
        boxShadow: 'none',
      },
    }
  },
});

// ##################################################

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
const clientParams = {
  apiEndpoint: 'http://customer0001.swagchat.io:8000/chat-api',
  wsEndpoint: 'ws://customer0001.swagchat.io:8000/rtm-api/v0',
  // tslint:disable-next-line:max-line-length
  accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2ZnRRR3gyTWNHSGdUbmJFUGRIU3J3LTJjSzRHLThEbUN0eFhKbU9wRWZzIn0.eyJqdGkiOiI4NThhNWMyYi02OGM2LTRjYTktOGVhZC1kYzhjZTUxYmNjODciLCJleHAiOjE1MTk4MjYxODEsIm5iZiI6MCwiaWF0IjoxNTE5ODA0NTgxLCJpc3MiOiJodHRwOi8vYWNjb3VudHMuc3dhZ2NoYXQuaW8vYXV0aC9yZWFsbXMvY3VzdG9tZXIwMDAxLnN3YWdjaGF0LmlvIiwiYXVkIjoiYnJvd3NlciIsInN1YiI6IjE1NzI4NmI2LTRjOGYtNDA3Mi04MWI4LTUxZjhlNDdmY2UwZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJyb3dzZXIiLCJub25jZSI6ImY1YTFhM2FlLWM2ZmYtNDQ5My04NzUzLTUxZWI1NTk4NGEyMyIsImF1dGhfdGltZSI6MTUxOTgwNDU3Miwic2Vzc2lvbl9zdGF0ZSI6IjYyZjA2Yzc2LWVlMmQtNDg5Yi04N2MzLTZiODVlOTgzNDIwYyIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2N1c3RvbWVyMDAwMS5zd2FnY2hhdC5pbzozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhZG1pbiIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJuYW1lIjoic2hpbmljaGkgbWlub2JlIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2hpbmljaGkubWlub2JlQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJzaGluaWNoaSIsImZhbWlseV9uYW1lIjoibWlub2JlIiwiZW1haWwiOiJzaGluaWNoaS5taW5vYmVAZ21haWwuY29tIn0.ac6d1gjfzOMh1kcsVfK-HX08jNOxN56v4WHDo0CE6SCUPwLlXbAFDXKsziFjtFmk8mcIinY1KhPmQWDVHJz0NTHuEooAKPYVRqvGyUwXIciJiwyCLhozQnmK9pQNnIHZP3V4EHUMImPc_XGQlndo7YMwxxjTrYl8X2NBPYRCahcFrX-dQ9xUVrw8enO_Vb8VnVFRNdlId8SZzHa7GbQqyRkzd2DsdAKSKi9_tW0Nxwoe38_BP0MELYEDyLiXkrzWnbfiSMviERbfv3tcE4cWDygFdbl1oqknjAwtVDyWGvYtuCiTJupmzF40904X77s8OVPFTeoRV6oae02qgocKWw',
  userId: '157286b6-4c8f-4072-81b8-51f8e47fce0e',
  username: 'shinichi.minobe@gmail.com',
};

ReactDOM.render(
  <App clientParams={clientParams} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
