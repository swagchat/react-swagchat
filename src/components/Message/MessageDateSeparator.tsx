import * as React from 'react';

export interface IMessageDateSeparatorProps {
  date: string;
  className?: string;
  style?: Object;
}

export class MessageDateSeparator extends React.Component<IMessageDateSeparatorProps, {}> {
  public static defaultProps: Partial<IMessageDateSeparatorProps> = {
    className: '',
    style: {},
  };

  render(): JSX.Element  {
    const { date, className, style} = this.props;
    const classNames = require('classnames');
    return (
      <div
        className={classNames('sc-message-date-separator-root', className)}
        style={style}
      >
        <div>
          <div className="sc-message-date-separator-separate">
            <div className="sc-message-date-separator-date">{date}</div>
          </div>
          <div className="sc-message-date-separator-clear" />
        </div>
      </div>
    );
  }
}