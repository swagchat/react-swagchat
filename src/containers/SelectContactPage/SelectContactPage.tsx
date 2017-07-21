import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IUser,  } from 'swagchat-sdk';
import { State } from '../../stores';
import {
  TopBar,
  ContactList,
  Button,
  Close,
} from '../../';
import { IUserState } from '../../stores/user';

export interface ISelectContactPageProps extends RouteComponentProps<any> {
  title: string;
  userState: IUserState;
}

class SelectContactPage extends React.Component<ISelectContactPageProps, void> {
  onContactTap(user: IUser) {
    console.log('SelectContactPage.onContactTap');
    console.log(user);
  }

  onCloseButton() {
    if (this.props.history) {
      this.props.history.push({pathname: '/'});
    }
  }

  render(): JSX.Element  {
    return (
      <div>
        <TopBar
          title="Select contact"
          leftButton={<Button icon={<Close />} onClick={this.onCloseButton.bind(this)} />}
          rightButton={<Button text="OK" />}
        />
        <ContactList
          hasTopBar={true}
          contacts={this.props.userState.contacts}
          displayNoDataText="No contacts."
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
    };
  }
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: ISelectContactPageProps) => {
  ownProps; // TODO
  dispatch; // TODO
  return {};
};

export const ContainerSelectContactPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectContactPage);
