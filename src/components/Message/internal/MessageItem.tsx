import * as React from 'react';
import { IUserForRoom, IMessage, IAddonMessage } from 'swagchat-sdk';

export interface IMessageItemProps {
  addonMessages: IAddonMessage[];
  addonPluginMessages?: IAddonMessage[];
  message: IMessage;
  user: IUserForRoom;
  myUserId: string;
  onRenderComplete?: () => {};
  isLast: boolean;
}

export class MessageItem extends React.Component<IMessageItemProps, {}> {
  renderMessageItem = () => {
    let node: React.ReactNode = null;
    this.props.addonMessages.forEach((plugin: IAddonMessage) => {
      if (plugin.name === this.props.message.type) {
        node = React.createElement(
          plugin.item, {
            message: this.props.message,
            user: this.props.user,
            myUserId: this.props.myUserId,
            onRenderComplete: this.props.onRenderComplete,
            isLast: this.props.isLast,
          }
        );
        return;
      }
    });
    return node;
  }

  render(): JSX.Element {
    return (
      <div>
        {this.renderMessageItem()}
      </div>
    );
  }
}
