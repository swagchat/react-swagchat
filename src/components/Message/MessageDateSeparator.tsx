import * as React from 'react';

export interface IMessageDateSeparatorProps {
  date: string;
}

export const MessageDateSeparator = (props: IMessageDateSeparatorProps) => (
  <div className="message-date-separator-root">
    <div>
      <div className="message-date-separator-separate">
        <div className="message-date-separator-date">{props.date}</div>
      </div>
      <div className="message-date-separator-clear" />
    </div>
  </div>
);