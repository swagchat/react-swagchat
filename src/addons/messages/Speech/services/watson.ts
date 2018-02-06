import {
  createMessageActionDispatch,
  sendMessagesRequestActionDispatch,
  store,
  State,
  SpeechMode,
} from 'swagchat-sdk';
import * as recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
import { ISpeechToTextService } from './';

export interface AudioResult {
  index: number;
  final: boolean;
  alternatives: Alternative[];
}

export interface Alternative {
  confidence?: number;
  transcript: string;
}

export class SpeechToTextWatson implements ISpeechToTextService {
  name = 'watson';
  private _isRecording = false;
  private _recognizeStream: any = null;
  private _username = '';
  private _password = '';
  private _watsonToken = 'WATSON_TOKEN';

  constructor(username: string, password: string) {
    this._username = username;
    this._password = password;
  }

  public start(): void {
    console.log('start' + this.name);
    if (this._recognizeStream) {
      this.stop();
    } else if (!this._isRecording) {
      this._isRecording = true;
      this._startRecognizeStream(this._watsonToken);
    }
  }

  public stop(): void {
    console.log('stop' + this.name);
    if (this._recognizeStream) {
      this._recognizeStream.stop();
      this._recognizeStream.removeAllListeners();
    }

    this._isRecording = false;
    this._recognizeStream = null;
  }

  _startRecognizeStream(token: string) {
    const state: State = store.getState();
    const stream = recognizeMicrophone({
      token,
      model: state.client.client!.user.lang + '_BroadbandModel',
      objectMode: true,
      extractResults: true,
    });
    console.log('stream:', stream);

    stream.on('data', (data: AudioResult) => {
      console.log('data:', data);
      if (data.final) {
        const speechMode = state.setting.server!.values.speechMode;
        if (speechMode === SpeechMode.MANUAL) {
          this.stop();
        }

        const transcript = data.alternatives[0].transcript;
        console.log(transcript);
        createMessageActionDispatch('text', {text: transcript});
        sendMessagesRequestActionDispatch();

      }
    });
    this._recognizeStream = stream;
  }
}
