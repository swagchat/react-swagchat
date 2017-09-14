import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import {
  setUserAuthParamsActionCreator,
  setPluginMessageActionCreator,
  setCustomPluginMessageActionCreator,
  setNoMessageTextActionCreator,
  setNoMessageImageActionCreator,
  setInputMessagePlaceholderTextActionCreator,
  setNoAvatarImagesActionCreator,
  setMessageRoutePathActionCreator,
  setRoomSettingRoutePathActionCreator,
  store,
  routerHistory,
  getAuthInfoFromStorage,
} from 'swagchat-sdk';
import { MessagePage, RoomSettingPage, IContext } from '../containers';
import {
  PluginMessageText,
  PluginMessageImage
} from '../plugins/message';

export class TemplateSimpleMessage extends React.Component<any, {}> {
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
          <Switch>
            <Route path={store.getState().setting.messageRoutePath + '/:roomId'} component={MessagePage} />
            <Route path={store.getState().setting.roomSettingRoutePath + '/:roomId'} component={RoomSettingPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export const renderTemplateSimpleMessage = (params: any) => {
  ReactDom.render(
    <TemplateSimpleMessage
      apiKey={params.apiKey}
      userId={params.userId}
      userAccessToken={params.userAccessToken}
      apiEndpoint={params.apiEndpoint}
      rtmProtocol={params.rtmProtocol ? params.rtmProtocol : ''}
      rtmHost={params.rtmHost ? params.rtmHost : ''}
      rtmPath={params.rtmPath ? params.rtmPath : ''}
      messageRoutePath={params.messageRoutePath}
      roomSettingRoutePath={params.roomSettingRoutePath}

      noMessageText={params.noMessageText}
      noMessageImage={params.noMessageImage}
      inputMessagePlaceholderText={params.inputMessagePlaceholderText}
      noAvatarImages={params.noAvatarImages ? params.noAvatarImages : ['https://unpkg.com/react-swagchat/dist/img/normal.png', 'https://unpkg.com/react-swagchat/dist/img/sad.png', 'https://unpkg.com/react-swagchat/dist/img/smile.png']}
   />, document.getElementById(params.renderDomId ? params.renderDomId : 'swagchat')
  );
};
