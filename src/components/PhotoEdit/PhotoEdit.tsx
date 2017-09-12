import * as React from 'react';
import * as indexStyles from '../../index.css';
import * as styles from './photo-edit.css';
import * as avatarStyles from '../Avatar/avatar.css';

export interface IPhotoEditProps {
  type?: 'circle' | 'square' | 'square-round'| 'round';
  src: string;
  width?: string;
  height?: string;
  margin?: string;
  className?: string;
  style?: Object;
  onUpdatePhoto: (updatePictureUrl: Blob) => void;
}

export class PhotoEdit extends React.Component<IPhotoEditProps, {}> {
  private _selectImageBlob: Blob;
  private _confirmImageDom: HTMLImageElement | null;
  private _inputFileDom: HTMLInputElement | null;

  public static defaultProps: Partial<IPhotoEditProps> = {
    type: 'circle',
    className: '',
    style: {},
  };

  onFileUploadChange = (e: any) => {
    this._selectImageBlob = e.target.files[0];
    if (!this._selectImageBlob.type.match('image.*')) {
      return;
    }

    const reader = new FileReader();
    const self = this;
    reader.onload = (function() {
      return function(e: any) {
        self._confirmImageDom ? self._confirmImageDom.src = e.target.result : null;
      };
    }.bind(this))(this._selectImageBlob);
    reader.readAsDataURL(this._selectImageBlob);
    this.props.onUpdatePhoto(this._selectImageBlob);
  }

  onPhoto = (e: Event) => {
    e.preventDefault();
    this._inputFileDom!.click();
  }

  render(): JSX.Element  {
    const { type, src, width, height, margin, className, style } = this.props;

    let tempRootStyle: {
      width?: string;
      height?: string;
      margin?: string;
    } = {};
    width ? tempRootStyle.width = width : null;
    height ? tempRootStyle.height = height : null;
    margin ? tempRootStyle.margin = margin : null;
    const rootStyle = Object.assign(
      tempRootStyle,
      style,
    );

    const classNames = require('classnames');
    let imgClassName = '';
    switch (type) {
      case 'circle':
        imgClassName = classNames(styles.img, avatarStyles.root, avatarStyles.circle);
        break;
      case 'square':
        imgClassName = classNames(styles.img, avatarStyles.root, avatarStyles.square);
        break;
      case 'square-round':
        imgClassName = classNames(styles.img, avatarStyles.root, avatarStyles.squareRound);
        break;
      case 'round':
        imgClassName = classNames(styles.img, avatarStyles.root, avatarStyles.round);
        break;
    }

    return (
      <div
        className={classNames(styles.root, className)}
        style={rootStyle}
      >
        <img
          src={src}
          ref={(child) => this._confirmImageDom = child}
          className={imgClassName}
        />
        <div className={styles.button} onClick={this.onPhoto.bind(this)}><i className={classNames('material-icons', styles.icon)}>photo_camera</i></div>
        <input
          type="file"
          ref={(child) => this._inputFileDom = child}
          className={indexStyles.imageInput}
          accept="image/*"
          onChange={this.onFileUploadChange.bind(this)}
        />
      </div>
    );
  }
}
