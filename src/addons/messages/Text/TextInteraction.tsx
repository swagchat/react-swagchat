import * as React from 'react';
import Button from 'material-ui/Button';
import SendIcon from 'material-ui-icons/Send';
import * as styles from './text-interaction.css';
import {
  countString,
  IAddonMessageInteractionProps,
  isIphone,
  store,
  State
} from 'swagchat-sdk';

export class TextInteraction extends React.Component
    <IAddonMessageInteractionProps> {
  // private sendIconStyle: Object;
  fontSize: number = 18;
  padding: number = 10;
  textValue: string = '';
  textareaDom: HTMLTextAreaElement | null;
  newLineCount: number = 0;
  onKeyDownName: string = '';
  maxCharCount: number = 0;
  previousLastLetter: string = '';

  initialInteractionStyle = {
    textAreaStyle: {
      fontSize: this.fontSize + 'px',
      padding: this.padding + 'px',
      height: this.fontSize + 'px',
      overflowY: 'hidden',
    },
  };

  state = {
    textAreaStyle: {},
  };

  // private initiaIphoneStyle: IMessageBodyMenuStyle = {
  //   paddingBottom: '10px',
  // };

  onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
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
    if (newLineCount === 0) {
      newLineCount = 1;
    }

    if (this.newLineCount !== newLineCount && newLineCount <= 4) {
      this.newLineCount = newLineCount;
      const newTextAreaStyle = Object.assign(
        {},
        this.state.textAreaStyle,
        {
          height: this.fontSize * newLineCount + 'px',
          overflowY: 'auto',
        }
      );
      const newPluginMessageTextInteractionStyle = {
        textAreaStyle: newTextAreaStyle,
      };
      this.setState(newPluginMessageTextInteractionStyle);
    }
    if (this.newLineCount === 1) {
      const newTextAreaStyle = Object.assign(
        {},
        this.state.textAreaStyle,
        {
          height: this.fontSize * newLineCount + 'px',
          overflowY: 'hidden',
        }
      );
      const newPluginMessageTextInteractionStyle = {
        textAreaStyle: newTextAreaStyle,
      };
      this.setState(newPluginMessageTextInteractionStyle);
    }

    // For iPhone creepy keyboard movement
    const noCountLetterRegexp = '[\ \　]';
    const lastLetter = this.textValue.slice(-1);
    if (this.onKeyDownName === 'Backspace' || this.onKeyDownName === 'Enter') {
      return;
    }
    const doubleByteCharacterRegExp = '[^\x01-\x7E]';
    if ((lastLetter.match(new RegExp(doubleByteCharacterRegExp)) ||
        lastLetter.match(new RegExp(noCountLetterRegexp)))) {
      this.onTextareaFocus.bind(this);
    }　else {
      this.onTextareaBlur.bind(this);
    }
    if (!lastLetter.match(new RegExp(noCountLetterRegexp))) {
      this.previousLastLetter = lastLetter;
    }
  }

  onClick() {
    let emptyCheckString = this.textValue.replace(/\s|\n|　/g, '');
    if (emptyCheckString === '') {
      return;
    }
    // createMessageActionDispatch('text', {text: this.textValue});
    // sendMessagesRequestActionDispatch();
    this.setState(this.initialInteractionStyle);
    this.textareaDom!.value = '';
    this.textValue = '';
  }

  onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // this.onKeyDownName = e.key;
  }

  onTextareaFocus() {
    window.console.log('onTextareaFocus', isIphone());
    const state: State = store.getState();
    state.addon.messages.map((messageAddon, i) => {
      if (messageAddon.name === 'text') {
        // updateAddonMessageMenuIndexActionDispatch(i);
      }
    });
    if (isIphone()) {
      // updateMessageBodyMenuStyleActionDispatch({paddingBottom: '45px'});
    }
  }

  onTextareaBlur() {
    window.console.log('onTextareaBlur', isIphone());
    if (isIphone()) {
      // updateMessageBodyMenuStyleActionDispatch(this.initiaIphoneStyle);
    }
  }

  // private componentDidMount() {
  //   this.setState(this.initialInteractionStyle);
  //   this.maxCharCount =  (this.textareaDom!.clientWidth - 20) / (this.fontSize * 0.57);
  // }

  constructor(props: IAddonMessageInteractionProps) {
    super(props);

    this.state = this.initialInteractionStyle;
  }

  render() {
    return (
      <div className={styles.root}>
        <textarea
          ref={(child) => this.textareaDom = child}
          className={styles.textarea}
          style={this.state.textAreaStyle}
          onChange={(e) => this.onChange(e)}
          placeholder=""
          onBlur={() => this.onTextareaBlur()}
          onFocus={() => this.onTextareaFocus()}
          onKeyDown={(e) => this.onKeyDown(e)}
        />
        <Button
          className={styles.sendButton}
          onClick={() => this.onClick()}
        >
          <SendIcon />
        </Button>
      </div>
    );
  }
}
