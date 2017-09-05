import * as React from 'react';
import {
  IRoom,
  RoomType,
  opponentUser,
  userBlockFetchRequestActionDispatch,
  userUnBlockFetchRequestActionDispatch,
  roomUserRemoveFetchRequestActionDispatch,
  combinedAssetPostAndRoomUpdateRequestActionDispatch,
} from 'swagchat-sdk';
import {
  Button,
  IModalAction,
  Modal,
  ModalAction,
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
  private _editRoomModalView: Modal | null;
  private _confirmBlockModalView: ModalAction | null;
  private _confirmLeftModalView: ModalAction | null;

  public static defaultProps: Partial<IRoomSettingListProps> = {
    title: '',
    desableMarginTop: true,
    displayNoDataImage: '',
    displayNoDataText: '',
  };

  onConfirmBlockModalView() {
    this._confirmBlockModalView ? this._confirmBlockModalView.onModalClick() : null;
  }

  onBlockItemTap = () => {
    const users = opponentUser(this.props.room!.users!, this.props.userId);
    if (users && users.length > 0) {
      if (this.props.userBlocks && this.props.userBlocks.indexOf(users[0].userId) >= 0) {
        userUnBlockFetchRequestActionDispatch([users[0].userId]);
      } else {
        userBlockFetchRequestActionDispatch([users[0].userId]);
      }
    }
    this._confirmBlockModalView ? this._confirmBlockModalView.onModalClick() : null;
  }

  onConfirmLeftModalView() {
    this._confirmLeftModalView ? this._confirmLeftModalView.onModalClick() : null;
  }

  onLeftItemTap = () => {
    roomUserRemoveFetchRequestActionDispatch([this.props.userId]);
    this._confirmLeftModalView ? this._confirmLeftModalView.onModalClick() : null;
  }

  onEditRoomModalView() {
    this._editRoomModalView ? this._editRoomModalView.onModalClick() : null;
  }

  onRoomEditOkClick = () => {
    combinedAssetPostAndRoomUpdateRequestActionDispatch();
    this._editRoomModalView ? this._editRoomModalView.onModalClick() : null;
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
                  {name: 'はい', onItemTap: this.onBlockItemTap.bind(this)},
                  {name: 'いいえ', onItemTap: this.onConfirmBlockModalView.bind(this)},
                ];
                return (
                  <div className="room-setting-list-root">
                    <IconListItem
                      title={title}
                      leftIcon={<Button icon={<i className="material-icons">block</i>} />}
                      onClick={this.onConfirmBlockModalView.bind(this)}
                    />
                    <ModalAction
                      ref={(child) => this._confirmBlockModalView = child}
                      component={modalDescription}
                      actions={blockActions}
                    />
                  </div>
                );
              }
              return null;
            } else {
              if (room!.isCanLeft) {
                let leftActions: IModalAction[] = [
                  {name: 'はい', onItemTap: this.onLeftItemTap.bind(this)},
                  {name: 'いいえ', onItemTap: this.onConfirmLeftModalView.bind(this)},
                ];
                return (
                  <div>
                    <IconListItem
                      title="グループ情報編集"
                      leftIcon={<Button icon={<i className="material-icons">create</i>} />}
                      onClick={this.onEditRoomModalView.bind(this)}
                    />
                    <Modal
                      ref={(child) => this._editRoomModalView = child}
                      type="button-top"
                      title="グループ情報編集"
                      component={
                        <RoomEdit
                          roomName={room!.name!}
                          roomPictureUrl={room!.pictureUrl ? room!.pictureUrl! : noAvatarImages[0]}
                        />
                      }
                      onOkModalClick={this.onRoomEditOkClick.bind(this)}
                    />
                    <IconListItem
                      title="退出する"
                      leftIcon={<Button icon={<i className="material-icons">exit_to_app</i>} />}
                      onClick={this.onConfirmLeftModalView.bind(this)}
                    />
                    <ModalAction
                      ref={(child) => this._confirmLeftModalView = child}
                      component={<p>退出しますか？</p>}
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
