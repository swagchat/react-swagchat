import * as React from 'react';
import { RoomType } from 'swagchat-sdk';
import {
  IUserState,
  IRoomState,
  IStyleState,
  ISettingState,
} from '../../stores/';
import {
  Button,
  Block,
  Exit,
  Edit,
  IModalAction,
  ModalView,
  ModalDialog,
  IconListItem,
} from '../../components';
import { RoomEdit } from '../../components';
import { opponentUser } from '../../utils';

export interface IRoomSettingListProps {
  title?: string;
  desableMarginTop?: boolean;
  displayNoDataImage?: string;
  displayNoDataText?: string;
  userState: IUserState;
  roomState: IRoomState;
  styleState: IStyleState;
  settingState: ISettingState;
  updateStyle: (style: Object) => void;
  userBlockFetch: (blockUserIds: string[]) => void;
  userUnBlockFetch: (blockUserIds: string[]) => void;
  roomUserRemoveFetch: (userIds: string[]) => void;
  roomUpdateName: (updateName: string) => void;
  roomUpdatePicture: (updatePicture: Blob) => void;
  assetPostAndRoomUpdate: () => void;
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
    const users = opponentUser(this.props.roomState.room!.users!, this.props.userState.user!.userId);
    if (users && users.length > 0) {
      if (this.props.userState.blocks && this.props.userState.blocks.indexOf(users[0].userId) >= 0) {
        this.props.userUnBlockFetch([users[0].userId]);
      } else {
        this.props.userBlockFetch([users[0].userId]);
      }
    }
    this.modalViewTap('block', false);
  }

  onRoomEditOkClick = () => {
    this.modalViewTap('roomEdit', false);
    this.props.assetPostAndRoomUpdate();
  }

  onLeftItemTap = () => {
    this.props.roomUserRemoveFetch([this.props.userState.user!.userId]);
  }

  modalViewTap = (modalKey: string, isDisplay: boolean) => {
    this.props.updateStyle({
      modalStyle: {
        [modalKey]: {
          isDisplay: isDisplay,
        }
      }
    });
  }

  render(): JSX.Element {
    const {
      userState,
      roomState,
      styleState,
      settingState,
      updateStyle,
      roomUpdateName,
      roomUpdatePicture,
    } = this.props;
    return (
      <div>
        <div className="room-setting-list-root">
          {(() => {
            if (roomState.room!.type === RoomType.ONE_ON_ONE) {
              const users = opponentUser(roomState.room!.users!, userState.user!.userId);
              let title = 'ブロックする';
              let modalDescription = 'ブロックしますか？';
              if (users && users.length > 0 && users[0].isCanBlock) {
                if (userState.blocks && userState.blocks.indexOf(users[0].userId) >= 0) {
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
                      leftIcon={<Button icon={<Block />} />}
                      onClick={this.modalViewTap.bind(this, 'block', true)}
                    />
                    <ModalDialog
                      modalKey="block"
                      description={modalDescription}
                      actions={blockActions}
                      styleState={styleState}
                      updateStyle={updateStyle}
                    />
                  </div>
                );
              }
              return null;
            } else {
              if (roomState.room!.isCanLeft) {
                let leftActions: IModalAction[] = [
                  {name: 'はい', type: 'positive', onItemTap: this.onLeftItemTap.bind(this)},
                  {name: 'いいえ', type: 'negative', onItemTap: this.modalViewTap.bind(this, 'left', false)},
                ];
                return (
                  <div>
                    <IconListItem
                      title="グループ情報編集"
                      leftIcon={<Button icon={<Edit />} />}
                      onClick={this.modalViewTap.bind(this, 'roomEdit', true)}
                    />
                    <ModalView
                      title="グループ情報編集"
                      component={
                        <RoomEdit
                          roomName={roomState.room!.name}
                          roomPictureUrl={roomState.room!.pictureUrl ? roomState.room!.pictureUrl : settingState.noAvatarImages[0]}
                          roomUpdateName={roomUpdateName}
                          roomUpdatePicture={roomUpdatePicture}
                        />
                      }
                      modalKey="roomEdit"
                      styleState={styleState}
                      updateStyle={updateStyle}
                      onOkClick={this.onRoomEditOkClick.bind(this)}
                    />
                    <IconListItem
                      title="退出する"
                      leftIcon={<Button icon={<Exit />} />}
                      onClick={this.modalViewTap.bind(this, 'left', true)}
                    />
                    <ModalDialog
                      modalKey="left"
                      description="退出しますか？"
                      actions={leftActions}
                      styleState={styleState}
                      updateStyle={updateStyle}
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
