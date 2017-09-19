import * as React from 'react';
import {
  IAddonMessage,
  IUser,
  IRoom,
} from 'swagchat-sdk';
import * as styles from './message-menu.css';

export interface IMessageMenuProps {
  position?: 'top' | 'bottom';
  addonMessages: IAddonMessage[];
  customAddonMessages: IAddonMessage[];
  user: IUser;
  room: IRoom;
  currentMenuIndex: number;
  availableMessageTypes: string[] | null;
}

export class MessageMenu extends React.Component<IMessageMenuProps, {}> {
  public static defaultProps: Partial<IMessageMenuProps> = {
    position: 'bottom',
  };

  renderMessageMenu = () => {
    let menus = new Array;
    this.props.addonMessages.map((pluginMessage, i) => {
      if (pluginMessage.name !== 'text' && pluginMessage.position === this.props.position) {
        menus.push(React.createElement(
          pluginMessage.menu, {
            key: 'plugin-message-menu-' + i,
            user: this.props.user,
            room: this.props.room,
            ownMenuIndex: i,
            currentMenuIndex: this.props.currentMenuIndex,
          }
        ));
      }
    });
    return menus;
  }

  renderCustomMessageMenu = () => {
    let menus = new Array;
    this.props.availableMessageTypes!.map((availableMessageType, i) => {
      this.props.customAddonMessages.map(customPluginMessage => {
        if (customPluginMessage.name === availableMessageType && customPluginMessage.name !== 'text' && customPluginMessage.position === this.props.position) {
          menus.push(React.createElement(
            customPluginMessage.menu, {
              key: 'plugin-custom-message-menu-' + i,
              user: this.props.user,
              room: this.props.room,
              ownMenuIndex: i,
              currentMenuIndex: this.props.currentMenuIndex,
            }
          ));
        }
      });
    });
    return menus;
  }

  render(): JSX.Element  {
    const { position, availableMessageTypes } = this.props;

    let menus;
    if (availableMessageTypes && availableMessageTypes.length > 0) {
      menus = this.renderCustomMessageMenu();
    } else {
      menus = this.renderMessageMenu();
    }

    const classNames = require('classnames');
    return (
      <div className={menus.length > 0 ? classNames(styles.root, position) : ''}>
        {menus}
      </div>
    );
  }
}
