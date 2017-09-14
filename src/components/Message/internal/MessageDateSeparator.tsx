import * as React from 'react';
import { IRootStyleProps } from '../../';
import * as styles from './message-date-separator.css';
const classNames = require('classnames');

export interface IMessageDateSeparatorProps extends IRootStyleProps {
  date: string;
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