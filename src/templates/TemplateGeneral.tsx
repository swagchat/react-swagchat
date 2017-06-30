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
  setInputMessagePlaceholderTextActionCreator,
  setRoomSettingTitleActionCreator,
  setRoomMembersTitleActionCreator,
} from '../actions/setting';
import {
  setUserAuthParamsActionCreator,
  userAuthRequestActionCreator
} from '../actions/user';
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

export class TemplateGeneral extends React.Component<any, void> {
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

    store.dispatch(setUserAuthParamsActionCreator(
      props.route ? props.route.apiKey : props.apiKey,
      props.route ? props.route.apiEndpoint : props.apiEndpoint,
      props.route ? props.route.realtimeEndpoint : props.realtimeEndpoint,
      props.route ? props.route.userId : props.userId,
      props.route ? props.route.userAccessToken : props.userAccessToken,
    ));
    store.dispatch(userAuthRequestActionCreator());
  }

  render(): JSX.Element {
    return (
      <Provider store={store}>
        <ConnectedRouter history={routerHistory}>
          <Switch>
            <Route exact path="/" component={ContainerRoomListPage} />
            <Route path="/messages/:messageId" component={ContainerMessagePage} />
            <Route path="/roomSetting/:roomId" component={ContainerRoomSettingPage} />
            <Route path="/selectContact" component={ContainerSelectContactPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export const renderTemplateGeneral = (params: any) => {
  ReactDom.render(
    <TemplateGeneral
      roomListTitle={params.roomListTitle}
      noRoomListText={params.noRoomListText}
      noRoomListImage={params.noRoomListImage}
      noMessageText={params.noMessageText}
      noMessageImage={params.noMessageImage}
      inputMessagePlaceholderText={params.inputMessagePlaceholderText}
      roomSettingTitle={params.roomSettingTitle}
      roomMembersTitle={params.roomMembersTitle}
      renderDomId={params.renderDomId}
      apiKey={params.apiKey}
      apiEndpoint={params.apiEndpoint}
      realtimeEndpoint={params.realtimeEndpoint}
      userId={params.userId}
      userAccessToken={params.userAccessToken}
    />, document.getElementById(params.renderDomId)
  );
};
