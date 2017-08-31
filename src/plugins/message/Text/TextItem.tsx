import * as React from 'react';
import { dateFormateHHMM, IPluginMessageItemProps } from 'swagchat-sdk';
import { Avatar } from '../../../components';

export interface ITextPayload {
  text: string;
}

export class TextItem extends React.Component<IPluginMessageItemProps, {}> {
  render(): JSX.Element {
    const { message, myUserId, user} = this.props;
    const payload = message.payload as ITextPayload;
    let splitMessage = payload.text.split('\n');
    let displayText = new Array;
    splitMessage.forEach((value, index) => {
      displayText.push(<span key={'text-item-' + message.messageId + '-' + index}>{value}<br /></span>);
    });

    if (user.userId === myUserId) {
      return (
        <div>
          <div className="text-item-message-right">{displayText}</div>
          <div className="text-item-time-right">{dateFormateHHMM(message.created!)}</div>
          <div className="text-item-clear" />
        </div>
      );
    } else {
      return (
        <div>
          <Avatar className="text-item-avatar" src={user.pictureUrl} />
          <p className="text-item-name">{user.name}</p>
          <div className="text-item-message-left">{payload.text}</div>
          <div className="text-item-time-left">{dateFormateHHMM(message.created!)}</div>
          <div className="text-item-clear" />
        </div>
      );
    }
  }
}
