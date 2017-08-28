import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { setUserAuthParamsActionCreator } from '../actions/user';
import {
  setSelectContactTitleActionCreator,
  setNoContactListTextActionCreator,
  setNoContactListImageActionCreator,
  setNoAvatarImagesActionCreator,
  setSelectContactRoutePathActionCreator,
  setRoomListRoutePathActionCreator,
} from '../actions/setting';
import { IContext } from '../';
import { store, routerHistory } from '../stores';
import {
  ContainerSelectContactPage,
} from '../containers/';
import { getAuthInfoFromStorage } from '../utils';

export class RouteSelectContactPage extends React.Component<any, {}> {
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

    store.dispatch(setSelectContactTitleActionCreator(props.route ? props.route.selectContactTitle : props.selectContactTitle));
    store.dispatch(setNoContactListTextActionCreator(props.route ? props.route.noContactListText : props.noContactListText));
    store.dispatch(setNoContactListImageActionCreator(props.route ? props.route.noContactListImage : props.noContactListImage));
    store.dispatch(setNoAvatarImagesActionCreator(props.route ? props.route.noAvatarImages : props.noAvatarImages));
    store.dispatch(setSelectContactRoutePathActionCreator(props.route ? props.route.selectContactRoutePath : props.selectContactRoutePath));
    store.dispatch(setRoomListRoutePathActionCreator(props.route ? props.route.roomListRoutePath : props.roomListRoutePath));

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
          <Route path={store.getState().setting.selectContactRoutePath + '/:roomId'} component={ContainerSelectContactPage} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export const renderSelectContact = (params: any) => {
  ReactDom.render(
    <RouteSelectContactPage
      selectContactTitle={params.selectContactTitle}
      noContactListText={params.noContactListText}
      noContactListImage={params.noContactListImage}
      renderDomId={params.renderDomId}
      apiKey={params.apiKey}
      apiEndpoint={params.apiEndpoint}
      realtimeEndpoint={params.realtimeEndpoint}
      userId={params.userId}
      userAccessToken={params.userAccessToken}
      noAvatarImages={params.noAvatarImages ? params.noAvatarImages : ['https://unpkg.com/react-swagchat/dist/img/normal.png', 'https://unpkg.com/react-swagchat/dist/img/sad.png', 'https://unpkg.com/react-swagchat/dist/img/smile.png']}
      selectContactRoutePath={params.selectContactRoutePath}
      roomListRoutePath={params.roomListRoutePath}
    />, document.getElementById(params.renderDomId)
  );
};
