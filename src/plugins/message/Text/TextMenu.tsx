import * as React from 'react';
import {IPluginMessageMenuProps } from '../';
import { Keyboard } from '../../../components';

export class TextMenu extends React.Component<IPluginMessageMenuProps, {}> {
  render(): JSX.Element {
    const on = {
      color: '#0084ff'
    };
    const off = {
      color: '#bdbdbd'
    };
    const {updateMenuIndex, ownMenuIndex, currentMenuIndex} = this.props;
    return (
      <div
        className="text-menu-root"
        onClick={() => {updateMenuIndex(ownMenuIndex); }}
      >
        <Keyboard className="text-menu-icon" style={ownMenuIndex === currentMenuIndex ? on : off} />
      </div>
    );
  }
}
