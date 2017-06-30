import * as React from 'react';
import { IRoom } from 'swagchat-sdk';
import {
  IPluginState,
  IStyleState,
  ISettingState,
  IUserState,
  IRoomState
} from '../../stores/';

export interface IMessageInteractionProps {
  pluginState: IPluginState;
  currentMenuIndex: number;
  styleState: IStyleState;
  settingState: ISettingState;
  userState: IUserState;
  roomState: IRoomState;
  availableMessageTypes: string[] | null;
  createMessage: (messageType: string, payload: Object) => void;
  sendMessages: () => void;
  updateStyle: (style: Object) => void;
  updateMenuIndex: (currentMenuIndex: number) => void;
  assetPostAndSendMessage: (file: Blob) => void;
  updateRoom: (putRoom: IRoom) => void;
}

export class MessageInteraction extends React.Component<IMessageInteractionProps, void> {
  render(): JSX.Element {
    return (
      <div>
        {(() => {
          let availableMessageType: string;
          let interaction = null;
          if (this.props.availableMessageTypes && this.props.availableMessageTypes.length > 0) {
            for (let i = 0; i < this.props.availableMessageTypes.length; i++) {
              availableMessageType = this.props.availableMessageTypes[i];
              for (let j = 0; j < this.props.pluginState.customMessages.length; j++) {
                let plugin = this.props.pluginState.customMessages[j];
                if (plugin.name === availableMessageType) {
                  interaction = React.createElement(
                    this.props.pluginState.customMessages[this.props.currentMenuIndex].interaction, {
                      ownInteractionIndex: this.props.currentMenuIndex,
                      currentMenuIndex: this.props.currentMenuIndex,
                      styleState: this.props.styleState,
                      settingState: this.props.settingState,
                      userState: this.props.userState,
                      roomState: this.props.roomState,
                      createMessage: this.props.createMessage,
                      sendMessages: this.props.sendMessages,
                      updateStyle: this.props.updateStyle,
                      updateMenuIndex: this.props.updateMenuIndex,
                      assetPostAndSendMessage: this.props.assetPostAndSendMessage,
                      updateRoom: this.props.updateRoom,
                    }
                  );
                }
              }
            }
          } else {
            interaction = React.createElement(
              this.props.pluginState.messages[this.props.currentMenuIndex].interaction, {
                ownInteractionIndex: this.props.currentMenuIndex,
                currentMenuIndex: this.props.currentMenuIndex,
                styleState: this.props.styleState,
                settingState: this.props.settingState,
                userState: this.props.userState,
                roomState: this.props.roomState,
                createMessage: this.props.createMessage,
                sendMessages: this.props.sendMessages,
                updateStyle: this.props.updateStyle,
                updateMenuIndex: this.props.updateMenuIndex,
                assetPostAndSendMessage: this.props.assetPostAndSendMessage,
                updateRoom: this.props.updateRoom,
              }
            );
          }
          return interaction;
        })()}
      </div>
    );
  }
}
