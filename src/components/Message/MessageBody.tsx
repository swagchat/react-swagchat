import * as React from 'react';
import {
  IUserState,
  IPluginState,
  IRoomState,
  IMessageState,
  IStyleState,
  ISettingState,
  IMessageBodyMenuStyle,
  dateFormateMMDD,
  isIphone,
  updateMessageBodyMenuStyleActionDispatch,
} from 'swagchat-sdk';
import {
  MessageDateSeparator,
  MessageInteractionBottom,
  MessageInteractionTop,
  MessageItem,
  MessageMenuBottom,
  MessageMenuTop,
} from '../../components';

export interface IProps {
  pluginState: IPluginState;
  userState: IUserState;
  roomState: IRoomState;
  messageState: IMessageState;
  styleState: IStyleState;
  settingState: ISettingState;
}

export class MessageBody extends React.Component<IProps, {}> {
  private initialInteractionStyle: IMessageBodyMenuStyle = {
    paddingBottom: '5px',
  };

  componentDidMount() {
    updateMessageBodyMenuStyleActionDispatch(this.initialInteractionStyle);
  }

  onTextareaFocus() {
    if (isIphone()) {
      updateMessageBodyMenuStyleActionDispatch({paddingBottom: '45px'});
    }
  }

  onTextareaBlur() {
    if (isIphone()) {
      updateMessageBodyMenuStyleActionDispatch(this.initialInteractionStyle);
    }
  }

  render(): JSX.Element  {
    const { messageState, settingState, pluginState, roomState, userState, styleState} = this.props;

    return (
      <div className="message-body-root">
        <div className="message-body-menu-top" style={styleState.messageBodyMenuStyle}>
          <MessageMenuTop
            pluginState={pluginState}
            userState={userState}
            roomState={roomState}
            currentMenuIndex={pluginState.currentMenuIndex}
            availableMessageTypes={roomState.room!.availableMessageTypes!}
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
            availableMessageTypes={roomState.room!.availableMessageTypes!}
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
            availableMessageTypes={roomState.room!.availableMessageTypes!}
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
            availableMessageTypes={roomState.room!.availableMessageTypes!}
          />
        </div>
      </div>
    );
  }
}
