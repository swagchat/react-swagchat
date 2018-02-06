export interface ISpeechToTextService {
  name: string;
  start: Function;
  stop: Function;
}

export * from './browser';
export * from './watson';
export * from './google';