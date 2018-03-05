import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Slide, { SlideProps } from 'material-ui/transitions/Slide';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import {
  State, IUser, RoomActions,
  clearSelectContactsActionCreator, ClearSelectContactsAction,
  fetchContactsRequestActionCreator, FetchContactsRequestAction,
  addRoomUserRequestActionCreator, AddRoomUserRequestAction,
} from 'swagchat-sdk';
import { ContactList } from '../ContactList';

const styles = (theme: Theme) => {
  theme.overrides!.MuiDialogContent = {
    root: {
      padding: 0,
      '&:first-child': {
        paddingTop: 0,
      },
    },
  };
  return {};
};

type ClassNames = 
  ''
;

interface MapStateToProps {
  contacts: {[key: string]: IUser} | null;
  selectedContacts: {[key: string]: IUser};
}

interface MapDispatchToProps {
  clearSelectContacts: () => ClearSelectContactsAction;
  fetchContactsRequest: () => FetchContactsRequestAction;
  addRoomUserRequest: (userIds: string[]) => AddRoomUserRequestAction;
}

export interface AddRoomMemberListItemProps {
}

function Transition(props: SlideProps) {
  return <Slide direction="up" {...props} />;
}

class AddRoomMemberListItemComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps &
    AddRoomMemberListItemProps, {}> {
  state = {
    dialog: false,
  };

  shouldComponentUpdate(nextProps: MapStateToProps, nextState: {dialog: boolean}) {
    if (this.state.dialog !== nextState.dialog) {
      return true;
    }
    return false;
  }

  handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    this.props.clearSelectContacts();
    this.props.fetchContactsRequest();
    this.setState({dialog: true});
    e.stopPropagation();
  }

  handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }

  handleContactListClose = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({dialog: false});
    e.stopPropagation();
  }

  handleContactListOK = (e: React.MouseEvent<HTMLElement>) => {
    this.props.addRoomUserRequest(Object.keys(this.props.selectedContacts));
    this.setState({dialog: false});
    e.stopPropagation();
  }

  render() {
    return (
      <ListItem button={true} disableGutters={true} onClick={this.handleOpen}>
        <IconButton onClick={this.handleOpen}><AddIcon color="primary" /></IconButton>
        <ListItemText primary="メンバーを追加" />
        <Dialog
          onClick={this.handleClose}
          fullScreen={true}
          transition={Transition}
          keepMounted={true}
          open={this.state.dialog}
          onClose={this.handleContactListClose}
        >
          <DialogContent>
            <ContactList
              enableSearch={true}
              handleClose={this.handleContactListClose}
              handleOK={this.handleContactListOK}
            />
          </DialogContent>
        </Dialog>
      </ListItem>
    );
  }
}

const mapStateToProps = (state: State, ownProps: AddRoomMemberListItemProps) => {
  return {
    contacts: state.user.contacts,
    selectedContacts: state.user.selectedContacts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RoomActions>, ownProps: AddRoomMemberListItemProps) => {
  return {
    clearSelectContacts: () => dispatch(clearSelectContactsActionCreator()),
    fetchContactsRequest: () => dispatch(fetchContactsRequestActionCreator()),
    addRoomUserRequest: (userIds: string[]) => dispatch(addRoomUserRequestActionCreator(userIds)),
  };
};

export const AddRoomMemberListItem = connect<MapStateToProps, MapDispatchToProps, AddRoomMemberListItemProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(AddRoomMemberListItemComponent));
