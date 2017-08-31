import * as React from 'react';
import {
  countString,
  IPluginMessageInteractionProps,
  IPluginMessageTextInteractionStyle,
  createMessageActionDispatch,
  sendMessagesActionDispatch,
} from 'swagchat-sdk';
import { Button, Send } from '../../../components';

export class TextInteraction extends React.Component<IPluginMessageInteractionProps, {}> {
  private sendIconStyle: Object;
  private fontSize: number = 18;
  private padding: number = 10;
  private textValue: string = '';
  private textareaDom: HTMLTextAreaElement | null;
  private newLineCount: number = 0;
  private previousLastLetter: string = '';
  private onKeyDownName: string = '';
  private maxCharCount: number = 0;

  private initialInteractionStyle: IPluginMessageTextInteractionStyle = {
    textAreaStyle: {
      fontSize: this.fontSize + 'px',
      padding: this.padding + 'px',
      height: this.fontSize + 'px',
      overflowY: 'hidden',
    },
  };

  componentDidMount() {
    this.props.updatePluginMessageTextInteractionStyle(this.initialInteractionStyle);
    this.maxCharCount =  (this.textareaDom!.clientWidth - 20) / (this.fontSize * 0.57);
  }

  private onChange(e: any) {
    e.preventDefault();

    this.textValue = e.target.value;
    let newLineCount = (e.target.value.match(new RegExp('\n', 'g')) || []).length + 1;

    // Auto new line
    const arrayTextValue = this.textValue.split('\n');
    for (let i = 0; i < arrayTextValue.length; i++) {
      const autoLineCount = Math.ceil((countString(arrayTextValue[i]) / this.maxCharCount)) - 1;
      if (autoLineCount > 0) {
        newLineCount += autoLineCount;
      }
    }
    newLineCount === 0 ? newLineCount = 1 : null;

    if (this.newLineCount !== newLineCount && newLineCount <= 4) {
      this.newLineCount = newLineCount;
      const newTextAreaStyle = Object.assign(
        {},
        this.props.styleState.pluginMessageTextInteractionStyle.textAreaStyle,
        {
          height: this.fontSize * newLineCount + 'px',
          overflowY: 'auto',
        }
      );
      const newPluginMessageTextInteractionStyle = {
        textAreaStyle: newTextAreaStyle,
      };
      this.props.updatePluginMessageTextInteractionStyle(newPluginMessageTextInteractionStyle);
    }
    if (this.newLineCount === 1) {
      const newTextAreaStyle = Object.assign(
        {},
        this.props.styleState.pluginMessageTextInteractionStyle.textAreaStyle,
        {
          height: this.fontSize * newLineCount + 'px',
          overflowY: 'hidden',
        }
      );
      const newPluginMessageTextInteractionStyle = {
        textAreaStyle: newTextAreaStyle,
      };
      this.props.updatePluginMessageTextInteractionStyle(newPluginMessageTextInteractionStyle);
    }

    // For iPhone creepy keyboard movement
    const noCountLetterRegexp = '[\ \　]';
    const lastLetter = this.textValue.slice(-1);
    if (this.onKeyDownName === 'Backspace' || this.onKeyDownName === 'Enter') {
      return;
    }
    const doubleByteCharacterRegExp = '[^\x01-\x7E]';
    if ((lastLetter.match(new RegExp(doubleByteCharacterRegExp)) || lastLetter.match(new RegExp(noCountLetterRegexp)))) {
      this.props.onTextareaFocus();
    }　else {
      this.props.onTextareaBlur();
    }
    if (!lastLetter.match(new RegExp(noCountLetterRegexp))) {
      this.previousLastLetter = lastLetter;
    }
  }

  onKeyDown(e: any) {
    this.onKeyDownName = e.key;
  }

  onClick() {
    let emptyCheckString = this.textValue.replace(/\s|\n|　/g, '');
    if (emptyCheckString === '') {
      return;
    }
    createMessageActionDispatch('text', {text: this.textValue});
    sendMessagesActionDispatch();
    this.props.updatePluginMessageTextInteractionStyle(this.initialInteractionStyle);
    this.textareaDom!.value = '';
    this.textValue = '';
  }

  render(): JSX.Element {
    return (
      <div className="text-interaction-root">
        <textarea
          ref={(child) => this.textareaDom = child}
          className="text-interaction-textarea"
          style={this.props.styleState.pluginMessageTextInteractionStyle.textAreaStyle}
          onChange={this.onChange.bind(this)}
          placeholder={this.props.settingState.inputMessagePlaceholderText}
          onBlur={this.props.onTextareaBlur}
          onKeyDown={this.onKeyDown.bind(this)}
        />
        <Button
          className="text-interaction-send-button"
          icon={<Send className="text-interaction-send-icon" style={this.sendIconStyle} />}
          onClick={this.onClick.bind(this)}
        />
      </div>
    );
  }
}
