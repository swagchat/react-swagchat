import * as React from 'react';
import * as styles from './message-date-separator.css';
const classNames = require('classnames');

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
    return (
      <div
        className={classNames(styles.root, className)}
        style={style}
      >
        <div>
          <div className={styles.separate}>
            <div className={styles.date}>{date}</div>
          </div>
          <div className={styles.clear} />
        </div>
      </div>
    );
  }
}