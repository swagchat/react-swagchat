import * as React from 'react';
import { IRootStyleProps } from '../';
import * as indexStyles from '../../index.css';
import * as styles from './photo-edit.css';
const classNames = require('classnames');

export interface IPhotoEditProps extends IRootStyleProps {
  src: string;
  shape?: 'circle' | 'square' | 'squareRound' | 'round';
  onUpdatePhoto: (updatePictureUrl: Blob) => void;
}

export class PhotoEdit extends React.Component<IPhotoEditProps, {}> {
  private _selectImageBlob: Blob;
  private _confirmImageDom: HTMLImageElement | null;
  private _inputFileDom: HTMLInputElement | null;

  public static defaultProps: Partial<IPhotoEditProps> = {
    shape: 'circle',
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
    const { shape, src, className, style } = this.props;

    let shapeClassName = '';
    if (['circle', 'square', 'squareRound', 'round'].indexOf(shape!) >= 0 ) {
      shapeClassName = styles[shape!];
    } else {
      shapeClassName = styles.circle;
    }

    return (
      <div
        className={classNames(styles.root, className)}
        style={style}
      >
        <img
          src={src}
          ref={(child) => this._confirmImageDom = child}
          className={classNames(styles.img, shapeClassName)}
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
