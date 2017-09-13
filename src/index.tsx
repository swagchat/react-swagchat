import {
  renderTemplateMessenger,
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
  RoomListPage,
  ContainerRoomList,
  RoomSettingPage,
  ContainerRoomSetting,
  SelectContactPage,
  ContainerSelectContact,
  MessagePage,
  ContainerMessage,
  ContainerNotFoundPage,
} from './containers';
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
(window as any).Sc = {};
(window as any).Sc.renderTemplateMessenger = renderTemplateMessenger;
(window as any).Sc.RoomListPage = RoomListPage;
(window as any).Sc.RoomSettingPage = RoomSettingPage;
(window as any).Sc.SelectContactPage = SelectContactPage;
(window as any).Sc.MessagePage = MessagePage;

(window as any).Sc.ContainerRoomList = ContainerRoomList;
(window as any).Sc.ContainerRoomSetting = ContainerRoomSetting;
(window as any).Sc.ContainerMessagePage = ContainerMessage;
(window as any).Sc.ContainerNotFoundPage = ContainerNotFoundPage;
(window as any).Sc.ContainerSelectContactPage = ContainerSelectContact;

(window as any).Sc.Avatar = Avatar;
(window as any).Sc.Badge = Badge;
(window as any).Sc.Button = Button;
(window as any).Sc.ContactList = ContactList;
(window as any).Sc.MessageBody = MessageBody;
(window as any).Sc.Modal = Modal;
(window as any).Sc.ModalAction = ModalAction;
(window as any).Sc.PhotoEdit = PhotoEdit;
(window as any).Sc.RoomEditForm = RoomEditForm;
(window as any).Sc.RoomList = RoomList;
(window as any).Sc.RoomSettingButtons = RoomSettingButtons;
(window as any).Sc.SubTitleBar = SubTitleBar;
(window as any).Sc.TextAvatar = TextAvatar;
(window as any).Sc.TopBar = TopBar;

(window as any).Sc.PluginRoomListItemRoomAndUserNameWithMessage = PluginRoomListItemRoomAndUserNameWithMessage;
(window as any).Sc.PluginRoomListItemRoomNameWithMessage = PluginRoomListItemRoomNameWithMessage;
(window as any).Sc.PluginMessageText = PluginMessageText;
(window as any).Sc.PluginMessageImage = PluginMessageImage;
(window as any).Sc.TextItem = TextItem;
(window as any).Sc.ImageItem = ImageItem;
