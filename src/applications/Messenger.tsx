import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  setAddonMessageActionCreator,
  setCustomAddonMessageActionCreator,
  setAddonRoomListItemActionCreator,
  setRoomListTitleActionCreator,
  setRoomListTabbarActionCreator,
  setNoRoomListTextActionCreator,
  setNoRoomListImageActionCreator,
  setNoMessageTextActionCreator,
  setNoMessageImageActionCreator,
  setNoAvatarImagesActionCreator,
  setInputMessagePlaceholderTextActionCreator,
  setRoomSettingTitleActionCreator,
  setRoomMembersTitleActionCreator,
  setSelectContactTitleActionCreator,
  setNoContactListTextActionCreator,
  setNoContactListImageActionCreator,
  setRoomListRoutePathActionCreator,
  setMessageRoutePathActionCreator,
  setRoomSettingRoutePathActionCreator,
  setSelectContactRoutePathActionCreator,
  setUserAuthParamsActionCreator,
  store,
  routerHistory,
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
  PluginMessageImage
} from '../addons/messages';
import {
  PluginRoomListItemRoomAndUserNameWithMessage,
  PluginRoomListItemRoomNameWithMessage,
} from '../addons/roomListItem';

export interface IMessengerProps {
  userId: string;
  userAccessToken?: string;
  apiEndpoint: string;
  apiKey?: string;
  rtmProtocol?: string;
  rtmHost?: string;
  rtmPath?: string;
  roomListRoutePath?: string;
  messageRoutePath?: string;
  roomSettingRoutePath?: string;
  selectContactRoutePath?: string;
  roomListTitle?: string;
  noRoomListText?: string;
  noRoomListImage?: string;
  noMessageText?: string;
  noMessageImage?: string;
  inputMessagePlaceholderText?: string;
  roomSettingTitle?: string;
  roomMembersTitle?: string;
  noAvatarImages?: string[];
  selectContactTitle?: string;
  noContactListText?: string;
  noContactListImage?: string;
  renderDomId?: string;
  tabbar?: React.ReactNode;
  route?: any;
}

export class Messenger extends React.Component<IMessengerProps, {}> {
  public static defaultProps: Partial<IMessengerProps> = {
    userId: '',
    userAccessToken: '',
    apiEndpoint: '',
    apiKey: '',
    rtmProtocol: '',
    rtmHost: '',
    rtmPath: '',
    roomListRoutePath: '/',
    messageRoutePath: '/messages',
    roomSettingRoutePath: '/roomSetting',
    selectContactRoutePath: '/selectContact',
    roomListTitle: 'Room List',
    noRoomListText: 'No rooms.',
    noRoomListImage: '',
    noMessageText: 'No messages.',
    noMessageImage: '',
    inputMessagePlaceholderText: 'Input text...',
    roomSettingTitle: 'Room Settings',
    roomMembersTitle: 'Members',
    noAvatarImages: ['https://unpkg.com/react-swagchat/dist/img/normal.png', 'https://unpkg.com/react-swagchat/dist/img/sad.png', 'https://unpkg.com/react-swagchat/dist/img/smile.png'],
    selectContactTitle: 'Select Contacts',
    noContactListText: 'No Contacts',
    noContactListImage: '',
    renderDomId: 'swagchat',
  };

