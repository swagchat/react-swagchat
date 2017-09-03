import * as React from 'react';
import { IOnClickProps } from '../';
const classNames = require('classnames');

export interface IAvatarProps extends IOnClickProps {
  type?: 'circle' | 'square' | 'round';
  text: string;
  width?: number;
  height?: number;
  margin?: number;
  color?: string;
  size?: string;
  className?: string;
  style?: Object;
}

export class TextAvatar extends React.Component<IAvatarProps, {}> {
  public static defaultProps: Partial<IAvatarProps> = {
    type: 'circle',
    className: '',
    style: {},
    onClick: () => {},
  };

  render(): JSX.Element  {
    const { type, text, width, height, margin, color, size, className, style, onClick } = this.props;

    let avatarClassName = 'sc-text-avatar-circle-root';
    switch (type) {
      case 'circle':
        break;
      case 'square':
        avatarClassName = 'sc-text-avatar-square-root';
        break;
      case 'round':
        avatarClassName = 'sc-text-avatar-round-root';
        break;
      default:
        break;
    }

    let textAvatarRootStyle: Object;
    let tmpTextAvatarRootStyle: {
      width?: string;
      height?: string;
      margin?: string;
    } = {};
    width ? tmpTextAvatarRootStyle.width = width + 'px' : null;
    height ? tmpTextAvatarRootStyle.height = height + 'px' : null;
    margin ? tmpTextAvatarRootStyle.margin = margin + 'px' : null;
    textAvatarRootStyle = Object.assign(
      tmpTextAvatarRootStyle,
      style,
    );

    let textAvatarElementStyle: {
      color?: string;
      fontSize?: string;
    } = {};
    color ? textAvatarElementStyle.color = color : null;
    size ? textAvatarElementStyle.fontSize = size : null;

    return (
      <div
        className={classNames(avatarClassName, className)}
        style={textAvatarRootStyle}
        onClick={onClick}
      >
        <div
          className="sc-text-avatar-element"
          style={textAvatarElementStyle}
        >
          {text}
        </div>
      </div>
    );
  }
}
