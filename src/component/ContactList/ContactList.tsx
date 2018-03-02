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
import Avatar from 'material-ui/Avatar';
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { LinearProgress } from 'material-ui/Progress';
import {
  State,
  IUser,
  UserActions,
  fetchContactsRequestActionCreator,
  updateSelectContactsActionCreator,
  clearSelectContactsActionCreator,
  FetchContactsRequestAction,
  UpdateSelectContactsAction,
  ClearSelectContactsAction,
} from 'swagchat-sdk';
import { SearchText } from '../Search/SearchText';
import { BORDER_COLOR, APP_BAR_HEIGHT, SEARCH_FORM_HEIGHT, ICON_SIZE } from '../../setting';

type justifyContentType = 'center';

const styles = (theme: Theme) => {
  theme!.overrides!.MuiDialogContent = {
    root: {
      padding: 0,
      '&:first-child': {
        paddingTop: 0,
      },
    },
  };
  return {
    root: {
      width: '100%',
      backgroundColor: theme.palette.common.white,
    },
    appBar: {
      left: 0,
      background: theme.palette.common.white,
      borderBottom: '1px solid ' + BORDER_COLOR,
      backgroundColor: theme.palette.common.white,
    },
    toolbar: {
      minHeight: APP_BAR_HEIGHT,
      justifyContent: 'center' as justifyContentType,
      backgroundColor: theme.palette.common.white,
    },
    typography: {
      flex: 1,
      textAlign: 'center',
      backgroundColor: theme.palette.common.white,
    },
    icon: {
      width: ICON_SIZE,
      height: ICON_SIZE,
      fontSize: ICON_SIZE * 0.7,
    },
    searchTextWrap: {
    },
    content: {
      marginTop: APP_BAR_HEIGHT + SEARCH_FORM_HEIGHT + 8 + 8,
    },
  };
};

type ClassNames = 
  'root' |
  'appBar' |
  'toolbar' |
  'typography' |
  'icon' |
  'searchTextWrap' |
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

class ContactListComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & ContactListProps, {}> {
  state = {
    checked: [0],
  };

  handleItemClick(contact: IUser) {
    this.props.updateSelectContacts(contact);
  }

  render() {
    const { classes, contacts, selectedContacts, enableSearch, handleClose, handleOK } = this.props;

    return (
        <div className={classes.root}>
          <AppBar
            position="fixed"
            className={classes.appBar}
          >
            <Toolbar className={classes.toolbar} disableGutters={true}>
              <IconButton color="primary" onClick={handleClose}>
                <CloseIcon className={classes.icon} />
              </IconButton>
              <Typography variant="subheading" className={classes.typography}>
                ユーザを選択
              </Typography>
              <IconButton
                color="primary"
                onClick={handleOK}
              >
                <span className={classes.icon}>OK</span>
              </IconButton>
            </Toolbar>
            {enableSearch === true
              ? <div className={classes.searchTextWrap}><SearchText fullWidth={true} placeholder="連絡先を検索" /></div>
              : null
            }
          </AppBar>
          <div className={classes.content}>
            {contacts ? Object.keys(contacts).map((key: string) => (
              <ListItem
                button={true}
                key={key}
                onClick={() => this.handleItemClick(contacts[key])}
              >
                {contacts[key].pictureUrl === '' || contacts[key].pictureUrl === undefined
                  ? <Avatar>{contacts[key].name.slice(0, 1)}</Avatar>
                  : <Avatar src={contacts[key].pictureUrl} />
                }
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
