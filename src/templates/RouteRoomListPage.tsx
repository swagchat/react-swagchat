import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import {
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
} from '../actions/setting';
import { setUserAuthParamsActionCreator } from '../actions/user';
import { IContext } from '../';
import { store, routerHistory } from '../stores';
import { ContainerRoomListPage } from '../containers/';
import { getAuthInfoFromStorage } from '../utils';

export class RouteRoomListPage extends React.Component<any, void> {
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

    store.dispatch(setUserAuthParamsActionCreator(
      apiKey,
      props.route ? props.route.apiEndpoint : props.apiEndpoint,
      props.route ? props.route.realtimeEndpoint : props.realtimeEndpoint,
      userId,
      userAccessToken,
    ));
  }

  render(): JSX.Element {
    return (
      <Provider store={store}>
        <ConnectedRouter history={routerHistory}>
          <Route path={store.getState().setting.roomListRoutePath} component={ContainerRoomListPage} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export const renderRoomList = (params: any) => {
  ReactDom.render(
    <RouteRoomListPage
      roomListTitle={params.roomListTitle}
      noRoomListText={params.noRoomListText}
      noRoomListImage={params.noRoomListImage}
      roomSettingTitle={params.roomSettingTitle}
      roomMembersTitle={params.roomMembersTitle}
      renderDomId={params.renderDomId}
      apiKey={params.apiKey}
      apiEndpoint={params.apiEndpoint}
      realtimeEndpoint={params.realtimeEndpoint}
      userId={params.userId}
      userAccessToken={params.userAccessToken}
      noAvatarImages={params.noAvatarImages ? params.noAvatarImages : ['https://unpkg.com/react-swagchat/dist/img/normal.png', 'https://unpkg.com/react-swagchat/dist/img/sad.png', 'https://unpkg.com/react-swagchat/dist/img/smile.png']}
      roomListRoutePath={params.roomListRoutePath}
      messageRoutePath={params.messageRoutePath}
      selectContactRoutePath={params.selectContactRoutePath}
    />, document.getElementById(params.renderDomId)
  );
};
