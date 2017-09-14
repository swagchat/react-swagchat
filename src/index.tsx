import {
  renderTemplateMessenger,
  renderTemplateSimpleMessage,
} from './templates/';
import {
  Avatar,
  Badge,
  Button,
  ContactList,
  MessageBody,
  Modal,
  ModalAction,
  PhotoEdit,
  RoomEditForm,
  RoomList,
  RoomSettingButtons,
  SubTitleBar,
  TextAvatar,
  TopBar,
} from './components';
import {
  PluginMessageText,
  PluginMessageImage,
  TextItem,
  ImageItem,
} from './plugins/message';
import {
  PluginRoomListItemRoomAndUserNameWithMessage,
  PluginRoomListItemRoomNameWithMessage,
} from './plugins/roomListItem';

export * from './components';
export * from './templates';

// For browser
(window as any).Swag = {};

(window as any).Swag.renderTemplateMessenger = renderTemplateMessenger;
(window as any).Swag.renderTemplateSimpleMessage = renderTemplateSimpleMessage;

(window as any).Swag.Avatar = Avatar;
(window as any).Swag.Badge = Badge;
(window as any).Swag.Button = Button;
(window as any).Swag.ContactList = ContactList;
(window as any).Swag.MessageBody = MessageBody;
(window as any).Swag.Modal = Modal;
(window as any).Swag.ModalAction = ModalAction;
(window as any).Swag.PhotoEdit = PhotoEdit;
(window as any).Swag.RoomEditForm = RoomEditForm;
(window as any).Swag.RoomList = RoomList;
(window as any).Swag.RoomSettingButtons = RoomSettingButtons;
(window as any).Swag.SubTitleBar = SubTitleBar;
(window as any).Swag.TextAvatar = TextAvatar;
(window as any).Swag.TopBar = TopBar;

(window as any).Swag.PluginRoomListItemRoomAndUserNameWithMessage = PluginRoomListItemRoomAndUserNameWithMessage;
(window as any).Swag.PluginRoomListItemRoomNameWithMessage = PluginRoomListItemRoomNameWithMessage;
(window as any).Swag.PluginMessageText = PluginMessageText;
(window as any).Swag.PluginMessageImage = PluginMessageImage;
(window as any).Swag.TextItem = TextItem;
(window as any).Swag.ImageItem = ImageItem;
