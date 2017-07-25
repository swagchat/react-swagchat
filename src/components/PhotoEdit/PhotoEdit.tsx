import * as React from 'react';
import {
  IOnClickProps,
  Photo,
  Button,
} from '../../';
const classNames = require('classnames');

export interface IPhotoEditProps extends IOnClickProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
  margin?: number;
}

export class PhotoEdit extends React.Component<IPhotoEditProps, void> {
  private selectImage: any;
  private confirmImageDOM: any;
  private inputFileDom: HTMLInputElement;

  onFileUploadChange = (e: any) => {
    this.selectImage = e.target.files[0];
    if (!this.selectImage.type.match('image.*')) {
      return;
    }

    const reader = new FileReader();
    const self = this;
    reader.onload = (function() {
      return function(e: any) {
        self.confirmImageDOM.src = e.target.result;
      };
    }.bind(this))(this.selectImage);
    reader.readAsDataURL(this.selectImage);
  }

  onPhoto = (e: any) => {
    e.preventDefault();
    this.inputFileDom.click();
  }

  render(): JSX.Element  {
    let style: {
      width?: string;
      height?: string;
      margin?: string;
    } = {};
    if (this.props.width) {
      style.width = this.props.width + 'px';
    }
    if (this.props.height) {
      style.height = this.props.height + 'px';
    }
    if (this.props.margin) {
      style.margin = this.props.margin + 'px';
    }

    return (
      <div>
        <img
          src={this.props.src}
          ref={(child) => this.confirmImageDOM = child}
          className={classNames('avatar', this.props.className)}
          style={style}
          onClick={this.props.onClick}
        />
        <Button className="photo-edit-button" icon={<Photo className="photo-edit-icon"/>} onClick={this.onPhoto.bind(this)} />
        <input
          type="file"
          ref={(child) => this.inputFileDom = child}
          className="image-interaction-input"
          accept="image/*"
          onChange={this.onFileUploadChange.bind(this)}
        />
      </div>
);
  }
}
