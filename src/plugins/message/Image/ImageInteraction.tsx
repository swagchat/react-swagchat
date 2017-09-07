import * as React from 'react';
import {
  IPluginMessageInteractionProps,
  updateStyleActionDispatch,
  pluginMessageUpdateMenuIndexActionDispatch,
  combinedAssetPostAndSendMessageRequestActionDispatch,
} from 'swagchat-sdk';
import { Button } from '../../../components';

interface IPluginMessageImageInteractionStyle {
  pluginMessageImageInteractionStyle: {
    display: string,
  };
}

export class ImageInteraction extends React.Component<IPluginMessageInteractionProps, {}> {
  private _selectImage: any;
  private _confirmImageDOM: HTMLImageElement | null;
  private _inputFileDom: HTMLInputElement | null;

  private initialInteractionStyle: IPluginMessageImageInteractionStyle = {
    pluginMessageImageInteractionStyle: {
      display: 'none',
    },
  };

  componentDidMount() {
    updateStyleActionDispatch(this.initialInteractionStyle);
    if (this._inputFileDom) {
      this._inputFileDom.click();
    }
  }

  onFileUploadChange(e: any) {
    console.log('---------------------- onFileUploadChange');
    this._selectImage = e.target.files[0];
    if (!this._selectImage.type.match('image.*')) {
      return;
    }

    const reader = new FileReader();
    const self = this;
    reader.onload = (function() {
      return function(e: any) {
        self._confirmImageDOM!.src = e.target.result;
        updateStyleActionDispatch({
          pluginMessageImageInteractionStyle: {
            display: 'block',
          }
        });
      };
    }.bind(this))(this._selectImage);
    reader.readAsDataURL(this._selectImage);
  }

  onConfirmClose() {
    updateStyleActionDispatch(this.initialInteractionStyle);
    pluginMessageUpdateMenuIndexActionDispatch(0);
  }

  onFileUploadRequest() {
    this._confirmImageDOM!.src = '';
    updateStyleActionDispatch(this.initialInteractionStyle);
    pluginMessageUpdateMenuIndexActionDispatch(0);
    combinedAssetPostAndSendMessageRequestActionDispatch(this._selectImage);
    this._selectImage = null;
  }

  render(): JSX.Element {
    const style: Object = this.props.styleState;
    const pluginMessageImageInteractionStyle = (style as IPluginMessageImageInteractionStyle).pluginMessageImageInteractionStyle;

    return (
      <div className="image-interaction-root" style={pluginMessageImageInteractionStyle ? pluginMessageImageInteractionStyle : {}} >
        <div className={this.props.position === 'top' ? 'image-interaction-confirm-wrap-top' : 'image-interaction-confirm-wrap-bottom'} style={pluginMessageImageInteractionStyle ? pluginMessageImageInteractionStyle : {}} >
          <Button
            icon={<i className="material-icons">close</i>}
            onClick={this.onConfirmClose.bind(this)}
            className="image-interaction-close-icon"
          />
          <img
            id="confirmImage"
            ref={(child) => this._confirmImageDOM = child}
            role="presentation"
            className="image-interaction-confirm-image"
            onClick={this.onFileUploadRequest.bind(this)}
          />
        </div>
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
