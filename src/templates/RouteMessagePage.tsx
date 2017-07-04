import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import {
  setPluginMessageActionCreator,
  setCustomPluginMessageActionCreator,
} from '../actions/plugin';
import {
  setNoMessageTextActionCreator,
  setNoMessageImageActionCreator,
  setInputMessagePlaceholderTextActionCreator,
} from '../actions/setting';
import {
  clearMessagesActionCreator,
} from '../actions/message';
import {
  combinedUserAndRoomAndMessagesFetchRequestActionCreator,
} from '../actions/combined';
import { IContext } from '../';
import { store, routerHistory } from '../stores';
import {
  ContainerMessagePage,
} from '../containers/';
import {
  PluginMessageText,
  PluginMessageImage
} from '../plugins/message';
import { getAuthInfoFromStorage } from '../utils';

export class RouteMessagePage extends React.Component<any, void> {
  constructor(props: any, context: IContext) {
    super(props, context);

    let apiKey;
    let userId;
    let userAccessToken;
    if (props.route.userId) {
      apiKey = props.route.apiKey;
      userId = props.route.userId;
      userAccessToken = props.route.userAccessToken;
    } else if (props.userId) {
      apiKey = props.route.apiKey;
      userId = props.route.userId;
      userAccessToken = props.route.userAccessToken;
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

    store.dispatch(clearMessagesActionCreator());
    store.dispatch(setNoMessageTextActionCreator(props.route ? props.route.noMessageText : props.noMessageText));
    store.dispatch(setNoMessageImageActionCreator(props.route ? props.route.noMessageImage : props.noMessageImage));
    store.dispatch(setInputMessagePlaceholderTextActionCreator(props.route ? props.route.inputMessagePlaceholderText : props.inputMessagePlaceholderText));
    store.dispatch(combinedUserAndRoomAndMessagesFetchRequestActionCreator(
      apiKey,
      props.route ? props.route.apiEndpoint : props.apiEndpoint,
      props.route ? props.route.realtimeEndpoint : props.realtimeEndpoint,
      userId,
      userAccessToken,
      props.params.roomId,
    ));
  }

  render(): JSX.Element {
    return (
      <Provider store={store}>
        <ConnectedRouter history={routerHistory}>
          <Route exact path="" component={ContainerMessagePage} />
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
    />, document.getElementById(params.renderDomId)
  );
};
