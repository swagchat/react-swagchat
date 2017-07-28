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

export class MessageInteraction extends React.Component<IMessageInteractionProps, void> {
  render(): JSX.Element {
    return (
      <div className="message-interaction-root">
        {(() => {
          let availableMessageType: string;
          let interaction = new Array;
          interaction.push(React.createElement(
            this.props.pluginState.customMessages[0].interaction, {
              key: 'message-interaction' + this.props.pluginState.customMessages[0].interaction.name,
              ownInteractionIndex: this.props.currentMenuIndex,
              currentMenuIndex: this.props.currentMenuIndex,
              styleState: this.props.styleState,
              settingState: this.props.settingState,
              userState: this.props.userState,
              roomState: this.props.roomState,
              onTextareaFocus: this.props.onTextareaFocus,
              onTextareaBlur: this.props.onTextareaBlur,
              createMessage: this.props.createMessage,
              sendMessages: this.props.sendMessages,
              updateStyle: this.props.updateStyle,
              updatePluginMessageTextInteractionStyle: this.props.updatePluginMessageTextInteractionStyle,
              updateMenuIndex: this.props.updateMenuIndex,
              assetPostAndSendMessage: this.props.assetPostAndSendMessage,
              updateRoom: this.props.updateRoom,
            }
          ));
          if (this.props.availableMessageTypes && this.props.availableMessageTypes.length > 0) {
            for (let i = 0; i < this.props.availableMessageTypes.length; i++) {
              availableMessageType = this.props.availableMessageTypes[i];
              for (let j = 0; j < this.props.pluginState.customMessages.length; j++) {
                let plugin = this.props.pluginState.customMessages[j];
                if (plugin.name === availableMessageType) {
                  let pluginInteraction = this.props.pluginState.customMessages[this.props.currentMenuIndex].interaction;
                    if (pluginInteraction.name !== 'TextInteraction') {
                    interaction.push(React.createElement(
                      pluginInteraction, {
                        key: 'message-interaction-' + j,
                        ownInteractionIndex: this.props.currentMenuIndex,
                        currentMenuIndex: this.props.currentMenuIndex,
                        styleState: this.props.styleState,
                        settingState: this.props.settingState,
                        userState: this.props.userState,
                        roomState: this.props.roomState,
                        onTextareaFocus: this.props.onTextareaFocus,
                        onTextareaBlur: this.props.onTextareaBlur,
                        createMessage: this.props.createMessage,
                        sendMessages: this.props.sendMessages,
                        updateStyle: this.props.updateStyle,
                        updatePluginMessageTextInteractionStyle: this.props.updatePluginMessageTextInteractionStyle,
                        updateMenuIndex: this.props.updateMenuIndex,
                        assetPostAndSendMessage: this.props.assetPostAndSendMessage,
                        updateRoom: this.props.updateRoom,
                      }
                    ));
                  }
                }
              }
            }
          } else {
            let pluginInteraction = this.props.pluginState.customMessages[this.props.currentMenuIndex].interaction;
            if (pluginInteraction.name !== 'TextInteraction') {
              interaction.push(React.createElement(
                pluginInteraction, {
                  key: 'message-interaction-' + pluginInteraction.name,
                  ownInteractionIndex: this.props.currentMenuIndex,
                  currentMenuIndex: this.props.currentMenuIndex,
                  styleState: this.props.styleState,
                  settingState: this.props.settingState,
                  userState: this.props.userState,
                  roomState: this.props.roomState,
                  onTextareaFocus: this.props.onTextareaFocus,
                  onTextareaBlur: this.props.onTextareaBlur,
                  createMessage: this.props.createMessage,
                  sendMessages: this.props.sendMessages,
                  updateStyle: this.props.updateStyle,
                  updatePluginMessageTextInteractionStyle: this.props.updatePluginMessageTextInteractionStyle,
                  updateMenuIndex: this.props.updateMenuIndex,
                  assetPostAndSendMessage: this.props.assetPostAndSendMessage,
                  updateRoom: this.props.updateRoom,
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
