import * as React from 'react';
import { IRoomForUser } from 'swagchat-sdk';
import { RoomItem } from './RoomItem';
import { SubTitleBar, IOnClickProps } from '../../';
import { IPluginRoomListItem } from '../../plugins/roomListItem';

export interface IRoomListProps extends IOnClickProps {
  myUserId: string;
  userRooms: IRoomForUser[];
  roomListItems: {[key: number]: IPluginRoomListItem};
  title?: string;
  hasTopBar?: boolean;
  hasTabBar?: boolean;
  noRoomListText?: string;
  noRoomListImage?: string;
}

export class RoomList extends React.Component<IRoomListProps, void> {
  public static defaultProps: Partial<IRoomListProps> = {
    hasTopBar: false,
  };

  onClick(room: any) {
    if (this.props.onClick) {
      this.props.onClick(room);
    }
  }

  render(): JSX.Element {
    const {myUserId, roomListItems, title, hasTopBar, hasTabBar, noRoomListText, noRoomListImage, userRooms} = this.props;
    let style = Object.assign(
      {},
      hasTopBar ? {marginTop: '47px'} : {},
      hasTabBar ? {marginBottom: '57px'} : {},
    );
    return (
      <div className="page-container" style={style}>
        { title ? <SubTitleBar title={title!} /> : null}
        {(() => {
          if (userRooms && userRooms.length > 0) {
            let roomItems = new Array;
            for (let i = 0; i < userRooms.length; i++) {
              roomItems.push(
                <RoomItem
                  key={i}
                  roomListItems={roomListItems}
                  myUserId={myUserId}
                  userRoom={userRooms[i]}
                  onClick={this.onClick.bind(this)}
                  />
              );
            }
            return roomItems;
          } else {
            return (
              <div className="nodata-wrap">
                {noRoomListImage !== '' ? <img className="nodata-image" src={noRoomListImage} /> : ''}
                <p className="nodata-text">{noRoomListText !== '' ? noRoomListText : ''}</p>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}