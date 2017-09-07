import * as React from 'react';
import {IPluginMessageMenuProps, pluginMessageUpdateMenuIndexActionDispatch } from 'swagchat-sdk';
import { Button } from '../../../components';

export class TextMenu extends React.Component<IPluginMessageMenuProps, {}> {
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
        icon={<i className="material-icons text-menu-icon" style={ownMenuIndex === currentMenuIndex ? on : off}>keyboard</i>}
        onClick={() => {pluginMessageUpdateMenuIndexActionDispatch(ownMenuIndex); }}
      />
    );
  }
}
