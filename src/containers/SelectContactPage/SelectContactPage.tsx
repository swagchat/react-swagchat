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
import { State, store } from '../../stores';
import {
  TopBar,
  ContactList,
  Button,
  Close,
  Done,
} from '../../';
import { IUserState } from '../../stores/user';
import {
  combinedCreateRoomAndMessagesFetchRequestActionCreator,
  ICombinedCreateRoomAndMessagesFetchRequestAction,
} from '../../actions/combined';

export interface ISelectContactPageProps extends RouteComponentProps<any> {
  title: string;
  userState: IUserState;
  selectContactTitle: string;
  noContactListText: string;
  noContactListImage: string;
  roomListRoutePath: string;
  contactsFetchRequest: () => IContactsFetchRequestAction;
  updateSelectContacts: (contact: IUser) => IUpdateSelectContactsAction;
  clearSelectContacts: () => IClearSelectContactsAction;
  combinedCreateRoomAndMessagesFetchRequest: (room: IRoom) => ICombinedCreateRoomAndMessagesFetchRequestAction;
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

  render(): JSX.Element {
    const { selectContactTitle, userState, noContactListText, noContactListImage} = this.props;
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
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  if (state.client.client && state.user.user) {
    return {
      userState: state.user,
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
  };
};

export const ContainerSelectContactPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectContactPage);
