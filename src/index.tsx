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
      apiEndpoint: params.apiEndpoint,
      wsEndpoint: params.wsEndpoint ? params.wsEndpoint : undefined,
      accessToken: params.accessToken,
      userId: params.userId,
      username: params.username,
      paths: params.paths ? params.paths : undefined,
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
        minWidth: 320,
      },
    },
    MuiButton: {
      raised: {
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
    },
    // MuiTabs: {
    //   root: {
    //     minHeight: 40,
    //   },
    // },
    MuiToolbar: {
      root: {
        minHeight: 40,
        '@media (min-width: 600px)': {
          minHeight: 40,
        }
      },
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
  accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4U2pHeWdsT2lHMGpaandzX0hEUVNleEdiV0F4VjdiY1YyU3pYdkdjb2tZIn0.eyJqdGkiOiI5NTMzNWYwNy0zMDcwLTRjOTMtYmI0Yi1lMjMzMDM3ZTJmNTQiLCJleHAiOjE1MjAyMDQ5OTMsIm5iZiI6MCwiaWF0IjoxNTIwMTY5MjYyLCJpc3MiOiJodHRwOi8vYWNjb3VudHMuc3dhZ2NoYXQuaW8vYXV0aC9yZWFsbXMvY3VzdG9tZXIwMDAxLnN3YWdjaGF0LmlvIiwiYXVkIjoiYnJvd3NlciIsInN1YiI6Ijk1OGM3NzVhLTlkNzEtNGIyNi04YjE3LTVhMjEwOTI2YTc1ZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJyb3dzZXIiLCJub25jZSI6ImJiNjk2YWI1LWUwNTgtNGU1OS1iMTc2LWM0YTA5MDFkMTBhOSIsImF1dGhfdGltZSI6MTUyMDE2ODk5Mywic2Vzc2lvbl9zdGF0ZSI6ImQxYzk4OWNhLWZiODgtNGI5Yi04NmI4LTRhNWRmYmI2OWMyZiIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2N1c3RvbWVyMDAwMS5zd2FnY2hhdC5pbzozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sIm5hbWUiOiJzaGluaWNoaSBtaW5vYmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzaGluaWNoaS5taW5vYmVAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6InNoaW5pY2hpIiwiZmFtaWx5X25hbWUiOiJtaW5vYmUiLCJlbWFpbCI6InNoaW5pY2hpLm1pbm9iZUBnbWFpbC5jb20ifQ.QnwjBcccQE8WD2MNh13uZEj2hiV4yKZkOr5K7ljBeAFRVWgCpCWltSHY0WMiBEARz2XR1hShQAI2FNb4Aaq4T-JsfzFSuSSTxuh6L7mnVGx5TUhnCcUWpfqCYNeR9DKzl5jXAJE6YtIR4Nk01GSPhfWKsE5Uf0oalKrzUHhZtQ7boSQNl7Oy_g0txIR4wzmwOj-4y7QF6sTXglSBSH_ed49CCkZVhK5Tz6gbE0Z4jKvLp1nQg3bX-E5-qOVtByODRAFEoFpRy8FCVFKwZxN9BSMaP3luoZK8Eu9TxC9e5S-XA8WURiW3chOGdARtvBPZhmCSl9Rmw3wWxCDl1LFBDA',
  userId: '958c775a-9d71-4b26-8b17-5a210926a75e',
  username: 'minobe',
  paths: {
    roomListPath: '/rooms',
  }
};

ReactDOM.render(
  <App clientParams={clientParams} />,
  document.getElementById('swag') as HTMLElement
);
registerServiceWorker();

// ##################################################

// For browser
import { renderMessenger } from './App';
// tslint:disable-next-line:no-any
(window as any).Swag = {};
// tslint:disable-next-line:no-any
(window as any).Swag.renderMessenger = renderMessenger;
