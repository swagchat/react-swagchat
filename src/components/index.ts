export { Avatar } from './Avatar/Avatar';
export { Badge } from './Badge/Badge';
export { Button } from './Button/Button';
export { ContactList, IContactListProps } from './ContactList/ContactList';
export { MessageBody } from './Message/MessageBody';
export { MessageInteraction } from './Message/internal/MessageInteraction';
export { MessageItem } from './Message/internal/MessageItem';
export { MessageMenu } from './Message/internal/MessageMenu';
export { Modal } from './Modal/Modal';
export { ModalAction, IModalAction } from './Modal/ModalAction';
export { PhotoEdit } from './PhotoEdit/PhotoEdit';
export { RoomList, IRoomListProps } from './RoomList/RoomList';
export { RoomSettingButtons, IRoomSettingButtonsProps } from './RoomSettingButtons/RoomSettingButtons';
export { SubTitleBar } from './SubTitleBar/SubTitleBar';
export { TextAvatar } from './TextAvatar/TextAvatar';
export { TopBar } from './TopBar/TopBar';

export interface IOnClickProps {
  onClick?: (param?: any) => void;
}

export interface IRootStyleProps {
  className?: string;
  style?: Object;
}