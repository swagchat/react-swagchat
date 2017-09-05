import * as React from 'react';
import { IOnClickProps } from '../';
const classNames = require('classnames');

export interface IButtonProps extends IOnClickProps {
  type?: 'link' | 'square' | 'square-round' | 'round';
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
  private _buttonWrapDom: HTMLDivElement | null;
  private _buttonTextDom: HTMLDivElement | null;
  private _buttonIconDom: HTMLDivElement | null;

  private _buttonWrapClassName: string;

  private _buttonElementClassName: string;

  private _buttonRootStyle: {};
  private _buttonWrapStyle: {};
  private _buttonElementStyle: {};

  private _buttonWrapStyleText: string;
  private _buttonTextStyleText: string;
  private _buttonIconStyleText: string;

  public static defaultProps: Partial<IButtonProps> = {
    position: 'center',
    iconPosition: 'left',
    type: 'link',
    className: '',
    style: {},
    onClick: () => {},
  };

  constructor(props: IButtonProps) {
    super(props);

    this._buttonElementClassName = 'sc-button-element';
    switch (this.props.type) {
      case 'link':
        this._buttonWrapClassName = 'sc-button-wrap';
        break;
      case 'square':
        this._buttonWrapClassName = classNames('sc-button-wrap', 'square');
        break;
      case 'square-round':
        this._buttonWrapClassName = classNames('sc-button-wrap', 'square-round');
        break;
      case 'round':
        this._buttonWrapClassName = classNames('sc-button-wrap', 'round');
        break;
    }

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
    if (this._buttonWrapDom && (this.props.hoverFontColor || this.props.hoverBackgroundColor || this.props.hoverBorderColor)) {
      this._buttonWrapDom.addEventListener('mouseover', this.onMouseOver.bind(this));
      this._buttonWrapDom.addEventListener('mouseleave', this.onMouseLeave.bind(this));
      this._buttonWrapStyleText = this._buttonWrapDom.style.cssText;

      if (this._buttonTextDom && this.props.hoverFontColor) {
        this._buttonTextStyleText = this._buttonTextDom.style.cssText;
      }

      if (this._buttonIconDom && this.props.hoverFontColor) {
        this._buttonIconStyleText = this._buttonIconDom.style.cssText;
      }
    }
  }

  componentWillUnmount() {
    if (this._buttonWrapDom && (this.props.hoverBackgroundColor || this.props.hoverBorderColor)) {
      this._buttonWrapDom.removeEventListener('mouseover');
      this._buttonWrapDom.removeEventListener('mouseleave');
    }
  }

  onMouseOver() {
    if (this._buttonWrapDom && (this.props.hoverBackgroundColor || this.props.hoverBorderColor)) {
      let buttonWrapStyle = this._buttonWrapDom.style;
      this.props.hoverBackgroundColor ? buttonWrapStyle.backgroundColor = this.props.hoverBackgroundColor : null;
      this.props.hoverBorderColor ? buttonWrapStyle.borderColor = this.props.hoverBorderColor : null;
      this._buttonWrapDom.setAttribute('style', buttonWrapStyle.cssText);
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
    if (this._buttonWrapDom && (this.props.hoverBackgroundColor || this.props.hoverBorderColor)) {
      this._buttonWrapDom.setAttribute('style', this._buttonWrapStyleText);
    }

    if (this._buttonTextDom && this.props.hoverFontColor) {
      this._buttonTextDom.setAttribute('style', this._buttonTextStyleText);
    }

    if (this._buttonIconDom && this.props.hoverFontColor) {
      this._buttonIconDom.setAttribute('style', this._buttonIconStyleText);
    }
  }

  render(): JSX.Element {
    const { text, icon, iconPosition, className, onClick } = this.props;

    const tmpText = text ? (
      <div
        ref={(child) => this._buttonTextDom = child}
        className={this._buttonElementClassName}
        style={this._buttonElementStyle}
      >{text}</div>
     ) : null;
    const tmpIcon = icon ? (
      <div
        ref={(child) => this._buttonIconDom = child}
        className={this._buttonElementClassName}
        style={this._buttonElementStyle}
      >{icon}</div>
    ) : null;
    let buttonContents: React.ReactNode;
    if (iconPosition === 'left') {
      buttonContents = (
        <div
          ref={(child) => this._buttonWrapDom = child}
          className={this._buttonWrapClassName}
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
          className={this._buttonWrapClassName}
          style={this._buttonWrapStyle}
        >
          {tmpText}
          {tmpIcon}
        </div>
      );
    }

    return (
      <a
        className={classNames('sc-button-root', className)}
        style={this._buttonRootStyle}
        onClick={onClick}
      >
        {buttonContents}
      </a>
    );
  }
}
