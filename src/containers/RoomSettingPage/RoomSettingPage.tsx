import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IUser, RoomType } from 'swagchat-sdk';
import { contactsFetchRequestActionCreator, IContactsFetchRequestAction } from '../../actions/user';
import {
  TopBar,
  RoomSettingList,
  SimpleListItem,
  SubTitleBar,
  Back,
  Button,
} from '../../';
import {
  State,
  IUserState,
  IRoomState,
  IStyleState,
  ISettingState,
} from '../../stores/';
import {
  IUpdateStyleAction,
  updateStyleActionCreator,
} from '../../actions/style';
import {
  IUserBlockFetchRequestAction,
  IUserUnBlockFetchRequestAction,
  userBlockFetchRequestActionCreator,
  userUnBlockFetchRequestActionCreator
} from '../../actions/user';
import {
  combinedAssetPostAndRoomUpdateRequestActionCreator,
  ICombinedAssetPostAndRoomUpdateRequestAction,
} from '../../actions/combined';
import {
  roomUserRemoveFetchRequestActionCreator,
  roomUpdateNameActionCreator,
  roomUpdatePictureActionCreator,
  IRoomUserRemoveFetchRequestAction,
  IRoomUpdateNameAction,
  IRoomUpdatePictureAction,
} from '../../actions/room';
import { opponentUser } from '../../utils';

export interface IRoomSettingPageProps extends RouteComponentProps<any> {
  title: string;
  userState: IUserState;
  roomState: IRoomState;
  styleState: IStyleState;
  settingState: ISettingState;
  updateStyle: (style: Object) => IUpdateStyleAction;
  contactsFetchRequest: () => IContactsFetchRequestAction;
  userBlockFetch: (blockUserIds: string[]) => IUserBlockFetchRequestAction;
  userUnBlockFetch: (blockUserIds: string[]) => IUserUnBlockFetchRequestAction;
  roomUserRemoveFetch: (userIds: string[]) => IRoomUserRemoveFetchRequestAction;
  roomUpdateName: (updateName: string) => IRoomUpdateNameAction;
  roomUpdatePicture: (updatePicture: Blob) => IRoomUpdatePictureAction;
  assetPostAndRoomUpdate: () => ICombinedAssetPostAndRoomUpdateRequestAction;
}

class RoomSettingPage extends React.Component<IRoomSettingPageProps, void> {
  onItemTap(user: IUser) {
    console.log(user);
  }

  render(): JSX.Element  {
    const {
      settingState,
      roomState,
      userState,
      history,
      styleState,
      updateStyle,
      userBlockFetch,
      userUnBlockFetch,
      roomUserRemoveFetch,
      roomUpdateName,
      roomUpdatePicture,
      assetPostAndRoomUpdate,
    } = this.props;
    if (!(roomState && roomState.room)) {
      return <div />;
    }
    let pictureUrl = roomState.room!.pictureUrl ? roomState.room!.pictureUrl : '';
    let name = roomState.room!.name;
    if (roomState.room!.type === RoomType.ONE_ON_ONE) {
      const users = opponentUser(roomState.room!.users!, userState.user!.userId);
      if (users && users.length > 0) {
        pictureUrl = users[0].pictureUrl;
        name = users[0].name;
      }
    }
    return (
      <div className="room-setting-page-root">
        <TopBar
          title={settingState.roomSettingTitle}
          leftButton={<Button icon={<Back />} onClick={history.goBack} />}
        />
        <SimpleListItem name={name} pictureUrl={pictureUrl ? pictureUrl : settingState.noAvatarImages[0]} width={80} height={80} />
        <RoomSettingList
          desableMarginTop={false}
          userState={userState}
          roomState={roomState}
          styleState={styleState}
          displayNoDataText="No contacts."
          updateStyle={updateStyle}
          onItemTap={this.onItemTap.bind(this)}
          userBlockFetch={userBlockFetch}
          userUnBlockFetch={userUnBlockFetch}
          roomUserRemoveFetch={roomUserRemoveFetch}
          roomUpdateName={roomUpdateName}
          roomUpdatePicture={roomUpdatePicture}
          assetPostAndRoomUpdate={assetPostAndRoomUpdate}
        />

        {(() => {
          if (roomState.room!.type !== RoomType.ONE_ON_ONE && roomState.room!.isShowUsers && roomState.room!.type !== RoomType.NOTICE_ROOM) {
            return (
              <div className="layout-box-1">
                <SubTitleBar title={settingState.roomMembersTitle} isDisplayBorder={false} />
                {(() => {
                  let users = new Array;
                  for (let i = 0; i < roomState.room!.users!.length; i++) {
                    let user = roomState.room!.users![i];
                    if (user.isShowUsers) {
                      users.push(<SimpleListItem key={'simple-list-item-' + i} name={user.name} pictureUrl={user.pictureUrl} />);
                    }
                  }
                  return users;
                })()}
              </div>
            );
          } else {
            return null;
          }
        })()}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  if (state.client.client && state.user.user) {
    return {
      userState: state.user,
      roomState: state.room,
      styleState: state.style,
      settingState: state.setting,
    };
  }
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IRoomSettingPageProps) => {
  ownProps; // TODO
  return {
    contactsFetchRequest: () => dispatch(contactsFetchRequestActionCreator()),
    updateStyle: (style: Object) => dispatch(updateStyleActionCreator(style)),
    userBlockFetch: (blockUserIds: string[]) => dispatch(userBlockFetchRequestActionCreator(blockUserIds)),
    userUnBlockFetch: (blockUserIds: string[]) => dispatch(userUnBlockFetchRequestActionCreator(blockUserIds)),
    roomUserRemoveFetch: (userIds: string[]) => dispatch(roomUserRemoveFetchRequestActionCreator(userIds)),
    roomUpdateName: (updateName: string) => dispatch(roomUpdateNameActionCreator(updateName)),
    roomUpdatePicture: (updatePicture: Blob) => dispatch(roomUpdatePictureActionCreator(updatePicture)),
    assetPostAndRoomUpdate: () => dispatch(combinedAssetPostAndRoomUpdateRequestActionCreator()),
  };
};

export const ContainerRoomSettingPage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomSettingPage));
