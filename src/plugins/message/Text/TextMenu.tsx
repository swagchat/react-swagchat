import * as React from 'react';
import {IPluginMessageMenuProps, pluginMessageUpdateMenuIndexActionDispatch } from 'swagchat-sdk';

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
        <i className="material-icons text-menu-icon" style={ownMenuIndex === currentMenuIndex ? on : off}>keyboard</i>
      </div>
    );
  }
}
