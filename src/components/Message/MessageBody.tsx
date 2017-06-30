import * as React from 'react';
import { IRoom } from 'swagchat-sdk';
import { dateFormateMMDD } from '../../utils';
import {
  MessageDateSeparator,
  MessageInteraction,
  MessageItem,
  MessageMenu,
} from '../../';
import {
  IPluginState,
  IUserState,
  IRoomState,
  IMessageState,
  IStyleState,
  ISettingState
} from '../../stores/';

export interface IProps {
  pluginState: IPluginState;
  userState: IUserState;
  roomState: IRoomState;
  messageState: IMessageState;
  styleState: IStyleState;
  settingState: ISettingState;
  createMessage: (messageType: string, payload: Object) => void;
  sendMessages: () => void;
  updateMenuIndex: (currentMenuIndex: number) => void;
  updateStyle: (style: Object) => void;
  assetPostAndSendMessage: (file: Blob) => void;
  markAsRead: (roomId: string) => void;
  updateRoom: (putRoom: IRoom) => void;
}

export class MessageBody extends React.Component<IProps, void> {
  render(): JSX.Element  {
    const { messageState, settingState, pluginState, roomState, userState, styleState, createMessage, sendMessages, updateStyle, updateMenuIndex, updateRoom, assetPostAndSendMessage} = this.props;
    return (
      <div className="message-body-root">
        {(() => {
          if (!(messageState.messages && Object.keys(messageState.messages).length > 0)) {
            return (
              <div className="nodata-wrap">
                {settingState.noMessageImage !== '' ? <img className="nodata-image" src={settingState.noMessageImage} /> : ''}
                <p className="nodata-text">{settingState.noMessageText !== '' ? settingState.noMessageText : ''}</p>
              </div>
            );
          }
          let messageItems = new Array;
          let workMMDD = '';
          let itemMMDD = '';
          for (const messageId in messageState.messages) {
            itemMMDD = dateFormateMMDD(messageState.messages[messageId].created!);
            if (workMMDD !== itemMMDD) {
              messageItems.push(
                <MessageDateSeparator key={'date-separator-' + messageState.messages[messageId].messageId} date={itemMMDD} />
              );
            }
            workMMDD = itemMMDD;
            messageItems.push(
              <MessageItem
                key={'message-item-' + messageState.messages[messageId].messageId!}
                pluginState={pluginState}
                message={messageState.messages[messageId]}
                user={roomState.roomUsers![messageState.messages[messageId].userId]}
                myUserId={userState.user!.userId}
              />
            );
          }
          return messageItems;
        })()}
        <MessageInteraction
          pluginState={pluginState}
          currentMenuIndex={pluginState.currentMenuIndex}
          styleState={styleState}
          settingState={settingState}
          userState={userState}
          roomState={roomState}
          createMessage={createMessage}
          sendMessages={sendMessages}
          updateStyle={updateStyle}
          updateMenuIndex={updateMenuIndex}
          assetPostAndSendMessage={assetPostAndSendMessage}
          availableMessageTypes={roomState.room!.availableMessageTypes}
          updateRoom={updateRoom}
        />
        <MessageMenu
          pluginState={pluginState}
          userState={userState}
          roomState={roomState}
          currentMenuIndex={pluginState.currentMenuIndex}
          updateMenuIndex={updateMenuIndex}
          availableMessageTypes={roomState.room!.availableMessageTypes}
        />
      </div>
    );
  }
}
