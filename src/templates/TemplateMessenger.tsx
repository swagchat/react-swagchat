import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  setPluginMessageActionCreator,
  setCustomPluginMessageActionCreator,
} from '../actions/plugin';
import {
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
} from '../actions/setting';
import { setUserAuthParamsActionCreator } from '../actions/user';
import { IContext } from '../';
import { store, routerHistory } from '../stores';
import {
  ContainerRoomListPage,
  ContainerMessagePage,
  ContainerRoomSettingPage,
  ContainerSelectContactPage,
} from '../containers/';
import {
  PluginMessageText,
  PluginMessageImage
} from '../plugins/message';

export class TemplateMessenger extends React.Component<any, void> {
  constructor(props: any, context: IContext) {
    super(props, context);

    const scMessagePlugins = this.props.route && this.props.route.scMessagePlugins ? this.props.route.scMessagePlugins : [
      new PluginMessageText(),
      new PluginMessageImage(),
    ];
    store.dispatch(setPluginMessageActionCreator(scMessagePlugins));

    const scCustomMessagePlugins = this.props.route && this.props.route.scMessagePlugins ? this.props.route.scMessagePlugins : [
      new PluginMessageText(),
      new PluginMessageImage(),
    ];
    store.dispatch(setCustomPluginMessageActionCreator(scCustomMessagePlugins));

    store.dispatch(setRoomListTitleActionCreator(props.route ? props.route.roomListTitle : props.roomListTitle));
    store.dispatch(setRoomListTabbarActionCreator(props.route ? props.route.tabbar : props.tabbar));
    store.dispatch(setNoRoomListTextActionCreator(props.route ? props.route.noRoomListText : props.noRoomListText));
    store.dispatch(setNoRoomListImageActionCreator(props.route ? props.route.noRoomListImage : props.noRoomListImage));
    store.dispatch(setNoMessageTextActionCreator(props.route ? props.route.noMessageText : props.noMessageText));
    store.dispatch(setNoMessageImageActionCreator(props.route ? props.route.noMessageImage : props.noMessageImage));
    store.dispatch(setInputMessagePlaceholderTextActionCreator(props.route ? props.route.inputMessagePlaceholderText : props.inputMessagePlaceholderText));
    store.dispatch(setRoomSettingTitleActionCreator(props.route ? props.route.roomSettingTitle : props.roomSettingTitle));
    store.dispatch(setRoomMembersTitleActionCreator(props.route ? props.route.roomMembersTitle : props.roomMembersTitle));
    store.dispatch(setNoAvatarImagesActionCreator(props.route ? props.route.noAvatarImages : props.noAvatarImages));
    store.dispatch(setSelectContactTitleActionCreator(props.route ? props.route.selectContactTitle : props.selectContactTitle));
    store.dispatch(setNoContactListTextActionCreator(props.route ? props.route.noContactListText : props.noContactListText));
    store.dispatch(setNoContactListImageActionCreator(props.route ? props.route.noContactListImage : props.noContactListImage));
    store.dispatch(setRoomListRoutePathActionCreator(props.route ? props.route.roomListRoutePath : props.roomListRoutePath));
    store.dispatch(setMessageRoutePathActionCreator(props.route ? props.route.messageRoutePath : props.messageRoutePath));
    store.dispatch(setRoomSettingRoutePathActionCreator(props.route ? props.route.roomSettingRoutePath : props.roomSettingRoutePath));
    store.dispatch(setSelectContactRoutePathActionCreator(props.route ? props.route.selectContactRoutePath : props.selectContactRoutePath));

    let rtmEndpoint = '';
    const rtmProtocol = props.route ? props.route.rtmProtocol : props.rtmProtocol;
    let rtmHost = props.route ? props.route.rtmHost : props.rtmHost;
    if (rtmHost === '') {
      rtmHost = location.host;
    }
    const rtmPath = props.route ? props.route.rtmPath : props.rtmPath;
    if (!(rtmProtocol === '' && rtmHost === '' && rtmPath === '')) {
      rtmEndpoint = rtmProtocol + '://' + rtmHost + '/' + rtmPath;
    }

    store.dispatch(setUserAuthParamsActionCreator(
      props.route ? props.route.apiKey : props.apiKey,
      props.route ? props.route.apiEndpoint : props.apiEndpoint,
      rtmEndpoint,
      props.route ? props.route.userId : props.userId,
      props.route ? props.route.userAccessToken : props.userAccessToken,
    ));
  }

  render(): JSX.Element {
    return (
      <Provider store={store}>
        <ConnectedRouter history={routerHistory}>
          <Switch>
            <Route exact path={store.getState().setting.roomListRoutePath} component={ContainerRoomListPage} />
            <Route path={store.getState().setting.messageRoutePath + '/:messageId'} component={ContainerMessagePage} />
            <Route path={store.getState().setting.roomSettingRoutePath + '/:roomId'} component={ContainerRoomSettingPage} />
            <Route path={store.getState().setting.selectContactRoutePath} component={ContainerSelectContactPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export const renderTemplateMessenger = (params: any) => {
  ReactDom.render(
    <TemplateMessenger
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
      apiKey={params.apiKey ? params.apiKey : ''}
      apiEndpoint={params.apiEndpoint ? params.apiEndpoint : ''}
      rtmProtocol={params.rtmProtocol ? params.rtmProtocol : ''}
      rtmHost={params.rtmHost ? params.rtmHost : ''}
      rtmPath={params.rtmPath ? params.rtmPath : ''}
      userId={params.userId ? params.userId : ''}
      userAccessToken={params.userAccessToken ? params.userAccessToken : ''}
      roomListRoutePath={params.roomListRoutePath ? params.roomListRoutePath : '/'}
      messageRoutePath={params.messageRoutePath ? params.messageRoutePath : '/messages'}
      roomSettingRoutePath={params.roomSettingRoutePath ? params.roomSettingRoutePath : '/roomSetting'}
      selectContactRoutePath={params.selectContactRoutePath ? params.selectContactRoutePath : '/selectContact'}
    />, document.getElementById(params.renderDomId ? params.renderDomId : 'swagchat')
  );
};
