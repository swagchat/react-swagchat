import * as React from 'react';
import { Avatar } from '../../components';
import * as styles from './top-bar.css';

export interface IProps {
  title: string;
  pictureUrl?: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}

export class TopBar extends React.Component<IProps, {}> {
  render(): JSX.Element {
    const {title, pictureUrl, leftButton, rightButton} = this.props;
    return (
      <div className={styles.root}>
        {leftButton ? leftButton : null}
        {(() => {
          if (pictureUrl) {
            return (
              <div className={styles.avatarTitleWrap}>
                <div className={styles.avatar}><Avatar src={pictureUrl} width="32px" height="32px" /></div>
                <h1 className={styles.avatarTitle}>{title}</h1>
              </div>
            );
          } else {
            return <h1 className={styles.title}>{title}</h1>;
          }
        })()}
        {rightButton ? rightButton : null}
      </div>
    );
  }
}
