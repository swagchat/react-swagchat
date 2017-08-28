import * as React from 'react';
import { Avatar } from '../../components';

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
      <div className="topbar-root">
        {leftButton ? leftButton : null}
        {(() => {
          if (pictureUrl) {
            return (
              <div className="topbar-avatar-title-wrap">
                <div className="topbar-avatar"><Avatar src={pictureUrl} width={32} height={32} /></div>
                <h1 className="topbar-avatar-title">{title}</h1>
              </div>
            );
          } else {
            return <h1 className="topbar-title">{title}</h1>;
          }
        })()}
        {rightButton ? rightButton : null}
      </div>
    );
  }
}
