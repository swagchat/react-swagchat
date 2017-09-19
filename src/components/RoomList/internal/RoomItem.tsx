import * as React from 'react';
import { IRoomForUser, IAddonRoomListItem } from 'swagchat-sdk';

export interface IRoomItemProps {
  myUserId: string;
  roomListItems: {[key: number]: IAddonRoomListItem};
  customRoomListItems?: {[key: number]: IAddonRoomListItem};
  userRoom: IRoomForUser;
  noAvatarImages: string[];
  onClick?: Function;
}

export class RoomItem extends React.Component<IRoomItemProps, {}> {
  render(): JSX.Element {
    const {myUserId, roomListItems, userRoom, onClick, customRoomListItems, noAvatarImages} = this.props;

    return (
      <div>
        {(() => {
          let item = null;
          if (customRoomListItems) {
            let plugin = customRoomListItems[userRoom.type]; // userRoom.type -> userRoom.customRoomListItem
            item = React.createElement(
              plugin.item, {
                myUserId: myUserId,
                userRoom: userRoom,
                noAvatarImages: noAvatarImages,
                onClick: onClick,
              }
            );
          } else {
            item = React.createElement(
              roomListItems[userRoom.type].item, {
                myUserId: myUserId,
                userRoom: userRoom,
                noAvatarImages: noAvatarImages,
                onClick: onClick,
              }
            );
          }
          return item;
        })()}
      </div>
    );
  }
}
