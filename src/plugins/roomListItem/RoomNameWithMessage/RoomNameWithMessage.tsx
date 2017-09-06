import * as React from 'react';
import {
  IRoomForUser,
  RoomType,
  IPluginRoomListItemProps,
  dateHumanize,
  opponentUser,
} from 'swagchat-sdk';
import { Avatar, Badge } from '../../../components';

export class RoomNameWithMessage extends React.Component<IPluginRoomListItemProps, {}> {
  onClick(room: IRoomForUser) {
    if (this.props.onClick) {
      this.props.onClick(room);
    }
  }

  render(): JSX.Element  {
    const {myUserId, userRoom, noAvatarImages} = this.props;
    if (this.props.userRoom.roomId === '') {
      return <div />;
    }
    let userName = userRoom.name;
    let pictureUrl = userRoom.pictureUrl;
    if (userRoom.type === RoomType.ONE_ON_ONE) {
      const users = opponentUser(userRoom.users, myUserId);
      if (users) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].isShowUsers) {
            userName += users[i].name + ' ';
            pictureUrl = users[i].pictureUrl;
          }
        }
      }
    }
    return (
      <div className="room-name-with-message-root" onClick={this.onClick.bind(this, userRoom)}>
        <div className="room-name-with-message-flex1">
          <Avatar
            width="40px"
            height="40px"
            src={pictureUrl ? pictureUrl : noAvatarImages[0]}
            className="room-name-with-message-avatar"
          />
        </div>
        <div className="room-name-with-message-flex2">
          <div className="room-name-with-message-subject">{userName}</div>
          <div className="room-name-with-message-description">{userRoom.lastMessage}</div>
        </div>
        <div className="room-name-with-message-flex3">
          <p className="room-name-with-message-datetime">{userRoom.lastMessageUpdated ? dateHumanize(userRoom.lastMessageUpdated) : ''}</p>
          {userRoom.ruUnreadCount > 0 ? <Badge className="room-name-with-message-badge" count={userRoom.ruUnreadCount} /> : null}
        </div>
      </div>
    );
  }
}
