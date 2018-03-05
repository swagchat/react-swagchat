export * from './component/Swagchat';
export * from './component/RoomList';
export * from './component/MessageList';
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
import { BORDER_COLOR } from './setting';
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
        borderBottom: '1px solid ' + BORDER_COLOR,
      },
      colorPrimary: {
        backgroundColor: 'white',
      }
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
    MuiTabs: {
      root: {
        minHeight: 40,
      },
    },
    MuiTab: {
      root: {
        height: 40,
      },
      label: {
        fontSize: '0.8125rem',
        '@media (min-width: 960px)': {
          fontSize: '0.8125rem',
        },
      },
      labelContainer: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        '@media (min-width: 960px)': {
          paddingLeft: 0,
          paddingRight: 0,
        }
      },
    },
    MuiToolbar: {
      root: {
        justifyContent: 'left' as 'space-around',
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
  accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4U2pHeWdsT2lHMGpaandzX0hEUVNleEdiV0F4VjdiY1YyU3pYdkdjb2tZIn0.eyJqdGkiOiJmNzNkZTkxYS0yMWQ1LTQzOTMtYjllMy1jYjU3MjA1Y2YzNzciLCJleHAiOjE1MjAyNTQ0MjgsIm5iZiI6MCwiaWF0IjoxNTIwMjE4NDMxLCJpc3MiOiJodHRwOi8vYWNjb3VudHMuc3dhZ2NoYXQuaW8vYXV0aC9yZWFsbXMvY3VzdG9tZXIwMDAxLnN3YWdjaGF0LmlvIiwiYXVkIjoiYnJvd3NlciIsInN1YiI6Ijk1OGM3NzVhLTlkNzEtNGIyNi04YjE3LTVhMjEwOTI2YTc1ZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJyb3dzZXIiLCJub25jZSI6IjgwNWViM2Q0LWUxMzEtNDY2OS04MzMwLWZhNWQ1NzQ1NGIwMiIsImF1dGhfdGltZSI6MTUyMDIxODQyOCwic2Vzc2lvbl9zdGF0ZSI6IjY2Yzk1OTU4LTY1N2EtNDJmMS1iZjkyLWMxZjJhMDQ3ODkyYyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2N1c3RvbWVyMDAwMS5zd2FnY2hhdC5pbzozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sIm5hbWUiOiJzaGluaWNoaSBtaW5vYmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzaGluaWNoaS5taW5vYmVAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6InNoaW5pY2hpIiwiZmFtaWx5X25hbWUiOiJtaW5vYmUiLCJlbWFpbCI6InNoaW5pY2hpLm1pbm9iZUBnbWFpbC5jb20ifQ.lusHqQ_oBBzoDl4n93GYs1auk8ldEDdn0mzPGYbzkVKk06wAc_cYDIupzMd4kWjjZDOHU_drBPI_rqft_BabIee36D6roDcLi-WZNEdrq_UU6OsgiumyMnLrwCSD23Oox48ysLTZNhnvm9RIjUqvgSBfsnlvOzCQB9mcAKe-CrmKT915ATV2rNn3DVPGCut7ZCGd_Yzgc4CGCIEgU5CqJuO4UPNyHJFlxO9qDwArV4S_zwrReHjYsLcpHXVXSEciDSX0k_iaZUsdKiTvWel84McgGyPiOQp7vblN5HhPVMoIL61d1wndIKc920lk1b9apn7hE03R4wBI4eID-rDn1A',
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
