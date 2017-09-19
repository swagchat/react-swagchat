import {
  renderMessenger,
  renderSimpleMessenger,
} from './applications/';
import {
  Avatar,
  Badge,
  Button,
  ContactList,
  MessageBody,
  Modal,
  ModalAction,
  PhotoEdit,
  RoomList,
  RoomSettingButtons,
  SubTitleBar,
  TextAvatar,
  TopBar,
} from './components';
import {
  PluginMessageText,
  PluginMessageImage,
} from './addons/messages';
import {
  PluginRoomListItemRoomAndUserNameWithMessage,
  PluginRoomListItemRoomNameWithMessage,
} from './addons/roomListItem';

export * from './components';
export * from './applications';

// For browser
(window as any).Swag = {};

(window as any).Swag.renderMessenger = renderMessenger;
(window as any).Swag.renderSimpleMessenger = renderSimpleMessenger;

(window as any).Swag.Avatar = Avatar;
(window as any).Swag.Badge = Badge;
(window as any).Swag.Button = Button;
(window as any).Swag.ContactList = ContactList;
(window as any).Swag.MessageBody = MessageBody;
(window as any).Swag.Modal = Modal;
(window as any).Swag.ModalAction = ModalAction;
(window as any).Swag.PhotoEdit = PhotoEdit;
(window as any).Swag.RoomList = RoomList;
(window as any).Swag.RoomSettingButtons = RoomSettingButtons;
(window as any).Swag.SubTitleBar = SubTitleBar;
(window as any).Swag.TextAvatar = TextAvatar;
(window as any).Swag.TopBar = TopBar;

(window as any).Swag.PluginRoomListItemRoomAndUserNameWithMessage = PluginRoomListItemRoomAndUserNameWithMessage;
(window as any).Swag.PluginRoomListItemRoomNameWithMessage = PluginRoomListItemRoomNameWithMessage;
(window as any).Swag.PluginMessageText = PluginMessageText;
(window as any).Swag.PluginMessageImage = PluginMessageImage;
