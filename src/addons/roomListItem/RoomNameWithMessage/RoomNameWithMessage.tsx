import * as React from 'react';
import {
  IRoomForUser,
  RoomType,
  IAddonRoomListItemProps,
  dateHumanize,
  opponentUser,
} from 'swagchat-sdk';
import { Avatar, Badge } from '../../../components';
import * as styles from './room-name-with-message.css';

export class RoomNameWithMessage extends React.Component<IAddonRoomListItemProps, {}> {
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
      <div className={styles.root} onClick={this.onClick.bind(this, userRoom)}>
        <div className={styles.flex1}>
          <Avatar
            src={pictureUrl ? pictureUrl : noAvatarImages[0]}
            className={styles.avatar}
          />
        </div>
        <div className={styles.flex2}>
          <div className={styles.subject}>{userName}</div>
          <div className={styles.description}>{userRoom.lastMessage}</div>
        </div>
        <div className={styles.flex3}>
          <p className={styles.datetime}>{userRoom.lastMessageUpdated ? dateHumanize(userRoom.lastMessageUpdated) : ''}</p>
          {userRoom.ruUnreadCount > 0 ? <Badge className={styles.badge} count={userRoom.ruUnreadCount} /> : null}
        </div>
      </div>
    );
  }
}
