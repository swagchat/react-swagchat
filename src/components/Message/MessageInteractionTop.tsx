import * as React from 'react';
import { IMessageInteractionProps } from './MessageInteractionBottom';

export class MessageInteractionTop extends React.Component<IMessageInteractionProps, {}> {
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
      updatePluginMessageTextInteractionStyle,
      updateRoom,
      assetPostAndSendMessage,
      availableMessageTypes,
    } = this.props;
    return (
      <div className="message-interaction-root">
        {(() => {
          let availableMessageType: string;
          let interaction = new Array;
          if (availableMessageTypes && availableMessageTypes.length > 0) {
            for (let i = 0; i < availableMessageTypes.length; i++) {
              availableMessageType = availableMessageTypes[i];
              for (let j = 0; j < pluginState.customMessages.length; j++) {
                let plugin = pluginState.customMessages[j];
                if (plugin.name === availableMessageType) {
                  let plugin = pluginState.customMessages[currentMenuIndex];
                    if (plugin.interaction.name !== 'TextInteraction' && plugin.position === 'TOP') {
                    interaction.push(React.createElement(
                      plugin.interaction, {
                        key: 'message-interaction-' + j,
                        ownInteractionIndex: currentMenuIndex,
                        currentMenuIndex: currentMenuIndex,
                        styleState: styleState,
                        settingState: settingState,
                        userState: userState,
                        roomState: roomState,
                        position: 'TOP',
                        onTextareaFocus: onTextareaFocus,
                        onTextareaBlur: onTextareaBlur,
                        updatePluginMessageTextInteractionStyle: updatePluginMessageTextInteractionStyle,
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
            if (plugin.interaction.name !== 'TextInteraction' && plugin.position === 'TOP') {
              interaction.push(React.createElement(
                plugin.interaction, {
                  key: 'message-interaction-' + plugin.name,
                  ownInteractionIndex: currentMenuIndex,
                  currentMenuIndex: currentMenuIndex,
                  styleState: styleState,
                  settingState: settingState,
                  userState: userState,
                  roomState: roomState,
                  position: 'TOP',
                  onTextareaFocus: onTextareaFocus,
                  onTextareaBlur: onTextareaBlur,
                  updatePluginMessageTextInteractionStyle: updatePluginMessageTextInteractionStyle,
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
