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
import { ContactList } from '../ContactList/ContactList';

const styles = (theme: Theme) => {
  theme!.overrides!.MuiDialogActions = {
    action: {
      width: '50%',
    },
  };
  theme!.overrides!.MuiDialogContent = {
    root: {
      padding: 0,
    },
  };
  return {
    root: {
    },
    listItemIcon: {
      color: theme.palette.primary.main,
    },
    dialogContent: {
      margin: '0 auto',
    },
    dialogActions: {
      justifyContent: 'space-around' as 'space-around',
    },
  };
};

type ClassNames = 
  'root' |
  'listItemIcon' |
  'dialogContent' |
  'dialogActions'
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

export interface Props {
}

function Transition(props: SlideProps) {
  return <Slide direction="up" {...props} />;
}

class AddRoomMemberListItemComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & Props, {}> {
  state = {
    dialog: false,
  };

  shouldComponentUpdate(nextProps: MapStateToProps, nextState: {dialog: boolean}) {
    if (this.state.dialog !== nextState.dialog) {
      return true;
    }
    return false;
  }

  handlerOpen = (e: React.MouseEvent<HTMLElement>) => {
    this.props.clearSelectContacts();
    this.props.fetchContactsRequest();
    this.setState({dialog: true });
    e.stopPropagation();
  }

  handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }

  handleContactListClose = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({dialog: false });
    e.stopPropagation();
  }

  handleContactListOK = (e: React.MouseEvent<HTMLElement>) => {
    this.props.addRoomUserRequest(Object.keys(this.props.selectedContacts));
    this.setState({dialog: false });
    e.stopPropagation();
  }

  render() {
    const { classes } = this.props;

    return (
      <ListItem
        button={true}
        disableGutters={true}
        onClick={(e: React.MouseEvent<HTMLElement>) => this.handlerOpen(e)}
      >
        <IconButton
          className={classes.listItemIcon}
          onClick={(e: React.MouseEvent<HTMLElement>) => this.handlerOpen(e)}
        >
          <AddIcon />
        </IconButton>
        <ListItemText primary="メンバーを追加" />
        <Dialog
          className={classes.dialogContent}
          onClick={(e: React.MouseEvent<HTMLElement>) => this.handleClose(e)}
          fullScreen={true}
          transition={Transition}
          keepMounted={true}
          open={this.state.dialog}
          onClose={this.handleContactListClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <ContactList
              enableSearch={true}
              handleClose={(e: React.MouseEvent<HTMLElement>) => this.handleContactListClose(e)}
              handleOK={(e: React.MouseEvent<HTMLElement>) => this.handleContactListOK(e)}
            />
          </DialogContent>
        </Dialog>
      </ListItem>
    );
  }
}

const mapStateToProps = (state: State, ownProps: Props) => {
  return {
    contacts: state.user.contacts,
    selectedContacts: state.user.selectedContacts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RoomActions>, ownProps: Props) => {
  return {
    clearSelectContacts: () => dispatch(clearSelectContactsActionCreator()),
    fetchContactsRequest: () => dispatch(fetchContactsRequestActionCreator()),
    addRoomUserRequest: (userIds: string[]) => dispatch(addRoomUserRequestActionCreator(userIds)),
  };
};

export const AddRoomMemberListItem = connect<MapStateToProps, MapDispatchToProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(AddRoomMemberListItemComponent));
