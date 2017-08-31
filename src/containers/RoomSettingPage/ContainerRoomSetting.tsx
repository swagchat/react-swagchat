import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  IUser,
  RoomType,
  State,
  IUserState,
  IRoomState,
  IStyleState,
  ISettingState,
  opponentUser,
} from 'swagchat-sdk';
import {
  TopBar,
  RoomSettingList,
  SimpleListItem,
  SubTitleBar,
  Back,
  Button,
} from '../../components';

export interface IReduxRoomSettingProps extends RouteComponentProps<any> {
  title: string;
  userState: IUserState;
  roomState: IRoomState;
  styleState: IStyleState;
  settingState: ISettingState;
}

class ReduxRoomSetting extends React.Component<IReduxRoomSettingProps, {}> {
  onItemTap(user: IUser) {
    console.log(user);
  }

  render(): JSX.Element  {
    const {
      settingState,
      roomState,
      userState,
      history,
    } = this.props;
    if (!(roomState && roomState.room)) {
      return <div />;
    }
    let pictureUrl = roomState.room!.pictureUrl ? roomState.room!.pictureUrl : '';
    let name = roomState.room!.name!;
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
          userId={userState.user!.userId}
          userBlocks={userState.user!.blocks}
          room={roomState.room}
          noAvatarImages={settingState.noAvatarImages}
          displayNoDataText="No contacts."
          onItemTap={this.onItemTap.bind(this)}
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

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IReduxRoomSettingProps) => {
  dispatch; // TODO
  ownProps; // TODO
  return {};
};

export const ContainerRoomSetting = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxRoomSetting));
