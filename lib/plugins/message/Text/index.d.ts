/// <reference types="react" />
import { IPluginMessage, IPluginMessageItemProps, IPluginMessageInteractionProps, IPluginMessageMenuProps } from '../';
import { TextItem } from './TextItem';
import { TextInteraction } from './TextInteraction';
import { TextMenu } from './TextMenu';
export declare class PluginMessageText implements IPluginMessage {
    name: string;
    messageListMarginBottom: number;
    item: React.ComponentClass<IPluginMessageItemProps>;
    interaction: React.ComponentClass<IPluginMessageInteractionProps>;
    initialInteractionStyle: {
        pluginMessageImageInteractionStyle: {
            display: 'none';
        };
    };
    menu: React.ComponentClass<IPluginMessageMenuProps>;
}
export { TextItem, TextInteraction, TextMenu };
