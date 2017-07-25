import * as React from 'react';
import { RoomType } from 'swagchat-sdk';
import {
  IUserState,
  IRoomState,
  IStyleState,
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
} from '../../';
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
  updateStyle: (style: Object) => void;
  userBlockFetch: (blockUserIds: string[]) => void;
  userUnBlockFetch: (blockUserIds: string[]) => void;
  roomUserRemoveFetch: (userIds: string[]) => void;
  onItemTap?: Function;
}

export class RoomSettingList extends React.Component<IRoomSettingListProps, void> {
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
  }

  onEditItemTap = () => {
    // this.props.roomUserRemoveFetch([this.props.userState.user!.userId]);
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
    return (
      <div>
        <div className="room-setting-list-root">
          {(() => {
            if (this.props.roomState.room!.type === RoomType.ONE_ON_ONE) {
              const users = opponentUser(this.props.roomState.room!.users!, this.props.userState.user!.userId);
              let title = 'ブロックする';
              let modalDescription = 'ブロックしますか？';
              if (users && users.length > 0 && users[0].isCanBlock) {
                if (this.props.userState.blocks && this.props.userState.blocks.indexOf(users[0].userId) >= 0) {
                  title = 'ブロックを解除する';
                  modalDescription = 'ブロックを解除しますか？';
                }
                let blockActions: IModalAction[] = [
                  {name: 'はい', onItemTap: this.onBlockItemTap.bind(this)},
                  {name: 'いいえ', onItemTap: this.modalViewTap.bind(this, 'block', false)},
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
                      styleState={this.props.styleState}
                      updateStyle={this.props.updateStyle}
                    />

                  </div>
                );
              }
              return null;
            } else {
              if (this.props.roomState.room!.isCanLeft) {
                let leftActions: IModalAction[] = [
                  {name: 'はい', onItemTap: this.onLeftItemTap.bind(this)},
                  {name: 'いいえ', onItemTap: this.modalViewTap.bind(this, 'left', false)},
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
                      component={<RoomEdit roomName={this.props.roomState.room!.name} roomPictureUrl={this.props.roomState.room!.pictureUrl} />}
                      modalKey="roomEdit"
                      styleState={this.props.styleState}
                      updateStyle={this.props.updateStyle}
                    />
                    <IconListItem
                      title="退会する"
                      leftIcon={<Button icon={<Exit />} />}
                      onClick={this.modalViewTap.bind(this, 'left', true)}
                    />
                    <ModalDialog
                      modalKey="left"
                      description="退会しますか？"
                      actions={leftActions}
                      styleState={this.props.styleState}
                      updateStyle={this.props.updateStyle}
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
