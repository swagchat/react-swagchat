import * as React from 'react';
import { IOnClickProps } from '../';

export interface IAvatarProps extends IOnClickProps {
  type?: 'circle' | 'square' | 'square-round' | 'round';
  src: string;
  width?: string;
  height?: string;
  margin?: string;
  className?: string;
  style?: Object;
}

export class Avatar extends React.Component<IAvatarProps, {}> {
  public static defaultProps: Partial<IAvatarProps> = {
    type: 'circle',
    className: '',
    style: {},
    onClick: () => {},
  };

  render(): JSX.Element  {
    const { type, src, width, height, margin, className, style, onClick } = this.props;
    const classNames = require('classnames');

    let avatarClassName = '';
    switch (type) {
      case 'circle':
        avatarClassName = classNames('sc-avatar-root', 'circle');
        break;
      case 'square':
        avatarClassName = classNames('sc-avatar-root', 'square');
        break;
      case 'square-round':
        avatarClassName = classNames('sc-avatar-root', 'square-round');
        break;
      case 'round':
        avatarClassName = classNames('sc-avatar-root', 'round');
        break;
    }

    let avatarStyle: Object;
    let tmpStyle: {
      width?: string;
      height?: string;
      margin?: string;
    } = {};
    width ? tmpStyle.width = width : null;
    height ? tmpStyle.height = height : null;
    margin ? tmpStyle.margin = margin : null;
    avatarStyle = Object.assign(
      tmpStyle,
      style,
    );

    return (
      <img
        src={src}
        className={classNames(avatarClassName, className)}
        style={avatarStyle}
        onClick={onClick}
      />
    );
  }
}
