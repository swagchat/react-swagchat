import {
  IPluginMessage,
  IPluginMessageItemProps,
  IPluginMessageInteractionProps,
  IPluginMessageMenuProps
} from 'swagchat-sdk';
import { ImageItem } from './ImageItem';
import { ImageInteraction } from './ImageInteraction';
import { ImageMenu } from './ImageMenu';
import { IPluginMessageParams } from '../';

export class PluginMessageImage implements IPluginMessage {
  name: string = 'image';
  messageListMarginBottom: number = 88;
  item: React.ComponentClass<IPluginMessageItemProps> = ImageItem;
  interaction: React.ComponentClass<IPluginMessageInteractionProps> = ImageInteraction;
  menu: React.ComponentClass<IPluginMessageMenuProps> = ImageMenu;
  position: 'top' | 'bottom' = 'bottom';
  isAlwaysDisplay: boolean = false;

  constructor(params?: IPluginMessageParams)
  constructor(params?: IPluginMessageParams) {
    if (params) {
      params.position ? this.position = params.position : null;
      params.isAlwaysDisplay ? this.isAlwaysDisplay = params.isAlwaysDisplay : null;
    }
  }
}

export { ImageItem, ImageInteraction, ImageMenu };
