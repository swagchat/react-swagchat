import * as React from 'react';
import { Avatar, IRootStyleProps } from '../../components';
import * as styles from './top-bar.css';
const classNames = require('classnames');

export interface IProps extends IRootStyleProps {
  title: string;
  pictureUrl?: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}

export class TopBar extends React.Component<IProps, {}> {
  render(): JSX.Element {
    const {className, style, title, pictureUrl, leftButton, rightButton} = this.props;
    return (
      <div className={classNames(className, styles.root)} style={style}>
        {leftButton ? <div className={styles.leftButton}>{leftButton}</div> : null}
        <div className={styles.avatarTitleWrap}>
          {pictureUrl ? (
            <Avatar className={styles.avatar} src={pictureUrl} />
          ) : null}
          <h1 className={styles.title}>{title}</h1>
        </div>
        {rightButton ? <div className={styles.rightButton}>{rightButton}</div> : null}
      </div>
    );
  }
}
