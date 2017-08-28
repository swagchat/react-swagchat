import * as React from 'react';
import { IUserForRoom, IMessage } from 'swagchat-sdk';
import { IPluginMessage } from  '../../plugins/message';
import { IPluginState } from '../../stores/';

export interface IMessageItemProps {
  pluginState: IPluginState;
  message: IMessage;
  user: IUserForRoom;
  myUserId: string;
}

export class MessageItem extends React.Component<IMessageItemProps, {}> {
  render(): JSX.Element {
    return (
      <div>
        {(() => {
          let node: React.ReactNode = null;
          this.props.pluginState.messages.forEach((plugin: IPluginMessage) => {
            if (plugin.name === this.props.message.type) {
              node = React.createElement(
                plugin.item, {
                  message: this.props.message,
                  user: this.props.user,
                  myUserId: this.props.myUserId,
                }
              );
              return;
            }
          });
          return node;
        })()}
      </div>
    );
  }
}
