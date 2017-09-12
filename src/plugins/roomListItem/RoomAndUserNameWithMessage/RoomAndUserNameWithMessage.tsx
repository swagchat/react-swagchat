import * as React from 'react';
import {
  IRoomForUser,
  IPluginRoomListItemProps,
  dateHumanize,
  opponentUser,
} from 'swagchat-sdk';
import { Avatar, Badge } from '../../../components';
import * as styles from './room-and-user-name-with-message.css';

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
      <div className={styles.root} onClick={this.onClick.bind(this, userRoom)}>
        <div className={styles.flex1}>
          <Avatar
            shape="squareRound"
            width="40px"
            height="40px"
            src={userRoom.pictureUrl ? userRoom.pictureUrl : noAvatarImages[0]}
            className={styles.avatar}
          />
        </div>
        <div className={styles.flex2}>
          <div className={styles.subject}>{userRoom.name}</div>
          <div className={styles.username}>{userNames}</div>
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
