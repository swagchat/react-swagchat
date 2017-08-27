import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IRoomForUser } from 'swagchat-sdk';
import { push } from 'react-router-redux';
import { State, store } from '../../stores';
import {
  TopBar,
  RoomList,
  CheckCircleOutline,
  Button,
} from '../../components';
import { IPluginRoomListItem } from '../../plugins/roomListItem';

export interface IRoomListPageProps extends RouteComponentProps<any> {
  apiKey: string;
  apiEndpoint: string;
  userAccessToken: string;

  roomListTitle: string;

  userId: string;
  userRooms: IRoomForUser[];
  roomListItems: {[key: number]: IPluginRoomListItem};
  noRoomListText: string;
  noRoomListImage: string;
  noAvatarImages: string[];
  roomListRoutePath: string;
  messageRoutePath: string;
  selectContactRoutePath: string;

  roomListTabbar: React.ComponentClass<any> | null;
}

class RoomListPage extends React.Component<IRoomListPageProps, any> {
  onItemTap(room: IRoomForUser) {
    if (this.props.history) {
      store.dispatch(push(this.props.messageRoutePath + '/' + room.roomId));
    }
  }

  onCreateRoomButton() {
    if (this.props.history) {
      store.dispatch(push(this.props.selectContactRoutePath));
    }
  }

  render(): JSX.Element  {
    const {roomListTitle, userId, userRooms, roomListItems, roomListTabbar, noRoomListText, noRoomListImage, noAvatarImages} = this.props;
    return (
      <div>
        <TopBar
          title={roomListTitle}
          rightButton={<Button icon={<CheckCircleOutline />} onClick={this.onCreateRoomButton.bind(this)} />}
        />
        <RoomList
          myUserId={userId}
          userRooms={userRooms}
          roomListItems={roomListItems}
          hasTopBar={true}
          hasTabBar={roomListTabbar ? true : false}
          noRoomListText={noRoomListText}
          noRoomListImage={noRoomListImage}
          noAvatarImages={noAvatarImages}
          onClick={this.onItemTap.bind(this)}
        />
        {roomListTabbar ? roomListTabbar : null}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  if (state.client.client && state.user.user) {
    return {
      apiKey: state.client.client!.apiKey,
      apiEndpoint: state.client.client!.apiEndpoint,
      userAccessToken: state.user.user!.accessToken,

      roomListTitle: state.setting.roomListTitle,

      userId: state.user.user!.userId,
      userRooms: state.user.userRooms,
      roomListItems: state.plugin.roomListItems,
      noRoomListText: state.setting.noRoomListText,
      noRoomListImage: state.setting.noRoomListImage,
      noAvatarImages: state.setting.noAvatarImages,
      roomListRoutePath: state.setting.roomListRoutePath,
      messageRoutePath: state.setting.messageRoutePath,
      selectContactRoutePath: state.setting.selectContactRoutePath,

      roomListTabbar: state.setting.roomListTabbar,
    };
  }
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IRoomListPageProps) => {
  dispatch; ownProps; // TODO
  return {};
};

export const ContainerRoomListPage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomListPage));
