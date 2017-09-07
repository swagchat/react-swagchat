import * as React from 'react';
import { IPluginMessageMenuProps, pluginMessageUpdateMenuIndexActionDispatch } from 'swagchat-sdk';
import { Button } from '../../../components';

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
      <Button
        icon={<i className="material-icons" style={ownMenuIndex === currentMenuIndex ? on : off}>camera_alt</i>}
        onClick={() => {pluginMessageUpdateMenuIndexActionDispatch(ownMenuIndex); }}
      />
    );
  }
}
