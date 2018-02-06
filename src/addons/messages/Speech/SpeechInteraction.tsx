import * as React from 'react';
import {
  IAddonMessageInteractionProps,
  setSpeechModeActionDispatch,
  store,
  State,
  Speech2Text,
  SpeechMode,
} from 'swagchat-sdk';
const classNames = require('classnames');
import * as styles from './speech-interaction.css';
import {
  ISpeechToTextService,
  SpeechToTextBrowser,
  SpeechToTextWatson,
  SpeechToTextGoogle,
} from './services';

export class SpeechInteraction extends React.Component<IAddonMessageInteractionProps, {}> {
  private _audioCtx: AudioContext | null;

  private _analyserCanvas2dCtx: CanvasRenderingContext2D | null;
  private _analyserCanvasDom: HTMLCanvasElement | null;
  private _analyserNode: AnalyserNode | null;
  private _analyserFrameId = 0;

  private _speechToTextService: ISpeechToTextService;

  constructor(props: IAddonMessageInteractionProps) {
    super(props);

    setSpeechModeActionDispatch(true);

    // GetUserMedia
    const mediaDevices = navigator.mediaDevices || (((navigator as any).mozGetUserMedia || (navigator as any).webkitGetUserMedia) ? {
      getUserMedia: function(c) {
        return new Promise(function(y, n) {
          ((navigator as any).mozGetUserMedia ||
          (navigator as any).webkitGetUserMedia).call(navigator, c, y, n);
        });
      }
    } : null);
    if (!mediaDevices) {
      console.log('getUserMedia not supported.');
      return;
    } else {
      const constraints = {audio: true};
      mediaDevices.getUserMedia(constraints)
      .then(this._handleMediaStream)
      .catch((err) => {
        console.log(err.name + ': ' + err.message);
      });
    }

    // Create AudioContext
    const audioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!audioContext) {
      console.log('Web Audio API is not supported.');
      return;
    } else {
      this._audioCtx = new audioContext();

      // Generate AnalyserNode
      this._analyserNode = this._audioCtx!.createAnalyser();
    }

    const state: State = store.getState();
    switch (state.setting.server!.values.speechToText) {
      case Speech2Text.BROWSER:
        this._speechToTextService = new SpeechToTextBrowser();
        break;
      case Speech2Text.WATSON:
        this._speechToTextService = new SpeechToTextWatson('USERNAME', 'PASSWORD');
        break;
      case Speech2Text.GOOGLE:
        this._speechToTextService = new SpeechToTextGoogle(this._audioCtx!);
        break;
      default:
        break;
    }

    const speechMode = state.setting.server!.values.speechMode;
    if (speechMode === SpeechMode.ALWAYS || speechMode === SpeechMode.MANUAL) {
      this._speechToTextService.start();
    }
  }

  componentDidMount() {
    // Create Canvas 2D Context for audio visual
    if (!this._analyserCanvas2dCtx && this._analyserCanvasDom) {
      this._analyserCanvas2dCtx = this._analyserCanvasDom.getContext('2d');
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    setSpeechModeActionDispatch(false);
    this._speechToTextService.stop();
    this._cancelVisualAnalyser();
    this._audioCtx!.close();
  }

  _handleMediaStream = (stream: MediaStream) => {
    const audioSourceNode = this._audioCtx!.createMediaStreamSource(stream);
    this._visualAnalyser(audioSourceNode);
  }

  _visualAnalyser(sourceNode: MediaStreamAudioSourceNode) {
    // source -> gainNode -> zeroGainNode -> destination
    //                    -> analyserNode?
    const gainNode = this._audioCtx!.createGain();
    const zeroGainNode = this._audioCtx!.createGain();
    zeroGainNode.gain.value = 0.0;
    gainNode.connect(zeroGainNode);
    sourceNode.connect(gainNode);
    if (this._analyserNode) {
      this._analyserNode.fftSize = 2048;
      gainNode.connect(this._analyserNode);
      zeroGainNode.connect(this._audioCtx!.destination);
      this._updateAnalyser();
    }
  }

  _updateAnalyser() {
    if (!this._analyserCanvasDom || !this._analyserCanvas2dCtx) {
      return;
    }
    let canvasWidth = this._analyserCanvasDom.width;
    let canvasHeight = this._analyserCanvasDom.height;

    if (this._analyserCanvas2dCtx && this._analyserNode) {
      const SPACING = 3;
      const BAR_WIDTH = 1;
      const numBars = Math.round(canvasWidth / SPACING);
      const freqByteData = new Uint8Array(this._analyserNode.frequencyBinCount);

      this._analyserNode.getByteFrequencyData(freqByteData);

      this._analyserCanvas2dCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      this._analyserCanvas2dCtx.fillStyle = '#F6D565';
      this._analyserCanvas2dCtx.lineCap = 'round';
      const multiplier = this._analyserNode.frequencyBinCount / numBars;

      for (let i = 0; i < numBars; ++i) {
        let magnitude = 0;
        const offset = Math.floor( i * multiplier );
        for (let j = 0; j < multiplier; j++) {
          magnitude += freqByteData[offset + j];
        }
        magnitude = magnitude / multiplier;
        this._analyserCanvas2dCtx.fillStyle = 'hsl( ' + Math.round((i * 360) / numBars) + ', 100%, 50%)';
        this._analyserCanvas2dCtx.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude);
      }
      let requestAnimationFrame: any;
      requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
      if (!requestAnimationFrame) {
        return;
      }

      this._analyserFrameId = requestAnimationFrame(this._updateAnalyser.bind(this));
    }
  }

  _cancelVisualAnalyser() {
    let cancelAnimationFrame: any;
    cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
    if (!cancelAnimationFrame) {
      return;
    }
    cancelAnimationFrame(this._analyserFrameId);
    this._analyserFrameId = 0;

    if (this._analyserCanvas2dCtx && this._analyserCanvasDom) {
      const canvasWidth = this._analyserCanvasDom.width;
      const canvasHeight = this._analyserCanvasDom.height;
      this._analyserCanvas2dCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
  }

  render(): JSX.Element {
    return (
      <div className={this.props.position === 'top' ?  classNames(styles.confirmWrap, styles.top) : classNames(styles.confirmWrap, styles.bottom)}>
        <canvas
          ref={(child) => this._analyserCanvasDom = child}
          className={styles.confirmImage}
        />
      </div>
    );
  }
}
