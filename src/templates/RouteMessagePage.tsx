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

export class RouteMessagePage extends React.Component<any, void> {
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

    store.dispatch(clearMessagesActionCreator());
    store.dispatch(setNoMessageTextActionCreator(props.route ? props.route.noMessageText : props.noMessageText));
    store.dispatch(setNoMessageImageActionCreator(props.route ? props.route.noMessageImage : props.noMessageImage));
    store.dispatch(setInputMessagePlaceholderTextActionCreator(props.route ? props.route.inputMessagePlaceholderText : props.inputMessagePlaceholderText));
    store.dispatch(combinedUserAndRoomAndMessagesFetchRequestActionCreator(
      props.route ? props.route.apiKey : props.apiKey,
      props.route ? props.route.apiEndpoint : props.apiEndpoint,
      props.route ? props.route.realtimeEndpoint : props.realtimeEndpoint,
      props.route ? props.route.userId : props.userId,
      props.route ? props.route.userAccessToken : props.userAccessToken,
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
