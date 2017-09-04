import * as React from 'react';
import { IOnClickProps } from '../';

export interface IAvatarProps extends IOnClickProps {
  type?: 'circle' | 'square' | 'round';
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

    let avatarClassName = '';
    switch (type) {
      case 'circle':
        avatarClassName = 'sc-avatar-circle';
        break;
      case 'square':
        avatarClassName = 'sc-avatar-square';
        break;
      case 'round':
        avatarClassName = 'sc-avatar-round';
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

    const classNames = require('classnames');

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
