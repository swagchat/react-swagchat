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
const clientParams = {
  apiEndpoint: 'http://customer0001.swagchat.io:8000/chat-api',
  wsEndpoint: 'ws://customer0001.swagchat.io:8000/rtm-api/v0',
  // tslint:disable-next-line:max-line-length
  accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2ZnRRR3gyTWNHSGdUbmJFUGRIU3J3LTJjSzRHLThEbUN0eFhKbU9wRWZzIn0.eyJqdGkiOiJjZDM2OTgyZi1iYzBjLTRkMTEtYmIzMi1mZmFjZTM3MTUwMmMiLCJleHAiOjE1MTk4MDQ0MzgsIm5iZiI6MCwiaWF0IjoxNTE5NzgyODM4LCJpc3MiOiJodHRwOi8vYWNjb3VudHMuc3dhZ2NoYXQuaW8vYXV0aC9yZWFsbXMvY3VzdG9tZXIwMDAxLnN3YWdjaGF0LmlvIiwiYXVkIjoiYnJvd3NlciIsInN1YiI6IjE1NzI4NmI2LTRjOGYtNDA3Mi04MWI4LTUxZjhlNDdmY2UwZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJyb3dzZXIiLCJub25jZSI6IjcyNWY3MWJjLWE3ODMtNGUxZC05ODU1LTM3ZDI4MTM0NmY3NyIsImF1dGhfdGltZSI6MTUxOTc4MjgxOCwic2Vzc2lvbl9zdGF0ZSI6IjMxNWViMGQ5LTU1ZDctNDA2Mi1hMWMxLWZmOGIzYmMxNDU0YiIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2N1c3RvbWVyMDAwMS5zd2FnY2hhdC5pbzozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhZG1pbiIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJuYW1lIjoic2hpbmljaGkgbWlub2JlIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2hpbmljaGkubWlub2JlQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJzaGluaWNoaSIsImZhbWlseV9uYW1lIjoibWlub2JlIiwiZW1haWwiOiJzaGluaWNoaS5taW5vYmVAZ21haWwuY29tIn0.AG8SbNv79a__4hZ-KI3WjIXOMuNLuW95D7JYQvO8D7cwO-9s5-01vtUmdTGlcfy52BnliW1xLpa1P0rymOq5MhtwFBPZzBrflfC2PE0zudNTsfXwRvqTr_ncnwOanXoJ0qWc4Qg6kh2FIyxZ0pB3n0obGpDvZLrEdZejNtpDpFIKq9F2Y2zxNjuRyu4QGVsv6l2-YaGE2JOgXRCbk7dwChJeKgj8U2HcCaoCvxfzbD6vd6TsmgWV11G0GhgLb6z9pt1Ni6fPY2kMeJABuGyRdxF_U5M-2AKHEnKONX-VR7eaHlMl_mo4L0u9R1YZPoPJ6ahlvQsVrj5SV8qgxRfWOA',
  userId: '157286b6-4c8f-4072-81b8-51f8e47fce0e',
  username: 'shinichi.minobe@gmail.com',
};

ReactDOM.render(
  <App clientParams={clientParams} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
