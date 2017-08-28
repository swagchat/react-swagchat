import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { setUserAuthParamsActionCreator } from 'swagchat-sdk/src/actions/user';
import {
  setRoomSettingTitleActionCreator,
  setRoomMembersTitleActionCreator,
  setNoAvatarImagesActionCreator,
  setRoomSettingRoutePathActionCreator,
} from 'swagchat-sdk/src/actions/setting';
import { IContext } from '../';
import { store, routerHistory } from 'swagchat-sdk/src/stores';
import {
  ContainerRoomSettingPage,
} from '../containers/';
import { getAuthInfoFromStorage } from '../utils';

export class RouteRoomSettingPage extends React.Component<any, {}> {
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

    store.dispatch(setRoomSettingTitleActionCreator(props.route ? props.route.roomSettingTitle : props.roomSettingTitle));
    store.dispatch(setRoomMembersTitleActionCreator(props.route ? props.route.roomMembersTitle : props.roomMembersTitle));
    store.dispatch(setNoAvatarImagesActionCreator(props.route ? props.route.noAvatarImages : props.noAvatarImages));
    store.dispatch(setRoomSettingRoutePathActionCreator(props.route ? props.route.roomSettingRoutePath : props.roomSettingRoutePath));

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
          <Route path={store.getState().setting.roomSettingRoutePath + '/:roomId'} component={ContainerRoomSettingPage} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export const renderRoomSetting = (params: any) => {
  ReactDom.render(
    <RouteRoomSettingPage
      roomSettingTitle={params.roomSettingTitle}
      roomMembersTitle={params.roomMembersTitle}
      renderDomId={params.renderDomId}
      apiKey={params.apiKey}
      apiEndpoint={params.apiEndpoint}
      realtimeEndpoint={params.realtimeEndpoint}
      userId={params.userId}
      userAccessToken={params.userAccessToken}
      noAvatarImages={params.noAvatarImages ? params.noAvatarImages : ['https://unpkg.com/react-swagchat/dist/img/normal.png', 'https://unpkg.com/react-swagchat/dist/img/sad.png', 'https://unpkg.com/react-swagchat/dist/img/smile.png']}
      roomSettingRoutePath={params.roomSettingRoutePath}
    />, document.getElementById(params.renderDomId)
  );
};
