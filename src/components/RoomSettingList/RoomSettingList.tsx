import * as React from 'react';
import { RoomType } from 'swagchat-sdk';
import { RoomSettingModalItem } from './RoomSettingModalItem';
import {
  IUserState,
  IRoomState,
  IStyleState,
} from '../../stores/';
import {
  Button,
  Block,
  Exit,
  IModalAction,
} from '../../';
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

  onBlockItemTap() {
    const users = opponentUser(this.props.roomState.room!.users!, this.props.userState.user!.userId);
    if (users && users.length > 0) {
      if (this.props.userState.blocks && this.props.userState.blocks.indexOf(users[0].userId) >= 0) {
        this.props.userUnBlockFetch([users[0].userId]);
      } else {
        this.props.userBlockFetch([users[0].userId]);
      }
    }
  }

  onLeftItemTap() {
    this.props.roomUserRemoveFetch([this.props.userState.user!.userId]);
  }

  render(): JSX.Element {
    return (
      <div>
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
                {name: 'いいえ', onItemTap: () => {}},
              ];
              return (
                <div className="room-setting-list-root">
                  <RoomSettingModalItem
                    title={title}
                    leftIcon={<Button icon={<Block />} />}
                    modalKey="block"
                    modalDescription={modalDescription}
                    modalActions={blockActions}
                    styleState={this.props.styleState}
                    updateStyle={this.props.updateStyle}
                  />
                </div>
              );
            }
            return null;
          } else {
            if (this.props.roomState.room!.isCanLeft) {
              let blockActions: IModalAction[] = [
                {name: 'はい', onItemTap: this.onLeftItemTap.bind(this)},
                {name: 'いいえ', onItemTap: () => {}},
              ];
              return (
                <div className="room-setting-list-root">
                  <RoomSettingModalItem
                    title="退会する"
                    leftIcon={<Button icon={<Exit />} />}
                    modalKey="left"
                    modalDescription="退会しますか？"
                    modalActions={blockActions}
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
    );
  }
}
