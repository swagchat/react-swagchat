import * as React from 'react';
import { IRoom } from 'swagchat-sdk';
import {
  IPluginState,
  IStyleState,
  ISettingState,
  IUserState,
  IRoomState
} from '../../stores/';
import { IPluginMessageTextInteractionStyle } from '../../stores/style';

export interface IMessageInteractionProps {
  pluginState: IPluginState;
  currentMenuIndex: number;
  styleState: IStyleState;
  settingState: ISettingState;
  userState: IUserState;
  roomState: IRoomState;
  availableMessageTypes: string[] | null;
  onTextareaFocus: () => void;
  onTextareaBlur: () => void;
  createMessage: (messageType: string, payload: Object) => void;
  sendMessages: () => void;
  updateStyle: (style: Object) => void;
  updatePluginMessageTextInteractionStyle: (pluginMessageTextInteractionStyle: IPluginMessageTextInteractionStyle) => void;
  updateMenuIndex: (currentMenuIndex: number) => void;
  assetPostAndSendMessage: (file: Blob) => void;
  updateRoom: (putRoom: IRoom) => void;
}

export class MessageInteractionBottom extends React.Component<IMessageInteractionProps, void> {
  render(): JSX.Element {
    const {
      userState,
      roomState,
      styleState,
      settingState,
      pluginState,
      currentMenuIndex,
      onTextareaBlur,
      onTextareaFocus,
      createMessage,
      sendMessages,
      updateMenuIndex,
      updateStyle,
      updatePluginMessageTextInteractionStyle,
      updateRoom,
      assetPostAndSendMessage,
      availableMessageTypes,
    } = this.props;
    let bottomPluginCount = 0;
    if (availableMessageTypes && availableMessageTypes.length > 0) {
      for (let i = 0; i < pluginState.customMessages.length; i++) {
        let plugin = pluginState.messages[i];
        if (plugin.position === 'BOTTOM') {
          bottomPluginCount++;
        }
      }
    } else {
      for (let i = 0; i < pluginState.messages.length; i++) {
        let plugin = pluginState.messages[i];
        if (plugin.position === 'BOTTOM') {
          bottomPluginCount++;
        }
      }
    }
    return (
      <div className="message-interaction-root" style={bottomPluginCount === 1 ? {marginLeft: '10px'} : {}}>
        {(() => {
          let availableMessageType: string;
          let interaction = new Array;
          interaction.push(React.createElement(
            pluginState.customMessages[0].interaction, {
              key: 'message-interaction' + pluginState.customMessages[0].interaction.name,
              ownInteractionIndex: currentMenuIndex,
              currentMenuIndex: currentMenuIndex,
              styleState: styleState,
              settingState: settingState,
              userState: userState,
              roomState: roomState,
              position: 'BOTTOM',
              onTextareaFocus: onTextareaFocus,
              onTextareaBlur: onTextareaBlur,
              createMessage: createMessage,
              sendMessages: sendMessages,
              updateStyle: updateStyle,
              updatePluginMessageTextInteractionStyle: updatePluginMessageTextInteractionStyle,
              updateMenuIndex: updateMenuIndex,
              assetPostAndSendMessage: assetPostAndSendMessage,
              updateRoom: updateRoom,
            }
          ));
          if (availableMessageTypes && availableMessageTypes.length > 0) {
            for (let i = 0; i < availableMessageTypes.length; i++) {
              availableMessageType = availableMessageTypes[i];
              for (let j = 0; j < pluginState.customMessages.length; j++) {
                let plugin = pluginState.customMessages[j];
                if (plugin.name === availableMessageType) {
                  let plugin = pluginState.customMessages[currentMenuIndex];
                    if (plugin.interaction.name !== 'TextInteraction' && plugin.position === 'BOTTOM') {
                    interaction.push(React.createElement(
                      plugin.interaction, {
                        key: 'message-interaction-' + j,
                        ownInteractionIndex: currentMenuIndex,
                        currentMenuIndex: currentMenuIndex,
                        styleState: styleState,
                        settingState: settingState,
                        userState: userState,
                        roomState: roomState,
                        position: 'BOTTOM',
                        onTextareaFocus: onTextareaFocus,
                        onTextareaBlur: onTextareaBlur,
                        createMessage: createMessage,
                        sendMessages: sendMessages,
                        updateStyle: updateStyle,
                        updatePluginMessageTextInteractionStyle: updatePluginMessageTextInteractionStyle,
                        updateMenuIndex: updateMenuIndex,
                        assetPostAndSendMessage: assetPostAndSendMessage,
                        updateRoom: updateRoom,
                      }
                    ));
                  }
                }
              }
            }
          } else {
            let plugin = pluginState.customMessages[currentMenuIndex];
            if (plugin.interaction.name !== 'TextInteraction' && plugin.position === 'BOTTOM') {
              interaction.push(React.createElement(
                plugin.interaction, {
                  key: 'message-interaction-' + plugin.interaction.name,
                  ownInteractionIndex: currentMenuIndex,
                  currentMenuIndex: currentMenuIndex,
                  styleState: styleState,
                  settingState: settingState,
                  userState: userState,
                  roomState: roomState,
                  position: 'BOTTOM',
                  onTextareaFocus: onTextareaFocus,
                  onTextareaBlur: onTextareaBlur,
                  createMessage: createMessage,
                  sendMessages: sendMessages,
                  updateStyle: updateStyle,
                  updatePluginMessageTextInteractionStyle: updatePluginMessageTextInteractionStyle,
                  updateMenuIndex: updateMenuIndex,
                  assetPostAndSendMessage: assetPostAndSendMessage,
                  updateRoom: updateRoom,
                }
              ));
            }
          }
          return interaction;
        })()}
      </div>
    );
  }
}
