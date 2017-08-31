import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import {
  setPluginRoomListItemActionCreator,
  setRoomListTitleActionCreator,
  setRoomListTabbarActionCreator,
  setNoRoomListTextActionCreator,
  setNoRoomListImageActionCreator,
  setRoomSettingTitleActionCreator,
  setRoomMembersTitleActionCreator,
  setNoAvatarImagesActionCreator,
  setRoomListRoutePathActionCreator,
  setMessageRoutePathActionCreator,
  setSelectContactRoutePathActionCreator,
  setUserAuthParamsActionCreator,
  store,
  routerHistory,
  getAuthInfoFromStorage,
} from 'swagchat-sdk';
import { ContainerRoomList, IContext } from '../';
import {
  PluginRoomListItemRoomAndUserNameWithMessage,
  PluginRoomListItemRoomNameWithMessage,
} from '../../plugins/roomListItem';

export class RoomListPage extends React.Component<any, {}> {
  constructor(props: any, context: IContext) {
    super(props, context);

    let apiKey;
    let userId;
    let userAccessToken;
    if (props.route && props.route.userId) {
      apiKey = props.route.apiKey;
      userId = props.route.userId;
      userAccessToken = props.route.userAccessToken;
    } else if (props.userId) {
      apiKey = props.apiKey;
      userId = props.userId;
      userAccessToken = props.userAccessToken;
    } else {
      const scObj = getAuthInfoFromStorage();
      apiKey = scObj.apiKey;
      userId = scObj.userId;
      userAccessToken = scObj.userAccessToken;
    }

    const scRoomListItemPlugins = this.props.route && this.props.route.scRoomListItemPlugins ? this.props.route.scRoomListItemPlugins : {
      1: new PluginRoomListItemRoomNameWithMessage(),
      2: new PluginRoomListItemRoomAndUserNameWithMessage(),
    };
    store.dispatch(setPluginRoomListItemActionCreator(scRoomListItemPlugins));

    store.dispatch(setRoomListTitleActionCreator(props.route ? props.route.roomListTitle : props.roomListTitle));
    store.dispatch(setRoomListTabbarActionCreator(props.route ? props.route.tabbar : props.tabbar));
    store.dispatch(setNoRoomListTextActionCreator(props.route ? props.route.noRoomListText : props.noRoomListText));
    store.dispatch(setNoRoomListImageActionCreator(props.route ? props.route.noRoomListImage : props.noRoomListImage));
    store.dispatch(setRoomSettingTitleActionCreator(props.route ? props.route.roomSettingTitle : props.roomSettingTitle));
    store.dispatch(setRoomMembersTitleActionCreator(props.route ? props.route.roomMembersTitle : props.roomMembersTitle));
    store.dispatch(setNoAvatarImagesActionCreator(props.route ? props.route.noAvatarImages : props.noAvatarImages));
    store.dispatch(setRoomListRoutePathActionCreator(props.route ? props.route.roomListRoutePath : props.roomListRoutePath));
    store.dispatch(setMessageRoutePathActionCreator(props.route ? props.route.messageRoutePath : props.messageRoutePath));
    store.dispatch(setSelectContactRoutePathActionCreator(props.route ? props.route.selectContactRoutePath : props.selectContactRoutePath));

    let rtmEndpoint = '';
    const rtmProtocol = props.route ? props.route.rtmProtocol : props.rtmProtocol;
    let rtmHost = props.route ? props.route.rtmHost : props.rtmHost;
    const rtmPath = props.route ? props.route.rtmPath : props.rtmPath;

    if (!(rtmProtocol === '' && rtmHost === '' && rtmPath === '')) {
      if (rtmHost === '') {
        rtmHost = location.host;
      }
      rtmEndpoint = rtmProtocol + '://' + rtmHost + rtmPath;
    }

    store.dispatch(setUserAuthParamsActionCreator(
      apiKey,
      props.route ? props.route.apiEndpoint : props.apiEndpoint,
      rtmEndpoint,
      userId,
      userAccessToken,
    ));
  }

  render(): JSX.Element {
    return (
      <Provider store={store}>
        <ConnectedRouter history={routerHistory}>
          <Route path={store.getState().setting.roomListRoutePath} component={ContainerRoomList} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export const renderRoomList = (params: any) => {
  ReactDom.render(
    <RoomListPage
      apiKey={params.apiKey}
      userId={params.userId}
      userAccessToken={params.userAccessToken}
      apiEndpoint={params.apiEndpoint}
      rtmProtocol={params.rtmProtocol ? params.rtmProtocol : ''}
      rtmHost={params.rtmHost ? params.rtmHost : ''}
      rtmPath={params.rtmPath ? params.rtmPath : ''}
      roomListRoutePath={params.roomListRoutePath}
      messageRoutePath={params.messageRoutePath}
      selectContactRoutePath={params.selectContactRoutePath}
      roomListTitle={params.roomListTitle}
      noRoomListText={params.noRoomListText}
      noRoomListImage={params.noRoomListImage}
      roomSettingTitle={params.roomSettingTitle}
      roomMembersTitle={params.roomMembersTitle}
      noAvatarImages={params.noAvatarImages ? params.noAvatarImages : ['https://unpkg.com/react-swagchat/dist/img/normal.png', 'https://unpkg.com/react-swagchat/dist/img/sad.png', 'https://unpkg.com/react-swagchat/dist/img/smile.png']}
    />, document.getElementById(params.renderDomId ? params.renderDomId : 'swagchat')
  );
};
