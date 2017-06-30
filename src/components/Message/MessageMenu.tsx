import * as React from 'react';
import {
  IPluginState,
  IUserState,
  IRoomState
} from '../../stores/';

export interface IProps {
  pluginState: IPluginState;
  userState: IUserState;
  roomState: IRoomState;
  currentMenuIndex: number;
  updateMenuIndex: (currentMenuINdex: number) => void;
  availableMessageTypes: string[] | null;
}

export class MessageMenu extends React.Component<IProps, void> {
  render(): JSX.Element  {
    return (
      <div className="message-menu-root">
        {(() => {
          let availableMessageType: string;
          let interactions = new Array;
          if (this.props.availableMessageTypes && this.props.availableMessageTypes.length > 0) {
            for (let i = 0; i < this.props.availableMessageTypes.length; i++) {
              availableMessageType = this.props.availableMessageTypes[i];
              for (let j = 0; j < this.props.pluginState.customMessages.length; j++) {
                let plugin = this.props.pluginState.customMessages[j];
                  if (plugin.name === availableMessageType) {
                    interactions.push(React.createElement(
                      this.props.pluginState.customMessages[this.props.currentMenuIndex].menu, {
                        key: 'plugin-message-interaction-' + i,
                        userState: this.props.userState,
                        roomState: this.props.roomState,
                        ownMenuIndex: i,
                        currentMenuIndex: this.props.currentMenuIndex,
                        updateMenuIndex: this.props.updateMenuIndex,
                      }
                    ));
                  }
              }
            }
          } else {
            for (let i = 0; i < this.props.pluginState.messages.length; i++) {
              interactions.push(React.createElement(
                this.props.pluginState.messages[i].menu, {
                  key: 'plugin-message-interaction-' + i,
                  userState: this.props.userState,
                  roomState: this.props.roomState,
                  ownMenuIndex: i,
                  currentMenuIndex: this.props.currentMenuIndex,
                  updateMenuIndex: this.props.updateMenuIndex,
                }
              ));
            }
          }
          return interactions;
        })()}
      </div>
    );
  }
}
