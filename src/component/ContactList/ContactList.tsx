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
import grey from 'material-ui/colors/grey';
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

const styles = (theme: Theme) => ({
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
    fontSize: ICON_SIZE,
  },
  searchTextWrap: {
    margin: 10,
    backgroundColor: grey[200],
    borderRadius: 5,
  },
  content: {
    marginTop: APP_BAR_HEIGHT + SEARCH_FORM_HEIGHT,
  },
});

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
  onClose: () => void;
}

class ContactListComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & ContactListProps, {}> {
  state = {
    checked: [0],
  };

  componentDidMount() {
    this.props.clearSelectContacts();
    this.props.fetchContactsRequest();
  }

  handleItemClick(contact: IUser) {
    this.props.updateSelectContacts(contact);
  }

  render() {
    const { classes, contacts, selectedContacts, enableSearch, onClose } = this.props;

    return (
        <div className={classes.root}>
          <AppBar
            position="fixed"
            className={classes.appBar}
          >
            <Toolbar className={classes.toolbar} disableGutters={true}>
              <IconButton color="primary">
                <CloseIcon className={classes.icon} onClick={onClose} />
              </IconButton>
              <Typography variant="subheading" className={classes.typography}>
                ユーザを選択
              </Typography>
              <IconButton color="primary"><span className={classes.icon}>OK</span></IconButton>
            </Toolbar>
            {enableSearch === true
              ?
                <div className={classes.searchTextWrap}><SearchText fullWidth={true} /></div>
              :
                null
            }
          </AppBar>
          <div className={classes.content}>
            {contacts ? Object.keys(contacts).map((key: string) => (
              <ListItem
                button={true}
                key={key}
                onClick={() => this.handleItemClick(contacts[key])}
              >
                <Avatar src={contacts[key].pictureUrl} />
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
