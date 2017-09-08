import * as React from 'react';
import { IOnClickProps } from '../';
const classNames = require('classnames');

export interface ITextAvatarProps extends IOnClickProps {
  type?: 'circle' | 'square' | 'square-round' | 'round';
  text: string;
  fontSize?: string;
  fontColor?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
  margin?: number;
  className?: string;
  style?: Object;
}

export class TextAvatar extends React.Component<ITextAvatarProps, {}> {
  public static defaultProps: Partial<ITextAvatarProps> = {
    type: 'circle',
    className: '',
    style: {},
    onClick: () => {},
  };

  render(): JSX.Element  {
    const { type, text, width, height, margin, fontColor, fontSize, backgroundColor, className, style, onClick } = this.props;

    let avatarClassName = '';
    switch (type) {
      case 'circle':
        avatarClassName = classNames('sc-text-avatar-root', 'circle');
        break;
      case 'square':
        avatarClassName = classNames('sc-text-avatar-root', 'square');
        break;
      case 'square-round':
        avatarClassName = classNames('sc-text-avatar-root', 'square-round');
        break;
      case 'round':
        avatarClassName = classNames('sc-text-avatar-root', 'round');
        break;
    }

    let textAvatarRootStyle: Object;
    let tmpTextAvatarRootStyle: {
      width?: string;
      height?: string;
      margin?: string;
      backgroundColor?: string;
    } = {};
    backgroundColor ? tmpTextAvatarRootStyle.backgroundColor = backgroundColor : null;
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
    fontSize ? textAvatarElementStyle.fontSize = fontSize : null;
    fontColor ? textAvatarElementStyle.color = fontColor : null;

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
