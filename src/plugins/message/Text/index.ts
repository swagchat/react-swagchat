import {
  IPluginMessage,
  IPluginMessageItemProps,
  IPluginMessageInteractionProps,
  IPluginMessageMenuProps
} from 'swagchat-sdk/src/interface';
import { TextItem } from './TextItem';
import { TextInteraction } from './TextInteraction';
import { TextMenu } from './TextMenu';

export class PluginMessageText implements IPluginMessage {
  name: string = 'text';
  messageListMarginBottom: number = 88;
  item: React.ComponentClass<IPluginMessageItemProps> = TextItem;
  interaction: React.ComponentClass<IPluginMessageInteractionProps> = TextInteraction;
  initialInteractionStyle: {
    pluginMessageImageInteractionStyle: {
      display: 'none',
    }
  };
  menu: React.ComponentClass<IPluginMessageMenuProps> = TextMenu;
  position: string = 'BOTTOM';

  constructor()
  constructor(position: string)
  constructor(position?: string) {
    if (position) {
      this.position = position;
    }
  }
}

export { TextItem, TextInteraction, TextMenu };
