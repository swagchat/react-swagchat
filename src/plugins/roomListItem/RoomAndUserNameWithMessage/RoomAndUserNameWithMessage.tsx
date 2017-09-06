import * as React from 'react';
import {
  IRoomForUser,
  IPluginRoomListItemProps,
  dateHumanize,
  opponentUser,
} from 'swagchat-sdk';
import { Avatar, Badge } from '../../../components';

export class RoomAndUserNameWithMessage extends React.Component<IPluginRoomListItemProps, {}> {
  onClick(room: IRoomForUser) {
    if (this.props.onClick) {
      this.props.onClick(room);
    }
  }

  render(): JSX.Element  {
    const {myUserId, userRoom, noAvatarImages} = this.props;
    if (userRoom.roomId === '') {
      return <div />;
    }
    const users = opponentUser(userRoom.users, myUserId);
    let userNames = '';
    if (users) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].isShowUsers) {
          userNames += users[i].name + ' ';
        }
      }
    }
    return (
      <div className="room-and-user-name-with-message-root" onClick={this.onClick.bind(this, userRoom)}>
        <div className="room-and-user-name-with-message-flex1">
          <Avatar
            type="square-round"
            width="40px"
            height="40px"
            src={userRoom.pictureUrl ? userRoom.pictureUrl : noAvatarImages[0]}
            className="room-and-user-name-with-message-avatar"
          />
        </div>
        <div className="room-and-user-name-with-message-flex2">
          <div className="room-and-user-name-with-message-subject">{userRoom.name}</div>
          <div className="room-and-user-name-with-message-username">{userNames}</div>
          <div className="room-and-user-name-with-message-description">{userRoom.lastMessage}</div>
        </div>
        <div className="room-and-user-name-with-message-flex3">
          <p className="room-and-user-name-with-message-datetime">{userRoom.lastMessageUpdated ? dateHumanize(userRoom.lastMessageUpdated) : ''}</p>
          {userRoom.ruUnreadCount > 0 ? <Badge className="room-and-user-name-with-message-badge" count={userRoom.ruUnreadCount} /> : null}
        </div>
      </div>
    );
  }
}
