import * as React from 'react';
import { IPluginMessageMenuProps, updateMenuIndexActionDispatch } from 'swagchat-sdk';
import { Camera } from '../../../components';

export class ImageMenu extends React.Component<IPluginMessageMenuProps, {}> {
  render(): JSX.Element {
    const on = {
      color: '#0084ff'
    };
    const off = {
      color: '#bdbdbd'
    };
    const {ownMenuIndex, currentMenuIndex} = this.props;
    return (
      <div
        className="image-menu-root"
        onClick={() => {updateMenuIndexActionDispatch(ownMenuIndex); }}
      >
        <Camera className="image-menu-icon" style={ownMenuIndex === currentMenuIndex ? on : off} />
      </div>
    );
  }
}
