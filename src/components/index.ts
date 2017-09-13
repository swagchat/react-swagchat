export { Avatar } from './Avatar/Avatar';
export { Badge } from './Badge/Badge';
export { Button } from './Button/Button';
export { ContactList, IContactListProps } from './ContactList/ContactList';
export { MessageBody } from './Message/MessageBody';
export { MessageDateSeparator } from './Message/internal/MessageDateSeparator';
export { MessageInteraction } from './Message/internal/MessageInteraction';
export { MessageItem } from './Message/internal/MessageItem';
export { MessageMenu } from './Message/internal/MessageMenu';
export { Modal } from './Modal/Modal';
export { ModalAction, IModalAction } from './Modal/ModalAction';
export { PhotoEdit } from './PhotoEdit/PhotoEdit';
export { RoomEditForm } from './RoomEditForm/RoomEditForm';
export { RoomList, IRoomListProps } from './RoomList/RoomList';
export { RoomSettingButtons, IRoomSettingButtonsProps } from './RoomSettingButtons/RoomSettingButtons';
export { SubTitleBar } from './SubTitleBar/SubTitleBar';
export { TextAvatar } from './TextAvatar/TextAvatar';
export { TopBar } from './TopBar/TopBar';

export interface IOnClickProps {
  onClick?: (param?: any) => void;
}

export const SHAPE_CIRCLE = 'circle';
export const SHAPE_SQUARE = 'square';
export const SHAPE_SQUARE_ROUND = 'squareRound';
export const SHAPE_ROUND = 'round';

export const COLOR_PRIMARY = 'primary';
export const COLOR_SECONDALY = 'secondary';
export const COLOR_SUCCESS = 'success';
export const COLOR_DANGER = 'danger';
export const COLOR_WARNING = 'warning';
export const COLOR_INFO = 'info';
export const COLOR_LIGHT = 'light';
export const COLOR_DARK = 'dark';
export const COLOR_LINK = 'link';

export type ShapeTypes = typeof SHAPE_CIRCLE
  | typeof SHAPE_SQUARE
  | typeof SHAPE_SQUARE_ROUND
  | typeof SHAPE_ROUND
;

export type ColorTypes = typeof COLOR_PRIMARY
  | typeof COLOR_SECONDALY
  | typeof COLOR_SUCCESS
  | typeof COLOR_DANGER
  | typeof COLOR_WARNING
  | typeof COLOR_INFO
  | typeof COLOR_LIGHT
  | typeof COLOR_DARK
  | typeof COLOR_LINK
;

export interface IShapeProps {
  shape?: ShapeTypes;
}

export interface IColorProps {
  color?: ColorTypes;
}

export interface IRootStyleProps {
  className?: string;
  style?: Object;
}