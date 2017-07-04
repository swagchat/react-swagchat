import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import {
  setRoomSettingTitleActionCreator,
  setRoomMembersTitleActionCreator,
} from '../actions/setting';
import {
  clearMessagesActionCreator,
} from '../actions/message';
import { combinedUserAndRoomFetchRequestActionCreator } from '../actions/combined';
import { IContext } from '../';
import { store, routerHistory } from '../stores';
import {
  ContainerRoomSettingPage,
} from '../containers/';
import { getAuthInfoFromStorage } from '../utils';

export class RouteRoomSettingPage extends React.Component<any, void> {
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

    store.dispatch(clearMessagesActionCreator());
    store.dispatch(setRoomSettingTitleActionCreator(props.route ? props.route.roomSettingTitle : props.roomSettingTitle));
    store.dispatch(setRoomMembersTitleActionCreator(props.route ? props.route.roomMembersTitle : props.roomMembersTitle));
    store.dispatch(combinedUserAndRoomFetchRequestActionCreator(
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
          <Route exact path="" component={ContainerRoomSettingPage} />
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
    />, document.getElementById(params.renderDomId)
  );
};
