import {
  IAddonMessage,
  IAddonMessageItemProps,
  IAddonMessageInteractionProps,
  IAddonMessageMenuProps
} from 'swagchat-sdk';
import { TextItem } from './TextItem';
import { TextInteraction } from './TextInteraction';
import { TextMenu } from './TextMenu';
import { IPluginMessageParams } from '../';

export class PluginMessageText implements IAddonMessage {
  name: string = 'text';
  messageListMarginBottom: number = 88;
  item: React.ComponentClass<IAddonMessageItemProps> = TextItem;
  interaction: React.ComponentClass<IAddonMessageInteractionProps> = TextInteraction;
  initialInteractionStyle: {
    pluginMessageImageInteractionStyle: {
      display: 'none',
    }
  };
  menu: React.ComponentClass<IAddonMessageMenuProps> = TextMenu;
  position: 'top' | 'bottom' = 'bottom';
  isAlwaysDisplay: boolean = true;

  constructor(params?: IPluginMessageParams)
  constructor(params?: IPluginMessageParams) {
    if (params) {
      params.position ? this.position = params.position : null;
      params.isAlwaysDisplay ? this.isAlwaysDisplay = params.isAlwaysDisplay : null;
    }
  }
}

export { TextItem, TextInteraction, TextMenu };
