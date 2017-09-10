export { PluginMessageImage, ImageItem } from './Image';
export { PluginMessageText, TextItem } from './Text';

export interface IPluginMessageParams {
  position?: 'top' | 'bottom';
  isAlwaysDisplay?: boolean;
}