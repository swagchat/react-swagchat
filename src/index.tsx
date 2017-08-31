import {
  renderTemplateMessenger,
  renderRoomList,
  renderMessagePage,
  renderRoomSetting,
  RouteRoomListPage,
} from './templates/';
import {
  Avatar,
  Badge,
  Button,
  CheckListItem,
  ContactList,
  AddCircle,
  Back,
  Block,
  Camera,
  CheckCircle,
  CheckCircleOutline,
  Close,
  Done,
  Edit,
  Exit,
  Expand,
  Keyboard,
  Photo,
  RadioButtonChecked,
  RadioButtonUnChecked,
  Send,
  MessageBody,
  MessageDateSeparator,
  MessageInteractionBottom,
  MessageInteractionTop,
  MessageItem,
  MessageMenuBottom,
  MessageMenuTop,
  ModalDialog,
  ModalView,
  PhotoEdit,
  RoomEdit,
  RoomItem,
  RoomList,
  RoomSettingList,
  IconListItem,
  SimpleListItem,
  TopBar,
  SubTitleBar,
} from './components';
import {
  ContainerMessagePage,
  ContainerNotFoundPage,
  ContainerRoomListPage,
  ContainerRoomSettingPage,
  ContainerSelectContactPage,
} from './containers';
export * from './components';
import {
  PluginRoomListItemRoomAndUserNameWithMessage,
  PluginRoomListItemRoomNameWithMessage,
} from './plugins/roomListItem';

// For browser
(window as any).Sc = {};
(window as any).Sc.renderTemplateMessenger = renderTemplateMessenger;
(window as any).Sc.renderRoomList = renderRoomList;
(window as any).Sc.renderMessagePage = renderMessagePage;
(window as any).Sc.renderRoomSetting = renderRoomSetting;
(window as any).Sc.RouteRoomListPage = RouteRoomListPage;

(window as any).Sc.ContainerMessagePage = ContainerMessagePage;
(window as any).Sc.ContainerNotFoundPage = ContainerNotFoundPage;
(window as any).Sc.ContainerRoomListPage = ContainerRoomListPage;
(window as any).Sc.ContainerRoomSettingPage = ContainerRoomSettingPage;
(window as any).Sc.ContainerSelectContactPage = ContainerSelectContactPage;

(window as any).Sc.Avatar = Avatar;
(window as any).Sc.Badge = Badge;
(window as any).Sc.Button = Button;
(window as any).Sc.CheckListItem = CheckListItem;
(window as any).Sc.ContactList = ContactList;
(window as any).Sc.AddCircle = AddCircle;
(window as any).Sc.Back = Back;
(window as any).Sc.Block = Block;
(window as any).Sc.Camera = Camera;
(window as any).Sc.CheckCircle = CheckCircle;
(window as any).Sc.CheckCircleOutline = CheckCircleOutline;
(window as any).Sc.Close = Close;
(window as any).Sc.Done = Done;
(window as any).Sc.Edit = Edit;
(window as any).Sc.Exit = Exit;
(window as any).Sc.Expand = Expand;
(window as any).Sc.Keyboard = Keyboard;
(window as any).Sc.Photo = Photo;
(window as any).Sc.RadioButtonChecked = RadioButtonChecked;
(window as any).Sc.RadioButtonUnChecked = RadioButtonUnChecked;
(window as any).Sc.Send = Send;
(window as any).Sc.MessageBody = MessageBody;
(window as any).Sc.MessageDateSeparator = MessageDateSeparator;
(window as any).Sc.MessageInteractionBottom = MessageInteractionBottom;
(window as any).Sc.MessageInteractionTop = MessageInteractionTop;
(window as any).Sc.MessageItem = MessageItem;
(window as any).Sc.MessageMenuBottom = MessageMenuBottom;
(window as any).Sc.MessageMenuTop = MessageMenuTop;
(window as any).Sc.ModalDialog = ModalDialog;
(window as any).Sc.ModalView = ModalView;
(window as any).Sc.PhotoEdit = PhotoEdit;
(window as any).Sc.RoomEdit = RoomEdit;
(window as any).Sc.RoomItem = RoomItem;
(window as any).Sc.RoomList = RoomList;
(window as any).Sc.RoomSettingList = RoomSettingList;
(window as any).Sc.IconListItem = IconListItem;
(window as any).Sc.SimpleListItem = SimpleListItem;
(window as any).Sc.TopBar = TopBar;
(window as any).Sc.SubTitleBar = SubTitleBar;

(window as any).Sc.PluginRoomListItemRoomAndUserNameWithMessage = PluginRoomListItemRoomAndUserNameWithMessage;
(window as any).Sc.PluginRoomListItemRoomNameWithMessage = PluginRoomListItemRoomNameWithMessage;