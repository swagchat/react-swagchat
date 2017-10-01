import * as React from 'react';
import {
  IRoom,
  RoomType,
  opponentUser,
  userBlockRequestActionDispatch,
  userUnBlockRequestActionDispatch,
  removeRoomUserRequestActionDispatch,
  uploadAssetAndUpdateRoomRequestActionDispatch,
  MODAL_KEY_BLOCK_USER,
  MODAL_KEY_EDIT_ROOM,
  MODAL_KEY_LEAVE_ROOM,
} from 'swagchat-sdk';
import {
  Button,
  Modal,
  IRootStyleProps,
} from '../../components';
import { RoomEditForm } from '../../components/internal/RoomEditForm/RoomEditForm';

import * as styles from './room-setting-list.css';

export interface IRoomSettingButtonsProps extends IRootStyleProps {
  userId: string;
  userBlocks: string[];
  room: IRoom;
  noAvatarImages: string[];
  displayNoDataImage?: string;
  displayNoDataText?: string;
  onItemTap?: Function;
}

export class RoomSettingButtons extends React.Component<IRoomSettingButtonsProps, {}> {
  private _editRoomModalView: Modal | null;
  private _confirmBlockModalView: Modal | null;
  private _confirmLeftModalView: Modal | null;

  public static defaultProps: Partial<IRoomSettingButtonsProps> = {
    displayNoDataImage: '',
    displayNoDataText: '',
    className: '',
    style: {},
  };

  onConfirmBlockModalView() {
    this._confirmBlockModalView ? this._confirmBlockModalView.onModalClick() : null;
  }

  onBlockItemTap = () => {
    const users = opponentUser(this.props.room!.users!, this.props.userId);
    if (users && users.length > 0) {
      if (this.props.userBlocks && this.props.userBlocks.indexOf(users[0].userId) >= 0) {
        userUnBlockRequestActionDispatch([users[0].userId]);
      } else {
        userBlockRequestActionDispatch([users[0].userId]);
      }
    }
    this._confirmBlockModalView ? this._confirmBlockModalView.onModalClick() : null;
  }

  onConfirmLeftModalView() {
    this._confirmLeftModalView ? this._confirmLeftModalView.onModalClick() : null;
  }

  onLeftItemTap = () => {
    removeRoomUserRequestActionDispatch([this.props.userId]);
    this._confirmLeftModalView ? this._confirmLeftModalView.onModalClick() : null;
  }

  onEditRoomModalView() {
    this._editRoomModalView ? this._editRoomModalView.onModalClick() : null;
  }

  onRoomEditOkClick = () => {
    uploadAssetAndUpdateRoomRequestActionDispatch();
    this._editRoomModalView ? this._editRoomModalView.onModalClick() : null;
  }

  render(): JSX.Element {
    const {
      userId,
      userBlocks,
      room,
      noAvatarImages,
      className,
      style,
    } = this.props;
    return (
      <div className={className} style={style}>
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
              return (
                <div>
                  <Button
                    text={title}
                    className={styles.roomSettingButton}
                    color="linkPrimary"
                    position="left"
                    shape="square"
                    icon={<i className="material-icons">block</i>}
                    onClick={this.onConfirmBlockModalView.bind(this)}
                  />
                  <Modal
                    ref={(child) => this._confirmBlockModalView = child}
                    buttonPosition="bottom"
                    modalKey={MODAL_KEY_BLOCK_USER}
                    title={modalDescription}
                    onOkModalClick={this.onBlockItemTap.bind(this)}
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
                    icon={<i className="material-icons">block</i>}
                    onClick={this.onEditRoomModalView.bind(this)}
                  />
                  <Modal
                    ref={(child) => this._editRoomModalView = child}
                    buttonPosition="top"
                    modalKey={MODAL_KEY_EDIT_ROOM}
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
                    icon={<i className="material-icons">exit_to_app</i>}
                    onClick={this.onConfirmLeftModalView.bind(this)}
                  />
                  <Modal
                    ref={(child) => this._confirmLeftModalView = child}
                    buttonPosition="bottom"
                    modalKey={MODAL_KEY_LEAVE_ROOM}
                    title="退出しますか？"
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
