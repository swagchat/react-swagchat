import * as React from 'react';
import {
  IRoom,
  RoomType,
  opponentUser,
  updateStyleActionDispatch,
  userBlockFetchRequestActionDispatch,
  userUnBlockFetchRequestActionDispatch,
  roomUserRemoveFetchRequestActionDispatch,
  combinedAssetPostAndRoomUpdateRequestActionDispatch,
} from 'swagchat-sdk';
import {
  Button,
  IModalAction,
  ModalView,
  ModalDialog,
  IconListItem,
  RoomEdit,
} from '../../components';

export interface IRoomSettingListProps {
  title?: string;
  userId: string;
  userBlocks: string[];
  room: IRoom;
  noAvatarImages: string[];
  desableMarginTop?: boolean;
  displayNoDataImage?: string;
  displayNoDataText?: string;
  onItemTap?: Function;
}

export class RoomSettingList extends React.Component<IRoomSettingListProps, {}> {
  public static defaultProps: Partial<IRoomSettingListProps> = {
    title: '',
    desableMarginTop: true,
    displayNoDataImage: '',
    displayNoDataText: '',
  };

  onBlockItemTap = () => {
    const users = opponentUser(this.props.room!.users!, this.props.userId);
    if (users && users.length > 0) {
      if (this.props.userBlocks && this.props.userBlocks.indexOf(users[0].userId) >= 0) {
        userUnBlockFetchRequestActionDispatch([users[0].userId]);
      } else {
        userBlockFetchRequestActionDispatch([users[0].userId]);
      }
    }
    this.modalViewTap('block', false);
  }

  onRoomEditOkClick = () => {
    this.modalViewTap('roomEdit', false);
    combinedAssetPostAndRoomUpdateRequestActionDispatch();
  }

  onLeftItemTap = () => {
    roomUserRemoveFetchRequestActionDispatch([this.props.userId]);
  }

  modalViewTap = (modalKey: string, isDisplay: boolean) => {
    updateStyleActionDispatch({
      modalStyle: {
        [modalKey]: {
          isDisplay: isDisplay,
        }
      }
    });
  }

  render(): JSX.Element {
    const {
      userId,
      userBlocks,
      room,
      noAvatarImages,
    } = this.props;
    return (
      <div>
        <div className="room-setting-list-root">
          {(() => {
            if (room!.type === RoomType.ONE_ON_ONE) {
              const users = opponentUser(room!.users!, userId);
              let title = 'ブロックする';
              let modalDescription = 'ブロックしますか？';
              if (users && users.length > 0 && users[0].isCanBlock) {
                if (userBlocks && userBlocks.indexOf(users[0].userId) >= 0) {
                  title = 'ブロックを解除する';
                  modalDescription = 'ブロックを解除しますか？';
                }
                let blockActions: IModalAction[] = [
                  {name: 'はい', type: 'positive', onItemTap: this.onBlockItemTap.bind(this)},
                  {name: 'いいえ', type: 'negative', onItemTap: this.modalViewTap.bind(this, 'block', false)},
                ];
                return (
                  <div className="room-setting-list-root">
                    <IconListItem
                      title={title}
                      leftIcon={<Button icon={<i className="material-icons">block</i>} />}
                      onClick={this.modalViewTap.bind(this, 'block', true)}
                    />
                    <ModalDialog
                      modalKey="block"
                      description={modalDescription}
                      actions={blockActions}
                    />
                  </div>
                );
              }
              return null;
            } else {
              if (room!.isCanLeft) {
                let leftActions: IModalAction[] = [
                  {name: 'はい', type: 'positive', onItemTap: this.onLeftItemTap.bind(this)},
                  {name: 'いいえ', type: 'negative', onItemTap: this.modalViewTap.bind(this, 'left', false)},
                ];
                return (
                  <div>
                    <IconListItem
                      title="グループ情報編集"
                      leftIcon={<Button icon={<i className="material-icons">create</i>} />}
                      onClick={this.modalViewTap.bind(this, 'roomEdit', true)}
                    />
                    <ModalView
                      title="グループ情報編集"
                      component={
                        <RoomEdit
                          roomName={room!.name!}
                          roomPictureUrl={room!.pictureUrl ? room!.pictureUrl! : noAvatarImages[0]}
                        />
                      }
                      onModalClick={this.onRoomEditOkClick.bind(this)}
                    />
                    <IconListItem
                      title="退出する"
                      leftIcon={<Button icon={<i className="material-icons">exit_to_app</i>} />}
                      onClick={this.modalViewTap.bind(this, 'left', true)}
                    />
                    <ModalDialog
                      modalKey="left"
                      description="退出しますか？"
                      actions={leftActions}
                    />
                  </div>
                );
              }
              return null;
            }
          })()}
        </div>
      </div>
    );
  }
}
