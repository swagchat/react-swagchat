import * as React from 'react';
import { IRoomForUser } from 'swagchat-sdk';
import { IPluginRoomListItem } from '../../plugins/roomListItem';

export interface IRoomItemProps {
  myUserId: string;
  roomListItems: {[key: number]: IPluginRoomListItem};
  userRoom: IRoomForUser;
  onClick?: Function;
  customRoomListItems?: {[key: number]: IPluginRoomListItem};
}

export class RoomItem extends React.Component<IRoomItemProps, void> {
  render(): JSX.Element {
    const {myUserId, roomListItems, userRoom, onClick, customRoomListItems} = this.props;
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
                onClick: onClick,
              }
            );
          } else {
            item = React.createElement(
              roomListItems[userRoom.type].item, {
                myUserId: myUserId,
                userRoom: userRoom,
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
