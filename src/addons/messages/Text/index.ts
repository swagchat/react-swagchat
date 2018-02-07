import {
  IAddonMessage,
  IAddonMessageItemProps,
  IAddonMessageInteractionProps,
} from 'swagchat-sdk';
import { TextItem } from './TextItem';
import { TextInteraction } from './TextInteraction';
import { TextMenu } from './TextMenu';
import { PluginMessageParams } from '../';

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
  menu: React.ReactNode = TextMenu;
  position: 'top' | 'bottom' = 'bottom';
  isAlwaysDisplay: boolean = true;

  constructor(params?: PluginMessageParams)
  constructor(params?: PluginMessageParams) {
    if (params) {
      if (params.position) {
        this.position = params.position;
      }
      if (params.isAlwaysDisplay) {
        this.isAlwaysDisplay = params.isAlwaysDisplay;
      }
    }
  }
}

export { TextItem, TextInteraction, TextMenu };
