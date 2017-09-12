import * as React from 'react';
import {
  IPluginMessageInteractionProps,
  pluginMessageUpdateMenuIndexActionDispatch,
  combinedAssetPostAndSendMessageRequestActionDispatch,
} from 'swagchat-sdk';
const classNames = require('classnames');
import { Button } from '../../../components';
import * as indexStyles from '../../../index.css';
import * as styles from './image-interaction.css';

export interface IPluginMessageImageInteractionStyle {
  pluginMessageImageInteractionStyle: {
    display: string,
  };
}

export class ImageInteraction extends React.Component<IPluginMessageInteractionProps, IPluginMessageImageInteractionStyle> {
  private _selectImage: any;
  private _confirmImageDOM: HTMLImageElement | null;
  private _inputFileDom: HTMLInputElement | null;

  private initialInteractionStyle: IPluginMessageImageInteractionStyle = {
    pluginMessageImageInteractionStyle: {
      display: 'none',
    },
  };

  constructor(props: IPluginMessageInteractionProps) {
    super(props);

    this.state = this.initialInteractionStyle;
  }

  componentDidMount() {
    this.setState(this.initialInteractionStyle);
    if (this._inputFileDom) {
      this._inputFileDom.click();
    }
  }

  onFileUploadChange(e: any) {
    this._selectImage = e.target.files[0];
    if (!this._selectImage.type.match('image.*')) {
      return;
    }

    const reader = new FileReader();
    const self = this;
    reader.onload = (function() {
      return function(e: any) {
        self._confirmImageDOM!.src = e.target.result;
        self.setState({
          pluginMessageImageInteractionStyle: {
            display: 'block',
          }
        });
      };
    }.bind(this))(this._selectImage);
    reader.readAsDataURL(this._selectImage);
  }

  onConfirmClose() {
    this.setState(this.initialInteractionStyle);
    pluginMessageUpdateMenuIndexActionDispatch(0);
  }

  onFileUploadRequest() {
    this._confirmImageDOM!.src = '';
    this.setState(this.initialInteractionStyle);
    pluginMessageUpdateMenuIndexActionDispatch(0);
    combinedAssetPostAndSendMessageRequestActionDispatch(this._selectImage);
    this._selectImage = null;
  }

  render(): JSX.Element {
    return (
      <div style={this.state.pluginMessageImageInteractionStyle}>
        <div className={this.props.position === 'top' ?  classNames(styles.confirmWrap, styles.top) : classNames(styles.confirmWrap, styles.bottom)} style={this.state.pluginMessageImageInteractionStyle} >
          <Button
            icon={<i className="material-icons">close</i>}
            fontColor="white"
            className={styles.closeIcon}
            onClick={this.onConfirmClose.bind(this)}
          />
          <img
            id="confirmImage"
            ref={(child) => this._confirmImageDOM = child}
            role="presentation"
            className={styles.confirmImage}
            onClick={this.onFileUploadRequest.bind(this)}
          />
        </div>
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
