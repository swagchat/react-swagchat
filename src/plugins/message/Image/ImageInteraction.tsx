import * as React from 'react';
import { IPluginMessageInteractionProps } from '../';
import { Button, Close } from '../../../';
interface IPluginMessageImageInteractionStyle {
  pluginMessageImageInteractionStyle: {
    display: string,
  };
}

export class ImageInteraction extends React.Component<IPluginMessageInteractionProps, void> {
  private selectImage: any;
  private confirmImageDOM: HTMLImageElement;
  private inputFileDom: HTMLInputElement;

  private initialInteractionStyle: IPluginMessageImageInteractionStyle = {
    pluginMessageImageInteractionStyle: {
      display: 'none',
    }
  };

  componentDidMount() {
    this.props.updateStyle(this.initialInteractionStyle);
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
        self.confirmImageDOM.src = e.target.result;
        self.props.updateStyle({
          pluginMessageImageInteractionStyle: {
            display: 'block',
          }
        });
      };
    }.bind(this))(this.selectImage);
    reader.readAsDataURL(this.selectImage);
  }

  onConfirmClose() {
    this.props.updateStyle(this.initialInteractionStyle);
    this.props.updateMenuIndex(0);
  }

  onFileUploadRequest() {
    this.confirmImageDOM.src = '';
    this.props.updateStyle(this.initialInteractionStyle);
    this.props.updateMenuIndex(0);
    this.props.assetPostAndSendMessage(this.selectImage);
  }

  render(): JSX.Element {
    const style: Object = this.props.styleState;
    const pluginMessageImageInteractionStyle = (style as IPluginMessageImageInteractionStyle).pluginMessageImageInteractionStyle;

    return (
      <div className="image-interaction-root" style={pluginMessageImageInteractionStyle ? pluginMessageImageInteractionStyle : {}} >
        <div className="image-interaction-confirm-wrap" style={pluginMessageImageInteractionStyle ? pluginMessageImageInteractionStyle : {}} >
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