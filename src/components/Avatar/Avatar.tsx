import * as React from 'react';
import { IRootStyleProps, IOnClickProps } from '../';
import * as styles from './avatar.css';
const classNames = require('classnames');

export interface IAvatarProps extends IRootStyleProps, IOnClickProps {
  src: string;
  shape?: 'circle' | 'square' | 'squareRound' | 'round';
}

export class Avatar extends React.Component<IAvatarProps, {}> {
  public static defaultProps: Partial<IAvatarProps> = {
    shape: 'circle',
    className: '',
    style: {},
    onClick: () => {},
  };

  render(): JSX.Element  {
    const { src, shape, className, style, onClick } = this.props;

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
        style={style}
        onClick={onClick}
      />
    );
  }
}
