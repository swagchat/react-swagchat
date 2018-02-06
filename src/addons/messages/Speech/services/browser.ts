import {
  createMessageActionDispatch,
  sendMessagesRequestActionDispatch,
  store,
  State,
  SpeechMode,
} from 'swagchat-sdk';
import { ISpeechToTextService } from './';

export class SpeechToTextBrowser implements ISpeechToTextService {
  public name = 'browser';
  private _speechRecognition: SpeechRecognition;
  private _isAutoRestart: boolean;

  constructor() {
    // Create SpeechRecognition
    let speechRecognition: SpeechRecognitionStatic;
    speechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!speechRecognition) {
      console.log('SpeechRecognition not supported.');
      return;
    } else {
      this._speechRecognition = new speechRecognition();
    }
  }

  public start(): void {
    console.log('start' + this.name);

    if (!this._speechRecognition) {
      return;
    }

    this._isAutoRestart = true;

    const state: State = store.getState();
    if (state.message.speechSynthesisUtterance) {
      state.message.speechSynthesisUtterance.addEventListener('start', () => {
        // console.log('SpeechSynthesisUtterance start');
        this._speechRecognition!.stop();
      });
      state.message.speechSynthesisUtterance.addEventListener('end', () => {
        // console.log('SpeechSynthesisUtterance end');
        this._speechRecognition!.start();
      });
    }

    this._speechRecognition.lang = state.client.client!.user.lang;
    this._speechRecognition.interimResults = true;
    this._speechRecognition.continuous = true;
    this._speechRecognition.onspeechstart = () => {
      console.log('SpeechRecognition onspeechstart');
    };
    this._speechRecognition.onspeechend = function() {
      console.log('SpeechRecognition onspeechend');
    };
    this._speechRecognition.onnomatch = function() {
      console.log('SpeechRecognition onnomatch');
    };
    this._speechRecognition.onerror = (err: SpeechRecognitionError) => {
      if (err.error !== 'no-speech') {
        console.log('SpeechRecognition onerror', err);
      }
      if (this._isAutoRestart) {
        this.start();
      }
    };
    this._speechRecognition.onstart = () => {
      console.log('SpeechRecognition onstart');
    };
    this._speechRecognition.onend = () => {
      console.log('SpeechRecognition onend');
    };
    this._speechRecognition.onresult = (e: SpeechRecognitionEvent) => {
      const results = e.results;
      for (let i = e.resultIndex; i < results.length; i++) {
        if (results[i].isFinal) {
          const speechMode = state.setting.server!.values.speechMode;
          if (speechMode === SpeechMode.MANUAL) {
            this.stop();
          }

          console.log(results);
          let text = results[i][0].transcript;
          // if (text === this._wakeup) {
            // this._isAutoRestart = false;
            // if (this._speechRecognition) {
            //   this._speechRecognition.stop();
            // }
            // alert('Watson Speech to Text start');
            // this._toggleMicrophoneState();
          // }
          createMessageActionDispatch('text', {text: text});
          sendMessagesRequestActionDispatch();
        } else {
          console.log('[not final]' + results[i][0].transcript);
        }
      }
    };
    this._speechRecognition.start();
  }

  public stop(): void {
    console.log('stop' + this.name);
    this._isAutoRestart = false;
    if (this._speechRecognition) {
      this._speechRecognition.stop();
    }
  }
}