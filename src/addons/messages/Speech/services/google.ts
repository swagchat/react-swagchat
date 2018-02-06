import {
  createMessageActionDispatch,
  sendMessagesRequestActionDispatch,
  store,
  State,
  IMessage,
  IMessageEvent,
  SpeechMode,
  updateAddonMessageMenuIndexActionDispatch,
} from 'swagchat-sdk';
import { ISpeechToTextService } from './';

export class SpeechToTextGoogle implements ISpeechToTextService {
  public name = 'google';

  private _audioCtx: AudioContext;
  private _mediaDevices: MediaDevices | null;
  private _audioProcessingBufferSize = 2048;
  private _sendStreamAudioDataViewBufferSize = 2 * (2 * this._audioProcessingBufferSize); // Do not exceed the receive buffer size on the websocket side
  private _sendStreamAudioDataView: DataView;
  private _processorNode: ScriptProcessorNode;

  constructor(audioCtx: AudioContext) {
    this._audioCtx = audioCtx;

    // GetUserMedia
    this._mediaDevices = navigator.mediaDevices || (((navigator as any).mozGetUserMedia || (navigator as any).webkitGetUserMedia) ? {
      getUserMedia: function(c) {
        return new Promise(function(y, n) {
          ((navigator as any).mozGetUserMedia ||
          (navigator as any).webkitGetUserMedia).call(navigator, c, y, n);
        });
      }
    } : null);
    if (!this._mediaDevices) {
      console.log('getUserMedia not supported.');
    }
  }

  public start(): void {
    console.log('start' + this.name);
    if (!this._mediaDevices) {
      return;
    }
    const constraints = {audio: true};
    this._mediaDevices.getUserMedia(constraints)
    .then(this._handleMediaStream)
    .catch((err) => {
      console.log(err.name + ': ' + err.message);
    });
  }

  public stop(): void {
    console.log('stop' + this.name);
    this._processorNode.disconnect();
    const state: State = store.getState();
    state.client.client!.speechRt.conn.removeEventListener('message');

    if (state.setting.server!.values.speechMode === SpeechMode.MANUAL) {
      state.addon.messages.map((messageAddon, i) => {
        console.log(i);
        if (messageAddon.name === 'text') {
          updateAddonMessageMenuIndexActionDispatch(i);
        }
      });
    }

    // Send remaining LINEAR PCM 16bit
    if (this._sendStreamAudioDataView && this._sendStreamAudioDataView.buffer.byteLength > 0) {
      state.client.client!.speechRt.conn.send(this._sendStreamAudioDataView.buffer);
      state.client.client!.speechRt.conn.close();
      this._sendStreamAudioDataView = new DataView(new ArrayBuffer(0));
    }
  }

  _handleMediaStream = (stream: MediaStream) => {
    const audioSourceNode = this._audioCtx!.createMediaStreamSource(stream);
    this._sendAudioStream(audioSourceNode);
  }

  _sendAudioStream(sourceNode: MediaStreamAudioSourceNode) {
    let state: State = store.getState();
    state.client.client!.createSpeechRt();
    state.client.client!.speechRt.conn.binaryType = 'arraybuffer';
    state.client.client!.speechRt.conn.addEventListener('message', (e: IMessageEvent) => {
      let message = JSON.parse(e.data as string) as IMessage;
      if (message.eventName === 'speech2text') {
        console.log(e.data);
        createMessageActionDispatch('text', message.payload);
        sendMessagesRequestActionDispatch();

        if (state.setting.server!.values.speechMode === SpeechMode.MANUAL) {
          this.stop();
        }
      }
    });
    this._sendStreamAudioDataView = new DataView(new ArrayBuffer(0));

    this._processorNode = this._audioCtx!.createScriptProcessor(this._audioProcessingBufferSize, 1, 1);
    sourceNode.connect(this._processorNode);
    this._processorNode.connect(this._audioCtx!.destination);

    this._processorNode.onaudioprocess = (e: AudioProcessingEvent) => {
      // Get monaural audio stream
      const inputData = e.inputBuffer.getChannelData(0);

      // Create DataView for LINEAR PCM 16bit
      let buffer = new ArrayBuffer(0 + inputData.length * 2);
      let dataView = new DataView(buffer);

      // Convert input audio stream to LINEAR PCM 16bit
      this._floatTo16BitPCM(dataView, 0, inputData);
      let mergedArrayBuffer = this._concatArrayBuffer([this._sendStreamAudioDataView.buffer, dataView.buffer]);
      this._sendStreamAudioDataView = new DataView(mergedArrayBuffer);

      if (this._sendStreamAudioDataView.buffer.byteLength >= this._sendStreamAudioDataViewBufferSize) {
        // Send LINEAR PCM 16bit
        state.client.client!.speechRt.conn.send(this._sendStreamAudioDataView.buffer);
        // Clear LINEAR PCM 16bit
        this._sendStreamAudioDataView = new DataView(new ArrayBuffer(0));
      }
    };
  }

  _floatTo16BitPCM(output: DataView, offset: number, input: Float32Array) {
    for (let i = 0; i < input.length; i++, offset += 2) {
        let s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  }

  _concatArrayBuffer(arrayBuffers: ArrayBuffer[]): ArrayBuffer {
    let length = 0;
    let buffer = null;

    for (let i in arrayBuffers) {
      buffer = arrayBuffers[i];
      length += buffer.byteLength;
    }

    let joined = new Uint8Array(length);
    let offset = 0;

    for (let i in arrayBuffers) {
      buffer = arrayBuffers[i];
      joined.set(new Uint8Array(buffer), offset);
      offset += buffer.byteLength;
    }

    return joined.buffer;
  }

}