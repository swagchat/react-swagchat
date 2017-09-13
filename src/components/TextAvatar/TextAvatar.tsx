import * as React from 'react';
import { IOnClickProps, IShapeProps } from '../';
import * as styles from './text-avatar.css';
const classNames = require('classnames');

export interface ITextAvatarProps extends IOnClickProps, IShapeProps {
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
    shape: 'circle',
    className: '',
    style: {},
    onClick: () => {},
  };

  render(): JSX.Element  {
    const { shape, text, width, height, margin, fontColor, fontSize, backgroundColor, className, style, onClick } = this.props;

    let shapeClassName = '';
    if (['circle', 'square', 'squareRound', 'round'].indexOf(shape!) >= 0 ) {
      shapeClassName = styles[shape!];
    } else {
      shapeClassName = styles.circle;
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
        className={classNames(styles.root, shapeClassName, className)}
        style={textAvatarRootStyle}
        onClick={onClick}
      >
        <div
          className={styles.element}
          style={textAvatarElementStyle}
        >
          {text}
        </div>
      </div>
    );
  }
}
