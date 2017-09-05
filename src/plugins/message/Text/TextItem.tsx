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

    return (
      <div className="sc-text-item-root">
        {user.userId === myUserId ? (
          <div>
            <div className="sc-text-item-message-right">{displayText}</div>
            <div className="sc-text-item-time-right">{dateFormateHHMM(message.created!)}</div>
            <div className="sc-text-item-clear" />
          </div>
        ) : (
          <div>
            <Avatar className="sc-text-item-avatar" src={user.pictureUrl} />
            <p className="sc-text-item-name">{user.name}</p>
            <div className="sc-text-item-message-left">{payload.text}</div>
            <div className="sc-text-item-time-left">{dateFormateHHMM(message.created!)}</div>
            <div className="sc-text-item-clear" />
          </div>
        )}
      </div>
    );
  }
}
