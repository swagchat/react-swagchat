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
  RoomEditForm,
} from '../../components';
import * as styles from './room-setting-list.css';

export interface IRoomSettingButtonsProps {
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

export class RoomSettingButtons extends React.Component<IRoomSettingButtonsProps, {}> {
  private _editRoomModalView: Modal | null;
  private _confirmBlockModalView: ModalAction | null;
  private _confirmLeftModalView: Modal | null;

  public static defaultProps: Partial<IRoomSettingButtonsProps> = {
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
                <div>
                  <Button
                    text={title}
                    className={styles.roomSettingButton}
                    color="linkPrimary"
                    position="left"
                    shape="square"
                    width="100%"
                    icon={<i className="material-icons">block</i>}
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
              return (
                <div>
                  <Button
                    text="グループ情報編集"
                    className={styles.roomSettingButton}
                    color="linkPrimary"
                    position="left"
                    shape="square"
                    width="100%"
                    icon={<i className="material-icons">block</i>}
                    onClick={this.onEditRoomModalView.bind(this)}
                  />
                  <Modal
                    ref={(child) => this._editRoomModalView = child}
                    type="buttonTop"
                    title="グループ情報編集"
                    component={
                      <RoomEditForm
                        roomName={room!.name!}
                        roomPictureUrl={room!.pictureUrl ? room!.pictureUrl! : noAvatarImages[0]}
                      />
                    }
                    onOkModalClick={this.onRoomEditOkClick.bind(this)}
                  />
                  <Button
                    text="退出する"
                    className={styles.roomSettingButton}
                    color="linkPrimary"
                    position="left"
                    shape="square"
                    width="100%"
                    icon={<i className="material-icons">exit_to_app</i>}
                    onClick={this.onConfirmLeftModalView.bind(this)}
                  />
                  <Modal
                    ref={(child) => this._confirmLeftModalView = child}
                    type="buttonBottom"
                    component={<p>退出しますか？</p>}
                    onOkModalClick={this.onLeftItemTap.bind(this)}
                  />
                </div>
              );
            }
            return null;
          }
        })()}
      </div>
    );
  }
}
