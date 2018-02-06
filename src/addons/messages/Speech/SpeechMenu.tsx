import * as React from 'react';
import { IAddonMessageMenuProps, updateAddonMessageMenuIndexActionDispatch } from 'swagchat-sdk';
import { Button } from '../../../components';
import * as messageMenustyles from '../../../components/Message/internal/message-menu.css';
const classNames = require('classnames');

export class SpeechMenu extends React.Component<IAddonMessageMenuProps, {}> {
  render(): JSX.Element {
    const {ownMenuIndex, currentMenuIndex} = this.props;
    let speechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!speechRecognition) {
      // return <div />;
    }

    return (
      <Button
        color="linkPrimary"
        icon={<i className={classNames('material-icons', ownMenuIndex === currentMenuIndex ? messageMenustyles.on : messageMenustyles.off)}>mic</i>}
        onClick={() => {updateAddonMessageMenuIndexActionDispatch(ownMenuIndex); }}
      />
    );
  }
}