  constructor(props: any, context: IContext) {
    super(props, context);

    const {
      route,
      userId,
      userAccessToken,
      apiEndpoint,
      apiKey,
      rtmProtocol,
      rtmHost,
      rtmPath,
      roomListRoutePath,
      messageRoutePath,
      roomSettingRoutePath,
      selectContactRoutePath,
      roomListTitle,
      noRoomListText,
      noRoomListImage,
      noMessageText,
      noMessageImage,
      inputMessagePlaceholderText,
      noAvatarImages,
      roomMembersTitle,
      roomSettingTitle,
      selectContactTitle,
      noContactListText,
      noContactListImage,
      tabbar,
    } = props;

    const scMessagePlugins = route && route.scMessagePlugins ? route.scMessagePlugins : [
      new PluginMessageText(),
      new PluginMessageImage(),
    ];
    store.dispatch(setAddonMessageActionCreator(scMessagePlugins));

    const scCustomMessagePlugins = route && route.scMessagePlugins ? route.scMessagePlugins : [
      new PluginMessageText(),
      new PluginMessageImage(),
    ];
    store.dispatch(setCustomAddonMessageActionCreator(scCustomMessagePlugins));

    const scRoomListItemPlugins = route && route.scRoomListItemPlugins ? route.scRoomListItemPlugins : {
      1: new PluginRoomListItemRoomNameWithMessage(),
      2: new PluginRoomListItemRoomAndUserNameWithMessage(),
    };
    store.dispatch(setAddonRoomListItemActionCreator(scRoomListItemPlugins));

    store.dispatch(setRoomListTitleActionCreator(route ? route.roomListTitle : roomListTitle));
    store.dispatch(setRoomListTabbarActionCreator(route ? route.tabbar : tabbar));
    store.dispatch(setNoRoomListTextActionCreator(route ? route.noRoomListText : noRoomListText));
    store.dispatch(setNoRoomListImageActionCreator(route ? route.noRoomListImage : noRoomListImage));
    store.dispatch(setNoMessageTextActionCreator(route ? route.noMessageText : noMessageText));
    store.dispatch(setNoMessageImageActionCreator(route ? route.noMessageImage : noMessageImage));
    store.dispatch(setInputMessagePlaceholderTextActionCreator(route ? route.inputMessagePlaceholderText : inputMessagePlaceholderText));
    store.dispatch(setRoomSettingTitleActionCreator(route ? route.roomSettingTitle : roomSettingTitle));
    store.dispatch(setRoomMembersTitleActionCreator(route ? route.roomMembersTitle : roomMembersTitle));
    store.dispatch(setNoAvatarImagesActionCreator(route ? route.noAvatarImages : noAvatarImages));
    store.dispatch(setSelectContactTitleActionCreator(route ? route.selectContactTitle : selectContactTitle));
    store.dispatch(setNoContactListTextActionCreator(route ? route.noContactListText : noContactListText));
    store.dispatch(setNoContactListImageActionCreator(route ? route.noContactListImage : noContactListImage));
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

    store.dispatch(setUserAuthParamsActionCreator(
      route ? route.apiKey : apiKey,
      route ? route.apiEndpoint : apiEndpoint,
      rtmEndpoint,
      route ? route.userId : userId,
      route ? route.userAccessToken : userAccessToken,
    ));
  }

  render(): JSX.Element {
    return (
      <Provider store={store}>
        <ConnectedRouter history={routerHistory}>
          <Switch>
            <Route exact path={store.getState().setting.roomListRoutePath} component={RoomListPage} />
            <Route path={store.getState().setting.messageRoutePath + '/:messageId'} component={MessagePage} />
            <Route path={store.getState().setting.roomSettingRoutePath + '/:roomId'} component={RoomSettingPage} />
            <Route path={store.getState().setting.selectContactRoutePath} component={SelectContactPage} />
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
      userAccessToken={params.userAccessToken ? params.userAccessToken : ''}
      apiEndpoint={params.apiEndpoint ? params.apiEndpoint : ''}
      apiKey={params.apiKey ? params.apiKey : ''}
      rtmProtocol={params.rtmProtocol ? params.rtmProtocol : ''}
      rtmHost={params.rtmHost ? params.rtmHost : ''}
      rtmPath={params.rtmPath ? params.rtmPath : ''}
      roomListRoutePath={params.roomListRoutePath ? params.roomListRoutePath : '/'}
      messageRoutePath={params.messageRoutePath ? params.messageRoutePath : '/messages'}
      roomSettingRoutePath={params.roomSettingRoutePath ? params.roomSettingRoutePath : '/roomSetting'}
      selectContactRoutePath={params.selectContactRoutePath ? params.selectContactRoutePath : '/selectContact'}
      roomListTitle={params.roomListTitle ? params.roomListTitle : 'Room List'}
      noRoomListText={params.noRoomListText ? params.noRoomListText : 'No rooms.'}
      noRoomListImage={params.noRoomListImage ? params.noRoomListImage : ''}
      noMessageText={params.noMessageText ? params.noMessageText : 'No messages.'}
      noMessageImage={params.noMessageImage ? params.noMessageImage : ''}
      inputMessagePlaceholderText={params.inputMessagePlaceholderText ? params.inputMessagePlaceholderText : 'Input text...'}
      roomSettingTitle={params.roomSettingTitle ? params.roomSettingTitle : 'Room Settings'}
      roomMembersTitle={params.roomMembersTitle ? params.roomMembersTitle : 'Members'}
      noAvatarImages={params.noAvatarImages ? params.noAvatarImages : ['https://unpkg.com/react-swagchat/dist/img/normal.png', 'https://unpkg.com/react-swagchat/dist/img/sad.png', 'https://unpkg.com/react-swagchat/dist/img/smile.png']}
      selectContactTitle={params.selectContactTitle ? params.selectContactTitle : 'Select Contacts'}
      noContactListText={params.noContactListText ? params.noContactListText : 'No Contacts'}
      noContactListImage={params.noContactListImage ? params.noContactListImage : ''}
    />, document.getElementById(params.renderDomId ? params.renderDomId : 'swagchat')
  );
};
