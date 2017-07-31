import {
  IPluginMessage,
  IPluginMessageItemProps,
  IPluginMessageInteractionProps,
  IPluginMessageMenuProps
} from '../';
import { ImageItem } from './ImageItem';
import { ImageInteraction } from './ImageInteraction';
import { ImageMenu } from './ImageMenu';

export class PluginMessageImage implements IPluginMessage {
  name: string = 'image';
  messageListMarginBottom: number = 88;
  item: React.ComponentClass<IPluginMessageItemProps> = ImageItem;
  interaction: React.ComponentClass<IPluginMessageInteractionProps> = ImageInteraction;
  menu: React.ComponentClass<IPluginMessageMenuProps> = ImageMenu;
  position: string = 'BOTTOM';

  constructor()
  constructor(position: string)
  constructor(position?: string) {
    if (position) {
      this.position = position;
    }
  }
}

export { ImageItem, ImageInteraction, ImageMenu };
