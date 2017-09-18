import * as React from 'react';
import {
  IPluginMessage,
  IUserForRoom,
  IMessage,
  dateFormateMMDD,
} from 'swagchat-sdk';
import { IRootStyleProps } from '../';
import * as indexStyles from '../../index.css';
import * as styles from './message-body.css';
import { MessageDateSeparator } from './internal/MessageDateSeparator';
import { MessageItem } from '../../components';
const classNames = require('classnames');

export interface IMessageBodyProps extends IRootStyleProps {
  myUserId: string;
  messages: {[key: string]: IMessage};
  roomUsers: {[key: string]: IUserForRoom} | null;
  pluginMessages:  IPluginMessage[];
  customPluginMessages?:  IPluginMessage[];
  noMessageImage?: string;
  noMessageText?: string;
}

export class MessageBody extends React.Component<IMessageBodyProps, {}> {
  public static defaultProps: Partial<IMessageBodyProps> = {
    className: '',
    style: {},
  };

  render(): JSX.Element  {
    const { messages, noMessageImage, noMessageText, pluginMessages, customPluginMessages, roomUsers, myUserId, className, style } = this.props;

    if (!(messages && Object.keys(messages).length > 0)) {
      return (
        <div className={indexStyles.nodataWrap}>
          {noMessageImage !== '' ? <img className={indexStyles.nodataImage} src={noMessageImage} /> : ''}
          <p className={indexStyles.nodataText}>{noMessageText !== '' ? noMessageText : ''}</p>
        </div>
      );
    }

    return (
      <div className={classNames(className, styles.root)} style={style}>
        {(() => {
          let messageItems = new Array;
          let workMMDD = '';
          let itemMMDD = '';
          for (const messageId in messages) {
            itemMMDD = dateFormateMMDD(messages[messageId].created!);
            if (workMMDD !== itemMMDD) {
              messageItems.push(
                <MessageDateSeparator key={'date-separator-' + messages[messageId].messageId} date={itemMMDD} />
              );
            }
            workMMDD = itemMMDD;
            messageItems.push(
              <MessageItem
                key={'message-item-' + messages[messageId].messageId!}
                pluginMessages={pluginMessages}
                customPluginMessages={customPluginMessages}
                message={messages[messageId]}
                user={roomUsers![messages[messageId].userId]}
                myUserId={myUserId}
              />
            );
          }
          return messageItems;
        })()}
      </div>
    );
  }
}
