import * as React from 'react';
import { IOnClickProps, IShapeProps } from '../';
import * as styles from './avatar.css';
const classNames = require('classnames');

export interface IAvatarProps extends IOnClickProps, IShapeProps {
  src: string;
  width?: string;
  height?: string;
  margin?: string;
  className?: string;
  style?: Object;
}

export class Avatar extends React.Component<IAvatarProps, {}> {
  public static defaultProps: Partial<IAvatarProps> = {
    shape: 'circle',
    className: '',
    style: {},
    onClick: () => {},
  };

  render(): JSX.Element  {
    const { shape, src, width, height, margin, className, style, onClick } = this.props;

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

    let shapeClassName = '';
    if (['circle', 'square', 'squareRound', 'round'].indexOf(shape!) >= 0 ) {
      shapeClassName = styles[shape!];
    } else {
      shapeClassName = styles.circle;
    }

    return (
      <img
        src={src}
        className={classNames(styles.root, shapeClassName, className)}
        style={avatarStyle}
        onClick={onClick}
      />
    );
  }
}
