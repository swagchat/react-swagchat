import * as React from 'react';
import {
  IAddonMessage,
  ISettingState,
  IUser,
  IRoom,
} from 'swagchat-sdk';
import * as styles from './message-interaction.css';
const classNames = require('classnames');

export interface IMessageInteractionProps {
  settingState: ISettingState;
  user: IUser;
  room: IRoom;
  position: 'top' | 'bottom';
  isAlwaysDisplay: boolean;
  addonMessages: IAddonMessage[];
  customAddonMessages: IAddonMessage[];
  currentMenuIndex: number;
  availableMessageTypes: string[] | null;
}

export class MessageInteraction extends React.Component<IMessageInteractionProps, {}> {
  public static defaultProps: Partial<IMessageInteractionProps> = {
    position: 'bottom',
  };

  renderMessageInteraction = () => {
    const { settingState, addonMessages, isAlwaysDisplay, currentMenuIndex, user, room, position } = this.props;
    let interactions = new Array;
    addonMessages.map((pluginMessage, i) => {
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
            }
          ));
        }
    });

    return interactions;
  }

  renderCustomMessageInteraction = () => {
    const { settingState, customAddonMessages, isAlwaysDisplay, currentMenuIndex, user, room, position } = this.props;
    let interactions = new Array;
    customAddonMessages.map((pluginMessage, i) => {
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

    return (
      <div className={interactions.length > 0 ? classNames(styles.root, position) : ''}>
        {interactions}
      </div>
    );
  }
}
