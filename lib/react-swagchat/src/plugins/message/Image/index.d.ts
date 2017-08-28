/// <reference types="react" />
import { IPluginMessage, IPluginMessageItemProps, IPluginMessageInteractionProps, IPluginMessageMenuProps } from 'swagchat-sdk/src/interface';
import { ImageItem } from './ImageItem';
import { ImageInteraction } from './ImageInteraction';
import { ImageMenu } from './ImageMenu';
export declare class PluginMessageImage implements IPluginMessage {
    name: string;
    messageListMarginBottom: number;
    item: React.ComponentClass<IPluginMessageItemProps>;
    interaction: React.ComponentClass<IPluginMessageInteractionProps>;
    menu: React.ComponentClass<IPluginMessageMenuProps>;
    position: string;
    constructor();
    constructor(position: string);
}
export { ImageItem, ImageInteraction, ImageMenu };
