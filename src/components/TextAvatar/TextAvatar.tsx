import * as React from 'react';
import { IRootStyleProps, IOnClickProps } from '../';
import * as styles from './text-avatar.css';
const classNames = require('classnames');

export interface ITextAvatarProps extends IOnClickProps, IRootStyleProps {
  text: string;
  shape?: 'circle' | 'square' | 'squareRound' | 'round';
}

export class TextAvatar extends React.Component<ITextAvatarProps, {}> {
  public static defaultProps: Partial<ITextAvatarProps> = {
    shape: 'circle',
    className: '',
    style: {},
    onClick: () => {},
  };

  render(): JSX.Element  {
    const { shape, text, className, style, onClick } = this.props;

    let shapeClassName = '';
    if (['circle', 'square', 'squareRound', 'round'].indexOf(shape!) >= 0 ) {
      shapeClassName = styles[shape!];
    } else {
      shapeClassName = styles.circle;
    }

    return (
      <div
        className={classNames(styles.root, shapeClassName, className)}
        style={style}
        onClick={onClick}
      >
        <div className={styles.element}>{text}</div>
      </div>
    );
  }
}
