import {
  IAddonMessage,
  IAddonMessageItemProps,
  IAddonMessageInteractionProps,
  IAddonMessageMenuProps
} from 'swagchat-sdk';
import { SpeechItem } from './SpeechItem';
import { SpeechInteraction } from './SpeechInteraction';
import { SpeechMenu } from './SpeechMenu';
import { IPluginMessageParams } from '../';

export class PluginMessageSpeech implements IAddonMessage {
  name: string = 'speech';
  messageListMarginBottom: number = 88;
  item: React.ComponentClass<IAddonMessageItemProps> = SpeechItem;
  interaction: React.ComponentClass<IAddonMessageInteractionProps> = SpeechInteraction;
  menu: React.ComponentClass<IAddonMessageMenuProps> = SpeechMenu;
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

export { SpeechItem, SpeechInteraction, SpeechMenu };
