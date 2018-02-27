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
  accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2ZnRRR3gyTWNHSGdUbmJFUGRIU3J3LTJjSzRHLThEbUN0eFhKbU9wRWZzIn0.eyJqdGkiOiI4MzE2YmNmZC03OWJiLTRhNmItOTkzYS04YzQ3Zjk2ODdjYWEiLCJleHAiOjE1MTk3Mzg0OTIsIm5iZiI6MCwiaWF0IjoxNTE5NzE2ODkyLCJpc3MiOiJodHRwOi8vYWNjb3VudHMuc3dhZ2NoYXQuaW8vYXV0aC9yZWFsbXMvY3VzdG9tZXIwMDAxLnN3YWdjaGF0LmlvIiwiYXVkIjoiYnJvd3NlciIsInN1YiI6IjE1NzI4NmI2LTRjOGYtNDA3Mi04MWI4LTUxZjhlNDdmY2UwZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJyb3dzZXIiLCJub25jZSI6ImRiZjY3ZGY4LTc2MmEtNDI3OC04N2ZmLWQ0ZTM4ZjcxZjhlOSIsImF1dGhfdGltZSI6MTUxOTcxNjg4OSwic2Vzc2lvbl9zdGF0ZSI6ImM1M2IxYTI4LTI0MmItNGZmOS1hODg2LTJlOTFiNWRhMjhmNiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2N1c3RvbWVyMDAwMS5zd2FnY2hhdC5pbzozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhZG1pbiIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJuYW1lIjoic2hpbmljaGkgbWlub2JlIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2hpbmljaGkubWlub2JlQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJzaGluaWNoaSIsImZhbWlseV9uYW1lIjoibWlub2JlIiwiZW1haWwiOiJzaGluaWNoaS5taW5vYmVAZ21haWwuY29tIn0.Vs8GrSForvdxPsOXppQdFZj_VjYBSaQ3PevbdVJCzOA-poGYVo7Y2WdoC0Sod6qQ1AGjq8lQFXw-W0pFX-Z-Wc8HHMj6l3uThRI3XudMlPxW_c4pl8N9WGhZ-G7nplizaaczUUS1gngdxHgHVBFlOB1hPgvteFP3myZOZLppLmBoNi5Pfj-BHMHflEr6GUnZpzppBTkw650qN504CRm1y53Lx5CicjC8iUcrcHVdEY6xID5Ii0nSCUvtBZg3e_xFu3crqdke2kaPSGhNMOfQ9FYqmV7GNc43mFOeS171eOIwiQQMmoMrTeyyQwJPRWaGkHfDHhHhH9vxFfV2v8VfTA',
  userId: '157286b6-4c8f-4072-81b8-51f8e47fce0e',
  username: 'shinichi.minobe@gmail.com',
};

ReactDOM.render(
  <App clientParams={clientParams} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
