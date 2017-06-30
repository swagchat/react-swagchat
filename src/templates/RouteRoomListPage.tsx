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
} from '../actions/setting';
import {
  clearMessagesActionCreator,
} from '../actions/message';
import {
  setUserAuthParamsActionCreator,
  userAuthRequestActionCreator
} from '../actions/user';
import { IContext } from '../';
import { store, routerHistory } from '../stores';
import { ContainerRoomListPage } from '../containers/';

export class RouteRoomListPage extends React.Component<any, void> {
  constructor(props: any, context: IContext) {
    super(props, context);

    store.dispatch(clearMessagesActionCreator());
    store.dispatch(setRoomListTitleActionCreator(props.route ? props.route.roomListTitle : props.roomListTitle));
    store.dispatch(setRoomListTabbarActionCreator(props.route ? props.route.tabbar : props.tabbar));
    store.dispatch(setNoRoomListTextActionCreator(props.route ? props.route.noRoomListText : props.noRoomListText));
    store.dispatch(setNoRoomListImageActionCreator(props.route ? props.route.noRoomListImage : props.noRoomListImage));
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
          <Route component={ContainerRoomListPage} />
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
    />, document.getElementById(params.renderDomId)
  );
};
