import {
  renderTemplateMessenger,
} from './templates/';
import {
  Avatar,
  Badge,
  Button,
  CheckListItem,
  ContactList,
  MessageBody,
  MessageDateSeparator,
  MessageInteractionBottom,
  MessageInteractionTop,
  MessageItem,
  MessageMenuBottom,
  MessageMenuTop,
  Modal,
  ModalAction,
  PhotoEdit,
  RoomEdit,
  RoomItem,
  RoomList,
  RoomSettingList,
  IconListItem,
  SimpleListItem,
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
(window as any).Sc.CheckListItem = CheckListItem;
(window as any).Sc.ContactList = ContactList;
(window as any).Sc.MessageBody = MessageBody;
(window as any).Sc.MessageDateSeparator = MessageDateSeparator;
(window as any).Sc.MessageInteractionBottom = MessageInteractionBottom;
(window as any).Sc.MessageInteractionTop = MessageInteractionTop;
(window as any).Sc.MessageItem = MessageItem;
(window as any).Sc.MessageMenuBottom = MessageMenuBottom;
(window as any).Sc.MessageMenuTop = MessageMenuTop;
(window as any).Sc.Modal = Modal;
(window as any).Sc.ModalAction = ModalAction;
(window as any).Sc.PhotoEdit = PhotoEdit;
(window as any).Sc.RoomEdit = RoomEdit;
(window as any).Sc.RoomItem = RoomItem;
(window as any).Sc.RoomList = RoomList;
(window as any).Sc.RoomSettingList = RoomSettingList;
(window as any).Sc.IconListItem = IconListItem;
(window as any).Sc.SimpleListItem = SimpleListItem;
(window as any).Sc.SubTitleBar = SubTitleBar;
(window as any).Sc.TextAvatar = TextAvatar;
(window as any).Sc.TopBar = TopBar;

(window as any).Sc.PluginRoomListItemRoomAndUserNameWithMessage = PluginRoomListItemRoomAndUserNameWithMessage;
(window as any).Sc.PluginRoomListItemRoomNameWithMessage = PluginRoomListItemRoomNameWithMessage;