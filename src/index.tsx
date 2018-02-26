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

// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';
// import registerServiceWorker from './registerServiceWorker';
// const clientParams = {
//   apiEndpoint: 'http://customer0001.swagchat.io:8000/chat-api',
//   wsEndpoint: 'ws://customer0001.swagchat.io:8000/rtm-api/v0',
//   // tslint:disable-next-line:max-line-length
//   accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2ZnRRR3gyTWNHSGdUbmJFUGRIU3J3LTJjSzRHLThEbUN0eFhKbU9wRWZzIn0.eyJqdGkiOiI3MDYyNTdjOC1lMGUzLTQ0MDktYjM2Ni1lMzNhMGRmZTU3MmIiLCJleHAiOjE1MTk2MzcyMTgsIm5iZiI6MCwiaWF0IjoxNTE5NjMwMDE4LCJpc3MiOiJodHRwOi8vYWNjb3VudHMuc3dhZ2NoYXQuaW8vYXV0aC9yZWFsbXMvY3VzdG9tZXIwMDAxLnN3YWdjaGF0LmlvIiwiYXVkIjoiYnJvd3NlciIsInN1YiI6IjkzMGQ5NTFhLWZhNzctNDA5Yy04OWI5LThkMzAxODU0OWQxNyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJyb3dzZXIiLCJub25jZSI6IjhjODAxZWYxLTAyMTctNDkyMS04MjQ0LWY1NzYyMWZlYTA1ZiIsImF1dGhfdGltZSI6MTUxOTYyOTkyMCwic2Vzc2lvbl9zdGF0ZSI6ImIxYWQ4YWUyLTM2OTAtNGNiNi1iZTE4LTk3ZTZlZGI1NzM2OSIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2N1c3RvbWVyMDAwMS5zd2FnY2hhdC5pbzozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhZG1pbiIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJuYW1lIjoi55yf5LiAIOe-jua_g-mDqCIsInByZWZlcnJlZF91c2VybmFtZSI6InN3YWdjaGF0MDAwMSIsImdpdmVuX25hbWUiOiLnnJ_kuIAiLCJmYW1pbHlfbmFtZSI6Iue-jua_g-mDqCIsImVtYWlsIjoic3dhZ2NoYXQwMDAxQGdtYWlsLmNvbSJ9.IP0N937bYnP1qL_AYRD2NEDq5pkp9tpHbE5UmpDuvU7u4cPdMx7vGNliLUPrxnJMCU7b8HFXkT_YaMfF0RA1zyCSaW4nrjMkgyHFC2MWpVbxLemISSvrLTI7FjaAeMHhG_Rf_XTdTn3qjaLCEPZlAAQ11BfyTq68Owhy39PrFyz_E8OGzkh0LtL9bAJ9mrRWkD-6zRw2bb-MUsc0OXb8f5sZeKHsWzHmACRQCU-bjcA3L-fbtPWSHhxwgEiG7TrmqjTnZX2nmqeyjsQwLoQ_wxrBskHr6G9rsjY6N6U4ZQxOBJUljgcQwgSQeNteXsMS3OZlcug5rPxBrnpMU0Ov8A',
//   userId: '930d951a-fa77-409c-89b9-8d3018549d17',
//   username: 'swagchat0001',
// };

// ReactDOM.render(
//   <App clientParams={clientParams} />,
//   document.getElementById('root') as HTMLElement
// );
// registerServiceWorker();
