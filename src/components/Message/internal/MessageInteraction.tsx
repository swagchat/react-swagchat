import * as React from 'react';
import {
  IPluginMessage,
  ISettingState,
  IUser,
  IRoom,
} from 'swagchat-sdk';

export interface IMessageInteractionProps {
  settingState: ISettingState;
  user: IUser;
  room: IRoom;
  position: 'top' | 'bottom';
  isAlwaysDisplay: boolean;
  onTextareaFocus: () => void;
  onTextareaBlur: () => void;
  pluginMessages: IPluginMessage[];
  customPluginMessages: IPluginMessage[];
  currentMenuIndex: number;
  availableMessageTypes: string[] | null;
}

export class MessageInteraction extends React.Component<IMessageInteractionProps, {}> {
  public static defaultProps: Partial<IMessageInteractionProps> = {
    position: 'bottom',
  };

  renderMessageInteraction = () => {
    const { settingState, pluginMessages, isAlwaysDisplay, currentMenuIndex, user, room, position, onTextareaBlur, onTextareaFocus } = this.props;
    let interactions = new Array;
    pluginMessages.map((pluginMessage, i) => {
      if ((pluginMessage.position === position && pluginMessage.isAlwaysDisplay) ||
        (pluginMessage.position === position && i === currentMenuIndex)) {
          interactions.push(React.createElement(
            pluginMessage.interaction, {
              key: 'plugin-custom-message-interaction-' + i,
              settingState: settingState,
              user: user,
              room: room,
              position: position,
              isAlwaysDisplay: isAlwaysDisplay,
              onTextareaFocus: onTextareaFocus,
              onTextareaBlur: onTextareaBlur,
            }
          ));
        }
    });

    return interactions;
  }

  renderCustomMessageInteraction = () => {
    const { settingState, customPluginMessages, isAlwaysDisplay, currentMenuIndex, user, room, position, onTextareaBlur, onTextareaFocus } = this.props;
    let interactions = new Array;
    customPluginMessages.map((pluginMessage, i) => {
      if ((pluginMessage.position === position && pluginMessage.isAlwaysDisplay) ||
        (pluginMessage.position === position && i === currentMenuIndex)) {
        interactions.push(React.createElement(
          pluginMessage.interaction, {
            key: 'plugin-custom-message-interaction-' + i,
            settingState: settingState,
            user: user,
            room: room,
            position: position,
            isAlwaysDisplay: isAlwaysDisplay,
            onTextareaFocus: onTextareaFocus,
            onTextareaBlur: onTextareaBlur,
          }
        ));
      }
    });
    return interactions;
  }

  render(): JSX.Element {
    const {
      position,
      availableMessageTypes,
    } = this.props;

    let interactions;
    if (availableMessageTypes && availableMessageTypes.length > 0) {
      interactions = this.renderCustomMessageInteraction();
    } else {
      interactions = this.renderMessageInteraction();
    }

    const classNames = require('classnames');
    return (
      <div className={interactions.length > 0 ? classNames('message-interaction-root', position) : ''}>
        {interactions}
      </div>
    );
  }
}
