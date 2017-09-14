import * as React from 'react';
import {IPluginMessageMenuProps, pluginMessageUpdateMenuIndexActionDispatch } from 'swagchat-sdk';
import { Button } from '../../../components';
import * as messageMenustyles from '../../../components/Message/internal/message-menu.css';
const classNames = require('classnames');

export class TextMenu extends React.Component<IPluginMessageMenuProps, {}> {
  render(): JSX.Element {
    const {ownMenuIndex, currentMenuIndex} = this.props;
    return (
      <Button
        icon={<i className={classNames('material-icons', ownMenuIndex === currentMenuIndex ? messageMenustyles.on : messageMenustyles.off)}>keyboard</i>}
        onClick={() => {pluginMessageUpdateMenuIndexActionDispatch(ownMenuIndex); }}
      />
    );
  }
}
