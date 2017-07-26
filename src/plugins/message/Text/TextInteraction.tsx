import * as React from 'react';
import { IPluginMessageInteractionProps } from '../';
import { Button, Send } from '../../../';

interface IPluginMessageTextInteractionStyle {
  pluginMessageTextInteractionStyle: {
    textAreaStyle: ITextAreaStyle,
  };
}

interface ITextAreaStyle {
  fontSize: string;
  padding: string;
  height: string;
}

export class TextInteraction extends React.Component<IPluginMessageInteractionProps, void> {
  private sendIconStyle: Object;
  private fontSize: number = 18;
  private padding: number = 10;
  private textValue: string = '';
  private textareaDom: HTMLTextAreaElement;
  private newLineCount: number = 0;

  private initialInteractionStyle: IPluginMessageTextInteractionStyle = {
    pluginMessageTextInteractionStyle: {
      textAreaStyle: {
        fontSize: this.fontSize + 'px',
        padding: this.padding + 'px',
        height: this.fontSize + 'px',
      },
    }
  };

  componentDidMount() {
    this.props.updateStyle(this.initialInteractionStyle);
  }

  private onChange(e: any) {
    e.preventDefault();
    let newLineCount = (e.target.value.match(new RegExp('\n', 'g')) || []).length + 1;
    if (this.newLineCount !== newLineCount && newLineCount <= 4) {
      this.newLineCount = newLineCount;
      const style: Object = this.props.styleState;
      const pluginMessageTextInteractionStyle = (style as IPluginMessageTextInteractionStyle).pluginMessageTextInteractionStyle;
      let newTextAreaStyle = Object.assign(
        {},
        pluginMessageTextInteractionStyle.textAreaStyle,
        {height: this.fontSize * newLineCount + 'px'}
      );
      this.props.updateStyle({
        pluginMessageTextInteractionStyle: {
          textAreaStyle: newTextAreaStyle,
        }
      });
    }
    this.textValue = e.target.value;
  }

  onClick() {
    let emptyCheckString = this.textValue.replace(/\s|\n|　/g, '');
    if (emptyCheckString === '') {
      return;
    }
    this.props.createMessage('text', {text: this.textValue});
    this.props.sendMessages();
    this.props.updateStyle(this.initialInteractionStyle);
    this.textareaDom.value = '';
    this.textValue = '';
  }

  render(): JSX.Element {
    const style: Object = this.props.styleState;
    if (!(style as IPluginMessageTextInteractionStyle).pluginMessageTextInteractionStyle) {
      return <div />;
    }
    const pluginMessageTextInteractionStyle = (style as IPluginMessageTextInteractionStyle).pluginMessageTextInteractionStyle;

    return (
      <div className="text-interaction-root">
        <textarea
          ref={(child) => this.textareaDom = child}
          className="text-interaction-textarea"
          style={pluginMessageTextInteractionStyle.textAreaStyle}
          onChange={this.onChange.bind(this)}
          placeholder={this.props.settingState.inputMessagePlaceholderText}
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
