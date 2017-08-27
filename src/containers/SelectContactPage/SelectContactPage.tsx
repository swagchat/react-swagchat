import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IUser, IRoom } from 'swagchat-sdk';
import {
  contactsFetchRequestActionCreator,
  updateSelectContactsActionCreator,
  clearSelectContactsActionCreator,
  IContactsFetchRequestAction,
  IUpdateSelectContactsAction,
  IClearSelectContactsAction,
} from '../../actions/user';
import {
  IRoomUpdatePictureAction,
  roomUpdatePictureActionCreator,
} from '../../actions/room';
import {
  IUpdateStyleAction,
  updateStyleActionCreator,
} from '../../actions/style';
import { State, store } from '../../stores';
import {
  TopBar,
  ContactList,
  Button,
  Close,
  Done,
  ModalView,
  RoomEdit,
} from '../../components';
import { IUserState } from '../../stores/user';
import { IRoomState } from '../../stores/room';
import { IStyleState } from '../../stores/style';
import { ISettingState } from '../../stores/setting';
import {
  combinedCreateRoomAndMessagesFetchRequestActionCreator,
  combinedAssetPostAndRoomCreateAndMessageFetchRequestActionCreator,
  ICombinedCreateRoomAndMessagesFetchRequestAction,
  ICombinedAssetPostAndRoomCreatAndMessageFetchRequestAction,
} from '../../actions/combined';
import {
  roomUpdateNameActionCreator,
  IRoomUpdateNameAction,
} from '../../actions/room';

export interface ISelectContactPageProps extends RouteComponentProps<any> {
  title: string;
  userState: IUserState;
  roomState: IRoomState;
  styleState: IStyleState;
  settingState: ISettingState;
  selectContactTitle: string;
  noContactListText: string;
  noContactListImage: string;
  roomListRoutePath: string;
  contactsFetchRequest: () => IContactsFetchRequestAction;
  updateSelectContacts: (contact: IUser) => IUpdateSelectContactsAction;
  clearSelectContacts: () => IClearSelectContactsAction;
  combinedCreateRoomAndMessagesFetchRequest: (room: IRoom) => ICombinedCreateRoomAndMessagesFetchRequestAction;
  updateStyle: (style: Object) => IUpdateStyleAction;
  roomUpdateName: (updateName: string) => IRoomUpdateNameAction;
  roomUpdatePicture: (updatePicture: Blob) => IRoomUpdatePictureAction;
  assetPostAndRoomCreateAndMessageFetchRequest: () => ICombinedAssetPostAndRoomCreatAndMessageFetchRequestAction;
}

class SelectContactPage extends React.Component<ISelectContactPageProps, void> {
  componentWillUnmount() {
    this.props.clearSelectContacts();
  }

  onContactTap(user: IUser) {
    this.props.updateSelectContacts(user);
  }

  onCloseButton() {
    if (this.props.history) {
      store.dispatch(push(this.props.roomListRoutePath));
    }
  }

  onOkButton() {
    console.log('onOkButton');
    const room: IRoom = {
      userId: this.props.userState.userId,
      type: 0, // Update in saga
      name: '',
    };
    this.props.combinedCreateRoomAndMessagesFetchRequest(room);
  }

  onRoomCreateOkClick = () => {
    this.props.assetPostAndRoomCreateAndMessageFetchRequest();
  }

  render(): JSX.Element {
    const { selectContactTitle, userState, roomState, styleState, noContactListText, noContactListImage, updateStyle, roomUpdateName, roomUpdatePicture } = this.props;
    return (
      <div>
        <TopBar
          title={selectContactTitle}
          leftButton={<Button icon={<Close />} onClick={this.onCloseButton.bind(this)} />}
          rightButton={<Button icon={<Done />} onClick={this.onOkButton.bind(this)} />}
        />
        <ContactList
          hasTopBar={true}
          contacts={userState.contacts}
          selectedContacts={userState.selectContacts}
          noContactListText={noContactListText}
          noContactListImage={noContactListImage}
          onClick={this.onContactTap.bind(this)}
        />
        <ModalView
          title="グループ情報登録"
          component={
            <RoomEdit
              roomName={roomState.updateName}
              roomPictureUrl={roomState.updatePictureUrl}
              roomUpdateName={roomUpdateName}
              roomUpdatePicture={roomUpdatePicture}
            />
          }
          modalKey="roomCreate"
          styleState={styleState}
          updateStyle={updateStyle}
          onOkClick={this.onRoomCreateOkClick.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  if (state.client.client && state.user.user) {
    return {
      userState: state.user,
      roomState: state.room,
      styleState: state.style,
      settingState: state.setting,
      selectContactTitle: state.setting.selectContactTitle,
      noContactListText: state.setting.noContactListText,
      noContactListImage: state.setting.noContactListImage,
      roomListRoutePath: state.setting.roomListRoutePath,
    };
  }
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: ISelectContactPageProps) => {
  ownProps; // TODO
  dispatch; // TODO
  return {
    contactsFetchRequest: () => dispatch(contactsFetchRequestActionCreator()),
    updateSelectContacts: (contact: IUser) => dispatch(updateSelectContactsActionCreator(contact)),
    clearSelectContacts: () => dispatch(clearSelectContactsActionCreator()),
    combinedCreateRoomAndMessagesFetchRequest: (room: IRoom) => dispatch(combinedCreateRoomAndMessagesFetchRequestActionCreator(room)),
    updateStyle: (style: Object) => dispatch(updateStyleActionCreator(style)),
    roomUpdateName: (updateName: string) => dispatch(roomUpdateNameActionCreator(updateName)),
    roomUpdatePicture: (updatePicture: Blob) => dispatch(roomUpdatePictureActionCreator(updatePicture)),
    assetPostAndRoomCreateAndMessageFetchRequest: () => dispatch(combinedAssetPostAndRoomCreateAndMessageFetchRequestActionCreator()),
  };
};

export const ContainerSelectContactPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectContactPage);
