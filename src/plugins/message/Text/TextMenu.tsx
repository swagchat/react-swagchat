import * as React from 'react';
import {IPluginMessageMenuProps, pluginMessageUpdateMenuIndexActionDispatch } from 'swagchat-sdk';
import { Keyboard } from '../../../components';

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
      <div
        className="text-menu-root"
        onClick={() => {pluginMessageUpdateMenuIndexActionDispatch(ownMenuIndex); }}
      >
        <Keyboard className="text-menu-icon" style={ownMenuIndex === currentMenuIndex ? on : off} />
      </div>
    );
  }
}
