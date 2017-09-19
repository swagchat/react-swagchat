import * as React from 'react';
import { IRoomForUser, IAddonRoomListItem } from 'swagchat-sdk';
import { RoomItem } from './internal/RoomItem';
import { SubTitleBar, IOnClickProps, IRootStyleProps } from '../';
import * as indexStyles from '../../index.css';
const classNames = require('classnames');

export interface IRoomListProps extends IOnClickProps, IRootStyleProps {
  myUserId: string;
  userRooms: IRoomForUser[];
  roomListItems: {[key: number]: IAddonRoomListItem};
  customRoomListItems: {[key: number]: IAddonRoomListItem};
  title?: string;
  noRoomListText?: string;
  noRoomListImage?: string;
  noAvatarImages: string[];
}

export class RoomList extends React.Component<IRoomListProps, {}> {
  public static defaultProps: Partial<IRoomListProps> = {
    className: '',
    style: {},
  };

  onClick(room: any) {
    if (this.props.onClick) {
      this.props.onClick(room);
    }
  }

  render(): JSX.Element {
    const {className, style, myUserId, roomListItems, customRoomListItems, title, noRoomListText, noRoomListImage, userRooms, noAvatarImages} = this.props;
    return (
      <div className={classNames(indexStyles.pageContainer, className)} style={style}>
        { title ? <SubTitleBar title={title!} /> : null}
        {(() => {
          if (userRooms && userRooms.length > 0) {
            let roomItems = new Array;
            for (let i = 0; i < userRooms.length; i++) {
              roomItems.push(
                <RoomItem
                  key={'room-item-' + i}
                  roomListItems={roomListItems}
                  customRoomListItems={customRoomListItems}
                  myUserId={myUserId}
                  userRoom={userRooms[i]}
                  noAvatarImages={noAvatarImages}
                  onClick={this.onClick.bind(this)}
                  />
              );
            }
            return roomItems;
          } else {
            return (
              <div className={indexStyles.nodataWrap}>
                {noRoomListImage !== '' ? <img className={indexStyles.nodataImage} src={noRoomListImage} /> : ''}
                <p className={indexStyles.nodataText}>{noRoomListText !== '' ? noRoomListText : ''}</p>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}
