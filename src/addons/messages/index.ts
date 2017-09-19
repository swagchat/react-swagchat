export { PluginMessageImage, ImageMenu, ImageInteraction, ImageItem } from './Image';
export { PluginMessageText, TextMenu, TextInteraction, TextItem } from './Text';

export interface IPluginMessageParams {
  position?: 'top' | 'bottom';
  isAlwaysDisplay?: boolean;
}