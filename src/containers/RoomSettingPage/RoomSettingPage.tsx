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
  roomUserRemoveFetchRequestActionCreator,
  IRoomUserRemoveFetchRequestAction,
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
}

class RoomSettingPage extends React.Component<IRoomSettingPageProps, void> {
  componentDidUpdate() {
    if (this.props.history.action === 'POP' && !this.props.roomState.room) {
      // store.dispatch(roomFetchRequestActionCreator(this.props.match.params.roomId));
    }
  }

  onItemTap(user: IUser) {
    console.log(user);
  }

  render(): JSX.Element  {
    if (!(this.props.roomState && this.props.roomState.room)) {
      return <div />;
    }
    let pictureUrl = this.props.roomState.room!.pictureUrl ? this.props.roomState.room!.pictureUrl : '';
    let name = this.props.roomState.room!.name;
    if (this.props.roomState.room!.type === RoomType.ONE_ON_ONE) {
      const users = opponentUser(this.props.roomState.room!.users!, this.props.userState.user!.userId);
      if (users && users.length > 0) {
        pictureUrl = users[0].pictureUrl;
        name = users[0].name;
      }
    }
    return (
      <div className="room-setting-page-root">
        <TopBar
          title={this.props.settingState.roomSettingTitle}
          leftButton={<Button icon={<Back />} onClick={this.props.history.goBack} />}
        />
        <SimpleListItem name={name} pictureUrl={pictureUrl} width={80} height={80} />
        <RoomSettingList
          desableMarginTop={false}
          userState={this.props.userState}
          roomState={this.props.roomState}
          styleState={this.props.styleState}
          displayNoDataText="No contacts."
          updateStyle={this.props.updateStyle}
          onItemTap={this.onItemTap.bind(this)}
          userBlockFetch={this.props.userBlockFetch}
          userUnBlockFetch={this.props.userUnBlockFetch}
          roomUserRemoveFetch={this.props.roomUserRemoveFetch}
        />

        {(() => {
          if (this.props.roomState.room!.type !== RoomType.ONE_ON_ONE && this.props.roomState.room!.isShowUsers && this.props.roomState.room!.type !== RoomType.NOTICE_ROOM) {
            return (
              <div className="layout-box-1">
                <SubTitleBar title={this.props.settingState.roomMembersTitle} isDisplayBorder={false} />
                {(() => {
                  let users = new Array;
                  for (let i = 0; i < this.props.roomState.room!.users!.length; i++) {
                    let user = this.props.roomState.room!.users![i];
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
  };
};

export const ContainerRoomSettingPage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomSettingPage));
