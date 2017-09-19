import * as React from 'react';
import { IAddonMessageMenuProps, updateAddonMessageMenuIndexActionDispatch } from 'swagchat-sdk';
import { Button } from '../../../components';
import * as messageMenustyles from '../../../components/Message/internal/message-menu.css';
const classNames = require('classnames');

export class ImageMenu extends React.Component<IAddonMessageMenuProps, {}> {
  render(): JSX.Element {
    const {ownMenuIndex, currentMenuIndex} = this.props;
    return (
      <Button
        color="linkPrimary"
        icon={<i className={classNames('material-icons', ownMenuIndex === currentMenuIndex ? messageMenustyles.on : messageMenustyles.off)}>camera_alt</i>}
        onClick={() => {updateAddonMessageMenuIndexActionDispatch(ownMenuIndex); }}
      />
    );
  }
}
