import * as React from 'react';
import { IOnClickProps, IShapeProps } from '../';
import * as styles from './button.css';
const classNames = require('classnames');

export interface IButtonProps extends IShapeProps, IOnClickProps {
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'disable' | 'dark' | 'light' | 'linkPrimary' | 'linkBlack' | 'linkWhite';
  text?: string;
  icon?: React.ReactNode;
  width?: string;
  margin?: string;
  position?: 'center' | 'left' | 'right' | 'around' | 'between';
  iconPosition?: 'left' | 'right';
  fontSize?: string;
  fontColor?: string;
  hoverFontColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  className?: string;
  style?: Object;
}

export class Button extends React.Component<IButtonProps, {}> {
  private _rootDom: HTMLAnchorElement | null;
  private _buttonWrapDom: HTMLDivElement | null;
  private _buttonTextDom: HTMLDivElement | null;
  private _buttonIconDom: HTMLDivElement | null;

  private _buttonRootStyle: {};
  private _buttonWrapStyle: {};
  private _buttonElementStyle: {};

  private _buttonRootStyleText: string;
  private _buttonTextStyleText: string;
  private _buttonIconStyleText: string;

  public static defaultProps: Partial<IButtonProps> = {
    shape: 'squareRound',
    color: 'primary',
    iconPosition: 'left',
    className: '',
    style: {},
    onClick: () => {},
  };

  constructor(props: IButtonProps) {
    super(props);

    let buttonRootDefaultStyle: {
      width?: string;
    } = {};
    if (this.props.width) {
      buttonRootDefaultStyle.width = this.props.width;
    }
    let buttonRootStyle = Object.assign(
      buttonRootDefaultStyle,
      this.props.style,
    );
    this._buttonRootStyle = buttonRootStyle;

    let buttonWrapStyle: {
      width?: string;
      justifyContent?: string;
      backgroundColor?: string;
      borderColor?: string;
    } = {};
    let justifyContent = '';
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
    this.props.width ? buttonWrapStyle.width = this.props.width : null;
    this.props.backgroundColor ? buttonWrapStyle.backgroundColor = this.props.backgroundColor : null;
    this.props.borderColor ? buttonWrapStyle.borderColor = this.props.borderColor : null;
    this._buttonWrapStyle = buttonWrapStyle;

    let buttonElementStyle: {
      color?: string;
      fontSize?: string;
      margin?: string;
    } = {};
    this.props.fontColor ? buttonElementStyle.color = this.props.fontColor : null;
    this.props.fontSize ? buttonElementStyle.fontSize = this.props.fontSize : null;
    this.props.margin ? buttonElementStyle.margin = this.props.margin : null;
    this._buttonElementStyle = buttonElementStyle;
  }

  componentDidMount() {
    if (this._rootDom && (this.props.hoverFontColor || this.props.hoverBackgroundColor || this.props.hoverBorderColor)) {
      this._rootDom.addEventListener('mouseover', this.onMouseOver.bind(this));
      this._rootDom.addEventListener('mouseleave', this.onMouseLeave.bind(this));
      this._buttonRootStyleText = this._rootDom.style.cssText;

      if (this._buttonTextDom && this.props.hoverFontColor) {
        this._buttonTextStyleText = this._buttonTextDom.style.cssText;
      }

      if (this._buttonIconDom && this.props.hoverFontColor) {
        this._buttonIconStyleText = this._buttonIconDom.style.cssText;
      }
    }
  }

  componentWillUnmount() {
    if (this._rootDom && (this.props.hoverBackgroundColor || this.props.hoverBorderColor)) {
      this._rootDom.removeEventListener('mouseover');
      this._rootDom.removeEventListener('mouseleave');
    }
  }

  onMouseOver() {
    if (this._rootDom && (this.props.hoverBackgroundColor || this.props.hoverBorderColor)) {
      let buttonWrapStyle = this._rootDom.style;
      this.props.hoverBackgroundColor ? buttonWrapStyle.backgroundColor = this.props.hoverBackgroundColor : null;
      this.props.hoverBorderColor ? buttonWrapStyle.borderColor = this.props.hoverBorderColor : null;
      this._rootDom.setAttribute('style', buttonWrapStyle.cssText);
    }

    if (this._buttonTextDom && this.props.hoverFontColor) {
      let buttonElementStyle = this._buttonTextDom.style;
      this.props.hoverFontColor ? buttonElementStyle.color = this.props.hoverFontColor : null;
      this._buttonTextDom.setAttribute('style', buttonElementStyle.cssText);
    }

    if (this._buttonIconDom && this.props.hoverFontColor) {
      let buttonElementStyle = this._buttonIconDom.style;
      this.props.hoverFontColor ? buttonElementStyle.color = this.props.hoverFontColor : null;
      this._buttonIconDom.setAttribute('style', buttonElementStyle.cssText);
    }
  }

  onMouseLeave() {
    if (this._rootDom && (this.props.hoverBackgroundColor || this.props.hoverBorderColor)) {
      this._rootDom.setAttribute('style', this._buttonRootStyleText);
    }

    if (this._buttonTextDom && this.props.hoverFontColor) {
      this._buttonTextDom.setAttribute('style', this._buttonTextStyleText);
    }

    if (this._buttonIconDom && this.props.hoverFontColor) {
      this._buttonIconDom.setAttribute('style', this._buttonIconStyleText);
    }
  }

  render(): JSX.Element {
    const { shape, color, text, icon, iconPosition, className, onClick } = this.props;

    let shapeClassName = '';
    if (['circle', 'square', 'squareRound', 'round'].indexOf(shape!) >= 0 ) {
      shapeClassName = styles[shape!];
    } else {
      shapeClassName = styles.circle;
    }

    let colorClassName = '';
    if (['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'disable', 'dark', 'light', 'linkPrimary', 'linkBlack', 'linkWhite'].indexOf(color!) >= 0 ) {
      colorClassName = styles[color!];
    } else {
      colorClassName = styles.primary;
    }

    const tmpText = text ? (
      <div
        ref={(child) => this._buttonTextDom = child}
        className={classNames(styles.element, colorClassName, 'text')}
        style={this._buttonElementStyle}
      >{text}</div>
     ) : null;
    const tmpIcon = icon ? (
      <div
        ref={(child) => this._buttonIconDom = child}
        className={classNames(styles.element, colorClassName, 'icon')}
        style={this._buttonElementStyle}
      >{icon}</div>
    ) : null;
    let buttonContents: React.ReactNode;
    if (iconPosition === 'left') {
      buttonContents = (
        <div
          ref={(child) => this._buttonWrapDom = child}
          className={styles.wrap}
          style={this._buttonWrapStyle}
        >
          {tmpIcon}
          {tmpText}
        </div>
      );
    } else if (iconPosition === 'right') {
      buttonContents = (
        <div
          ref={(child) => this._buttonWrapDom = child}
          className={styles.wrap}
          style={this._buttonWrapStyle}
        >
          {tmpText}
          {tmpIcon}
        </div>
      );
    }

    return (
      <a
        ref={(child) => this._rootDom = child}
        className={classNames(styles.root, shapeClassName, colorClassName, className)}
        style={this._buttonRootStyle}
        onClick={onClick}
      >
        {buttonContents}
      </a>
    );
  }
}
