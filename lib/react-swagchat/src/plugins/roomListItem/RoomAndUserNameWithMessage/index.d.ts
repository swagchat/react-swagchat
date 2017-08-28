/// <reference types="react" />
import { IPluginRoomListItem, IPluginRoomListItemProps } from 'swagchat-sdk/src/interface';
export declare class PluginRoomListItemRoomAndUserNameWithMessage implements IPluginRoomListItem {
    name: string;
    item: React.ComponentClass<IPluginRoomListItemProps>;
}
