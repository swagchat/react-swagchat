import * as React from 'react';

const classNames = require('classnames');

export interface IPhotoEditProps {
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
    width: '250px',
    height: '250px',
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
    let style: {
      width?: string;
      height?: string;
      margin?: string;
    } = {};
    this.props.width ? style.width = this.props.width : null;
    this.props.height ? style.height = this.props.height : null;
    this.props.margin ? style.margin = this.props.margin : null;

    return (
      <div
        className={classNames('sc-photo-edit-root', this.props.className)}
        style={style}
      >
        <img
          src={this.props.src}
          ref={(child) => this._confirmImageDom = child}
          className="sc-photo-edit-img sc-avatar-circle"
        />
        <div className="sc-photo-edit-button" onClick={this.onPhoto.bind(this)}><i className="material-icons sc-photo-edit-icon">photo_camera</i></div>
        <input
          type="file"
          ref={(child) => this._inputFileDom = child}
          className="sc-image-input"
          accept="image/*"
          onChange={this.onFileUploadChange.bind(this)}
        />
      </div>
    );
  }
}
