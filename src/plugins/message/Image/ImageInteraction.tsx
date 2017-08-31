import * as React from 'react';
import {
  IPluginMessageInteractionProps,
  updateStyleActionDispatch,
  pluginMessageUpdateMenuIndexActionDispatch,
  combinedAssetPostAndSendMessageRequestActionDispatch,
} from 'swagchat-sdk';
import { Button, Close } from '../../../components';

interface IPluginMessageImageInteractionStyle {
  pluginMessageImageInteractionStyle: {
    display: string,
  };
}

export class ImageInteraction extends React.Component<IPluginMessageInteractionProps, {}> {
  private selectImage: any;
  private confirmImageDOM: HTMLImageElement | null;
  private inputFileDom: HTMLInputElement | null;

  private initialInteractionStyle: IPluginMessageImageInteractionStyle = {
    pluginMessageImageInteractionStyle: {
      display: 'none',
    },
  };

  componentDidMount() {
    updateStyleActionDispatch(this.initialInteractionStyle);
    if (this.inputFileDom) {
      this.inputFileDom.click();
    }
  }

  onFileUploadChange(e: any) {
    this.selectImage = e.target.files[0];
    if (!this.selectImage.type.match('image.*')) {
      return;
    }

    const reader = new FileReader();
    const self = this;
    reader.onload = (function() {
      return function(e: any) {
        self.confirmImageDOM!.src = e.target.result;
        updateStyleActionDispatch({
          pluginMessageImageInteractionStyle: {
            display: 'block',
          }
        });
      };
    }.bind(this))(this.selectImage);
    reader.readAsDataURL(this.selectImage);
  }

  onConfirmClose() {
    updateStyleActionDispatch(this.initialInteractionStyle);
    pluginMessageUpdateMenuIndexActionDispatch(0);
  }

  onFileUploadRequest() {
    this.confirmImageDOM!.src = '';
    updateStyleActionDispatch(this.initialInteractionStyle);
    pluginMessageUpdateMenuIndexActionDispatch(0);
    combinedAssetPostAndSendMessageRequestActionDispatch(this.selectImage);
    this.selectImage = null;
  }

  render(): JSX.Element {
    const style: Object = this.props.styleState;
    const pluginMessageImageInteractionStyle = (style as IPluginMessageImageInteractionStyle).pluginMessageImageInteractionStyle;

    return (
      <div className="image-interaction-root" style={pluginMessageImageInteractionStyle ? pluginMessageImageInteractionStyle : {}} >
        <div className={this.props.position === 'TOP' ? 'image-interaction-confirm-wrap-top' : 'image-interaction-confirm-wrap-bottom'} style={pluginMessageImageInteractionStyle ? pluginMessageImageInteractionStyle : {}} >
          <Button
            icon={<Close style={{color: 'white'}} />}
            onClick={this.onConfirmClose.bind(this)}
            className="image-interaction-close-icon"
          />
          <img
            id="confirmImage"
            ref={(child) => this.confirmImageDOM = child}
            role="presentation"
            className="image-interaction-confirm-image"
            onClick={this.onFileUploadRequest.bind(this)}
          />
        </div>
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
