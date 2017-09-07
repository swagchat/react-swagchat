export { PluginMessageImage } from './Image';
export { PluginMessageText, TextItem, TextInteraction, TextMenu } from './Text';

export interface IPluginMessageParams {
  position?: 'top' | 'bottom';
  isAlwaysDisplay?: boolean;
}