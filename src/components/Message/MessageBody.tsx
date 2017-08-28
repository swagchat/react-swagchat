import * as React from 'react';
import { IRoom } from 'swagchat-sdk';
import { dateFormateMMDD } from '../../utils';
import {
  MessageDateSeparator,
  MessageInteractionBottom,
  MessageInteractionTop,
  MessageItem,
  MessageMenuBottom,
  MessageMenuTop,
} from '../../components';
import {
  IPluginState,
  IUserState,
  IRoomState,
  IMessageState,
  IStyleState,
  ISettingState
} from 'swagchat-sdk/src/stores/';
import { isIphone } from '../../utils';
import {
  IMessageBodyMenuStyle,
  IPluginMessageTextInteractionStyle,
} from 'swagchat-sdk/src/stores/style';

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
  updateMessageModyMenuStyle: (messageBodyMenuStyle: IMessageBodyMenuStyle) => void;
  updatePluginMessageTextInteractionStyle: (pluginMessageTextInteractionStyle: IPluginMessageTextInteractionStyle) => void;
  assetPostAndSendMessage: (file: Blob) => void;
  markAsRead: (roomId: string) => void;
  updateRoom: (putRoom: IRoom) => void;
}

export class MessageBody extends React.Component<IProps, {}> {
  private initialInteractionStyle: IMessageBodyMenuStyle = {
    paddingBottom: '5px',
  };

  componentDidMount() {
    this.props.updateMessageModyMenuStyle(this.initialInteractionStyle);
  }

  onTextareaFocus() {
    if (isIphone()) {
      this.props.updateMessageModyMenuStyle({paddingBottom: '45px'});
    }
  }

  onTextareaBlur() {
    if (isIphone()) {
      this.props.updateMessageModyMenuStyle(this.initialInteractionStyle);
    }
  }

  render(): JSX.Element  {
    const { messageState, settingState, pluginState, roomState, userState, styleState, createMessage, sendMessages, updateStyle, updatePluginMessageTextInteractionStyle, updateMenuIndex, updateRoom, assetPostAndSendMessage} = this.props;

    return (
      <div className="message-body-root">
        <div className="message-body-menu-top" style={styleState.messageBodyMenuStyle}>
          <MessageMenuTop
            pluginState={pluginState}
            userState={userState}
            roomState={roomState}
            currentMenuIndex={pluginState.currentMenuIndex}
            updateMenuIndex={updateMenuIndex}
            availableMessageTypes={roomState.room!.availableMessageTypes}
          />
          <MessageInteractionTop
            pluginState={pluginState}
            currentMenuIndex={pluginState.currentMenuIndex}
            styleState={styleState}
            settingState={settingState}
            userState={userState}
            roomState={roomState}
            onTextareaFocus={this.onTextareaFocus.bind(this)}
            onTextareaBlur={this.onTextareaBlur.bind(this)}
            createMessage={createMessage}
            sendMessages={sendMessages}
            updateStyle={updateStyle}
            updatePluginMessageTextInteractionStyle={updatePluginMessageTextInteractionStyle}
            updateMenuIndex={updateMenuIndex}
            assetPostAndSendMessage={assetPostAndSendMessage}
            availableMessageTypes={roomState.room!.availableMessageTypes}
            updateRoom={updateRoom}
          />
        </div>

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
        <div className="message-body-menu" style={styleState.messageBodyMenuStyle}>
          <MessageMenuBottom
            pluginState={pluginState}
            userState={userState}
            roomState={roomState}
            currentMenuIndex={pluginState.currentMenuIndex}
            updateMenuIndex={updateMenuIndex}
            availableMessageTypes={roomState.room!.availableMessageTypes}
          />
          <MessageInteractionBottom
            pluginState={pluginState}
            currentMenuIndex={pluginState.currentMenuIndex}
            styleState={styleState}
            settingState={settingState}
            userState={userState}
            roomState={roomState}
            onTextareaFocus={this.onTextareaFocus.bind(this)}
            onTextareaBlur={this.onTextareaBlur.bind(this)}
            createMessage={createMessage}
            sendMessages={sendMessages}
            updateStyle={updateStyle}
            updatePluginMessageTextInteractionStyle={updatePluginMessageTextInteractionStyle}
            updateMenuIndex={updateMenuIndex}
            assetPostAndSendMessage={assetPostAndSendMessage}
            availableMessageTypes={roomState.room!.availableMessageTypes}
            updateRoom={updateRoom}
          />
        </div>
      </div>
    );
  }
}
