import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  setAddonMessageActionDispatch,
  setCustomAddonMessageActionDispatch,
  setAddonRoomListItemActionDispatch,
  setRoomListTabbarActionCreator,
  setRoomListRoutePathActionCreator,
  setMessageRoutePathActionCreator,
  setRoomSettingRoutePathActionCreator,
  setSelectContactRoutePathActionCreator,
  setClientActionDispatch,
  setAuthParamsActionDispatch,
  store,
  routerHistory,
  IRealtimeConfig,
  Client,
} from 'swagchat-sdk';
import {
  RoomListPage,
  MessagePage,
  RoomSettingPage,
  SelectContactPage,
  IContext,
} from '../containers/';
import {
  PluginMessageText,
  PluginMessageImage,
  PluginMessageSpeech,
} from '../addons/messages';
import {
  PluginRoomListItemRoomAndUserNameWithMessage,
  PluginRoomListItemRoomNameWithMessage,
} from '../addons/roomListItem';

export interface IMessengerProps {
  userId: string;
  accessToken?: string;
  apiEndpoint: string;
  apiKey?: string;
  apiSecret?: string;
  rtmProtocol?: string;
  rtmHost?: string;
  rtmPath?: string;
  roomListRoutePath?: string;
  messageRoutePath?: string;
  roomSettingRoutePath?: string;
  selectContactRoutePath?: string;
  renderDomId?: string;
  tabbar?: React.ReactNode;
  route?: any;
}

export class Messenger extends React.Component<IMessengerProps, {}> {
  public static defaultProps: Partial<IMessengerProps> = {
    userId: '',
    accessToken: '',
    apiEndpoint: '',
    apiKey: '',
    apiSecret: '',
    rtmProtocol: '',
    rtmHost: '',
    rtmPath: '',
    roomListRoutePath: '/',
    messageRoutePath: '/messages',
    roomSettingRoutePath: '/roomSetting',
    selectContactRoutePath: '/selectContact',
    renderDomId: 'swagchat',
  };

  constructor(props: any, context: IContext) {
    super(props, context);

    const {
      route,
      userId,
      accessToken,
      apiEndpoint,
      apiKey,
      apiSecret,
      rtmProtocol,
      rtmHost,
      rtmPath,
      tabbar,
      roomListRoutePath,
      messageRoutePath,
      roomSettingRoutePath,
      selectContactRoutePath,
    } = props;

    const scMessagePlugins = route && route.scMessagePlugins ? route.scMessagePlugins : [
      new PluginMessageText(),
      new PluginMessageImage(),
      new PluginMessageSpeech(),
    ];
    setAddonMessageActionDispatch(scMessagePlugins);

    const scCustomMessagePlugins = route && route.scMessagePlugins ? route.scMessagePlugins : [
      new PluginMessageText(),
      new PluginMessageImage(),
      new PluginMessageSpeech(),
    ];
    setCustomAddonMessageActionDispatch(scCustomMessagePlugins);

    const scRoomListItemPlugins = route && route.scRoomListItemPlugins ? route.scRoomListItemPlugins : {
      1: new PluginRoomListItemRoomNameWithMessage(),
      2: new PluginRoomListItemRoomAndUserNameWithMessage(),
    };
    setAddonRoomListItemActionDispatch(scRoomListItemPlugins);

    store.dispatch(setRoomListTabbarActionCreator(route ? route.tabbar : tabbar));
    store.dispatch(setRoomListRoutePathActionCreator(route ? route.roomListRoutePath : roomListRoutePath));
    store.dispatch(setMessageRoutePathActionCreator(route ? route.messageRoutePath : messageRoutePath));
    store.dispatch(setRoomSettingRoutePathActionCreator(route ? route.roomSettingRoutePath : roomSettingRoutePath));
    store.dispatch(setSelectContactRoutePathActionCreator(route ? route.selectContactRoutePath : selectContactRoutePath));

    let rtmEndpoint = '';
    const tmpRtmProtocol = route ? route.rtmProtocol : rtmProtocol;
    let tmpRtmHost = route ? route.rtmHost : rtmHost;
    const tmpRtmPath = route ? route.rtmPath : rtmPath;
    if (!(tmpRtmProtocol === '' && tmpRtmHost === '' && tmpRtmPath === '')) {
      if (rtmHost === '') {
        tmpRtmHost = location.host;
      }
      rtmEndpoint = tmpRtmProtocol + '://' + tmpRtmHost + tmpRtmPath;
    }
    const realtimeConfig: IRealtimeConfig = {
      endpoint: rtmEndpoint,
    };

    setClientActionDispatch(new Client({
      apiKey: route ? route.apiKey : apiKey,
      apiSecret: route ? route.apiSecret : apiSecret,
      apiEndpoint: route ? route.apiEndpoint : apiEndpoint,
      realtime: realtimeConfig,
    }));
    setAuthParamsActionDispatch(
      route ? route.userId : userId,
      route ? route.accessToken : accessToken,
    );
  }

  render(): JSX.Element {
    return (
      <Provider store={store}>
        <ConnectedRouter history={routerHistory}>
          <Switch>
            <Route exact path={store.getState().setting.client.roomListRoutePath} component={RoomListPage} />
            <Route path={store.getState().setting.client.messageRoutePath + '/:messageId'} component={MessagePage} />
            <Route path={store.getState().setting.client.roomSettingRoutePath + '/:roomId'} component={RoomSettingPage} />
            <Route path={store.getState().setting.client.selectContactRoutePath} component={SelectContactPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export const renderMessenger = (params: any) => {
  ReactDom.render(
    <Messenger
      userId={params.userId ? params.userId : ''}
      accessToken={params.accessToken ? params.accessToken : ''}
      apiEndpoint={params.apiEndpoint ? params.apiEndpoint : ''}
      apiKey={params.apiKey ? params.apiKey : ''}
      apiSecret={params.apiSecret ? params.apiSecret : ''}
      rtmProtocol={params.rtmProtocol ? params.rtmProtocol : ''}
      rtmHost={params.rtmHost ? params.rtmHost : ''}
      rtmPath={params.rtmPath ? params.rtmPath : ''}
      roomListRoutePath={params.roomListRoutePath ? params.roomListRoutePath : '/'}
      messageRoutePath={params.messageRoutePath ? params.messageRoutePath : '/messages'}
      roomSettingRoutePath={params.roomSettingRoutePath ? params.roomSettingRoutePath : '/roomSetting'}
      selectContactRoutePath={params.selectContactRoutePath ? params.selectContactRoutePath : '/selectContact'}
    />, document.getElementById(params.renderDomId ? params.renderDomId : 'swagchat')
  );
};
