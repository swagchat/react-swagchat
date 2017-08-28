import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { setUserAuthParamsActionCreator } from 'swagchat-sdk/src/actions/user';
import {
  setPluginMessageActionCreator,
  setCustomPluginMessageActionCreator,
} from 'swagchat-sdk/src/actions/plugin';
import {
  setNoMessageTextActionCreator,
  setNoMessageImageActionCreator,
  setInputMessagePlaceholderTextActionCreator,
  setNoAvatarImagesActionCreator,
  setMessageRoutePathActionCreator,
  setRoomSettingRoutePathActionCreator,
} from 'swagchat-sdk/src/actions/setting';
import { IContext } from '../';
import { store, routerHistory } from 'swagchat-sdk/src/stores';
import { ContainerMessagePage } from '../containers/';
import {
  PluginMessageText,
  PluginMessageImage
} from '../plugins/message';
import { getAuthInfoFromStorage } from '../utils';

export class RouteMessagePage extends React.Component<any, {}> {
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

    const scMessagePlugins = this.props.route && this.props.route.scMessagePlugins ? this.props.route.scMessagePlugins : [
      new PluginMessageText(),
      new PluginMessageImage(),
    ];
    store.dispatch(setPluginMessageActionCreator(scMessagePlugins));

    const scCustomMessagePlugins = this.props.route && this.props.route.scMessagePlugins ? this.props.route.scMessagePlugins : [
      new PluginMessageText(),
      new PluginMessageImage(),
      new PluginMessageImage(),
    ];
    store.dispatch(setCustomPluginMessageActionCreator(scCustomMessagePlugins));

    store.dispatch(setNoMessageTextActionCreator(props.route ? props.route.noMessageText : props.noMessageText));
    store.dispatch(setNoMessageImageActionCreator(props.route ? props.route.noMessageImage : props.noMessageImage));
    store.dispatch(setInputMessagePlaceholderTextActionCreator(props.route ? props.route.inputMessagePlaceholderText : props.inputMessagePlaceholderText));
    store.dispatch(setNoAvatarImagesActionCreator(props.route ? props.route.noAvatarImages : props.noAvatarImages));
    store.dispatch(setMessageRoutePathActionCreator(props.route ? props.route.messageRoutePath : props.messageRoutePath));
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
          <Route path={store.getState().setting.messageRoutePath + '/:roomId'} component={ContainerMessagePage} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export const renderMessagePage = (params: any) => {
  ReactDom.render(
    <RouteMessagePage
      noMessageText={params.noMessageText}
      noMessageImage={params.noMessageImage}
      inputMessagePlaceholderText={params.inputMessagePlaceholderText}
      renderDomId={params.renderDomId}
      apiKey={params.apiKey}
      apiEndpoint={params.apiEndpoint}
      realtimeEndpoint={params.realtimeEndpoint}
      userId={params.userId}
      userAccessToken={params.userAccessToken}
      noAvatarImages={params.noAvatarImages ? params.noAvatarImages : ['https://unpkg.com/react-swagchat/dist/img/normal.png', 'https://unpkg.com/react-swagchat/dist/img/sad.png', 'https://unpkg.com/react-swagchat/dist/img/smile.png']}
      messageRoutePath={params.messageRoutePath}
      roomSettingRoutePath={params.roomSettingRoutePath}
    />, document.getElementById(params.renderDomId)
  );
};
