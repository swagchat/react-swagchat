import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import RadioButtonCheckedIcon from 'material-ui-icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from 'material-ui-icons/RadioButtonUnchecked';
import { SwagAvatar } from '../SwagAvatar';
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { LinearProgress } from 'material-ui/Progress';
import {
  State, IUser, UserActions,
  FetchContactsRequestAction, fetchContactsRequestActionCreator,
  UpdateSelectContactsAction, updateSelectContactsActionCreator,
  ClearSelectContactsAction, clearSelectContactsActionCreator,
} from 'swagchat-sdk';
import { SearchText } from '../Search/SearchText';
import { APP_BAR_HEIGHT, SEARCH_FORM_HEIGHT, MIN_WIDTH } from '../../setting';

const styles = (theme: Theme) => {
  return {
    root: {
      minWidth: MIN_WIDTH,
      WebkitOverflowScrolling: 'touch',
    },
    typography: {
      flex: 1,
      textAlign: 'center',
    },
    iconText: {
      fontSize: '0.8em',
    },
    content: {
      marginTop: APP_BAR_HEIGHT + SEARCH_FORM_HEIGHT + 8 + 8,
      WebkitOverflowScrolling: 'touch',
    },
  };
};

type ClassNames = 
  'root' |
  'typography' |
  'iconText' |
  'content'
;

interface MapStateToProps {
  contacts: {[key: string]: IUser} | null;
  selectedContacts: {[key: string]: IUser};
}

interface MapDispatchToProps {
  fetchContactsRequest: () => FetchContactsRequestAction;
  updateSelectContacts: (contact: IUser) => UpdateSelectContactsAction;
  clearSelectContacts: () => ClearSelectContactsAction;
}

export interface ContactListProps {
  enableSearch?: boolean;
  handleClose: (e: React.MouseEvent<HTMLElement>) => void;
  handleOK: (e: React.MouseEvent<HTMLElement>) => void;
}

class ContactListComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & ContactListProps, {}> {

  handleItemClick(contact: IUser) {
    this.props.updateSelectContacts(contact);
  }

  render() {
    const { classes, contacts, selectedContacts, enableSearch, handleClose, handleOK } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar disableGutters={true}>
            <IconButton color="primary" onClick={handleClose}><CloseIcon /></IconButton>
            <Typography variant="subheading" className={classes.typography}>ユーザを選択</Typography>
            <IconButton color="primary" onClick={handleOK}><span className={classes.iconText}>OK</span></IconButton>
          </Toolbar>
          {enableSearch === true
            ? <div><SearchText fullWidth={true} placeholder="連絡先を検索" /></div>
            : null
          }
        </AppBar>
        <div className={classes.content}>
          {contacts ? Object.keys(contacts).map((key: string) => (
            <ListItem button={true} key={key} onClick={() => this.handleItemClick(contacts[key])}>
              <SwagAvatar data={{name: contacts[key].name, pictureUrl: contacts[key].pictureUrl}} />
              <ListItemText primary={contacts[key].name} />
              <Checkbox
                checked={selectedContacts[contacts[key].userId] ? true : false}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
              />
            </ListItem>
          )) : <LinearProgress /> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: ContactListProps) => {
  return {
    contacts: state.user.contacts,
    selectedContacts: state.user.selectedContacts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<UserActions>, ownProps: ContactListProps) => {
  return {
    fetchContactsRequest: () => dispatch(fetchContactsRequestActionCreator()),
    updateSelectContacts: (contact: IUser) => dispatch(updateSelectContactsActionCreator(contact)),
    clearSelectContacts: () => dispatch(clearSelectContactsActionCreator()),
  };
};

export const ContactList = connect<MapStateToProps, MapDispatchToProps, ContactListProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ContactListComponent));
