import * as React from 'react';
import { IRootStyleProps, IOnClickProps } from '../';
import * as styles from './button.css';
const classNames = require('classnames');

export interface IButtonProps extends IRootStyleProps, IOnClickProps {
  text?: string;
  icon?: React.ReactNode;
  shape?: 'square' | 'squareRound' | 'round';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'disable' | 'dark' | 'grey' | 'light' | 'linkPrimary' | 'linkBlack' | 'linkWhite';
  position?: 'center' | 'left' | 'right' | 'around' | 'between';
  iconPosition?: 'left' | 'right';
}

export class Button extends React.Component<IButtonProps, {}> {
  public static defaultProps: Partial<IButtonProps> = {
    shape: 'squareRound',
    color: 'primary',
    position: 'left',
    iconPosition: 'left',
    className: '',
    style: {},
    onClick: () => {},
  };

  render(): JSX.Element {
    const { shape, color, text, icon, iconPosition, className, onClick } = this.props;

    let shapeClassName = '';
    if (['square', 'squareRound', 'round'].indexOf(shape!) >= 0 ) {
      shapeClassName = styles[shape!];
    } else {
      shapeClassName = styles.squareRound;
    }

    let colorClassName = '';
    if (['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'disable', 'dark', 'grey', 'light', 'linkPrimary', 'linkBlack', 'linkWhite'].indexOf(color!) >= 0 ) {
      colorClassName = styles[color!];
    } else {
      colorClassName = styles.primary;
    }

    let buttonWrapStyle: {
      justifyContent?: string;
    } = {};
    let justifyContent = 'flex-start';
    switch (this.props.position) {
      case 'center':
        justifyContent = 'center';
        break;
      case 'left':
        justifyContent = 'flex-start';
        break;
      case 'right':
        justifyContent = 'flex-end';
        break;
      case 'around':
        justifyContent = 'space-around';
        break;
      case 'between':
        justifyContent = 'space-between';
    }
    buttonWrapStyle.justifyContent = justifyContent;

    const tmpText = text ? (
      <div className={classNames(styles.element, colorClassName, 'text')}>{text}</div>
     ) : null;
    const tmpIcon = icon ? (
      <div className={classNames(styles.element, colorClassName, 'icon')}>{icon}</div>
    ) : null;
    let buttonContents: React.ReactNode;

    if (iconPosition === 'left') {
      buttonContents = (
        <div
          className={styles.wrap}
          style={buttonWrapStyle as Object} // FIXME
        >
          {tmpIcon}
          {tmpText}
        </div>
      );
    } else if (iconPosition === 'right') {
      buttonContents = (
        <div
          className={styles.wrap}
          style={buttonWrapStyle as Object} // FIXME
        >
          {tmpText}
          {tmpIcon}
        </div>
      );
    }

    return (
      <a
        className={classNames(styles.root, shapeClassName, colorClassName, className)}
        onClick={onClick}
      >
        {buttonContents}
      </a>
    );
  }
}
