import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Badge from 'material-ui/Badge';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import SwipeableViews from 'react-swipeable-views';
import Tabs, { Tab } from 'material-ui/Tabs';
import Dialog, {
  DialogContent,
} from 'material-ui/Dialog';
import Slide, { SlideProps } from 'material-ui/transitions/Slide';
import {
  State,
  store,
  IUser,
  Room,
  IRoomForUser,
  IProblemDetail,
  dateHumanize,
  ClientActions,
  MessageActions,
  setCurrentRoomIdActionCreator, SetCurrentRoomIdAction,
  setCurrentRoomNameActionCreator, SetCurrentRoomNameAction,
  setSearchTextActionCreator, SetSearchTextAction,
  clearSelectContactsActionCreator, ClearSelectContactsAction,
  fetchContactsRequestActionCreator, FetchContactsRequestAction,
  createRoomAndFetchMessagesRequestActionCreator, CreateRoomAndFetchMessagesRequestAction,
} from 'swagchat-sdk';
import { SearchText } from '../Search/SearchText';
import { SearchResultTab } from '../Search/SearchResultTab';
import { SearchResultView } from '../Search/SearchResultView';
import { TabContainer } from '../TabContainer';
import { ContactList } from '../ContactList/ContactList';
import { SwagAvatar } from '../SwagAvatar';
import {
  ICON_SIZE,
  APP_BAR_HEIGHT,
  SEARCH_FORM_HEIGHT,
  TAB_HEIGHT,
  BORDER_COLOR,
  ONLINE_BADGE_COLOR,
  ONLINE_BADGE_SIZE,
} from '../../setting';

type justifyContentType = 'center';
type positionType = 'absolute';

const styles = (theme: Theme) => {
  theme!.overrides!.MuiTab = {
    label: {
      fontSize: '0.8125rem',
      '@media (min-width: 960px)': {
        fontSize: '0.8125rem',
      },
    },
    labelContainer: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      '@media (min-width: 960px)': {
        paddingLeft: 0,
        paddingRight: 0,
      }
    },
  };
  theme!.overrides!.MuiDialogContent = {
    root: {
      padding: 0,
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
    toolbarButton: {
      width: 40,
      height: 40,
    },
    toolbarIcon: {
      width: ICON_SIZE,
      margin: '0 5px',
    },
    typography: {
      flex: 1,
      textAlign: 'center',
      backgroundColor: theme.palette.common.white,
    },
    searchTextWrap: {
    },
    tabs: {
      backgroundColor: theme.palette.common.white,
    },
    tab: {
      marginTop: 12,
      height: TAB_HEIGHT,
      flexBasis: '33%',
      minWidth: '33%',
      backgroundColor: theme.palette.common.white,
    },
    dialog: {

    },
    content: {
    },
    onlineBadge: {
      top: '46px',
      left: '48px',
      borderRadius: '50%',
      height: ONLINE_BADGE_SIZE,
      width: ONLINE_BADGE_SIZE,
      backgroundColor: ONLINE_BADGE_COLOR,
      position: 'absolute' as positionType,
    },
  };
};

type ClassNames = 
  'root' |
  'appBar' |
  'toolbar' |
  'toolbarButton' |
  'toolbarIcon' |
  'typography' |
  'tabs' |
  'tab' |
  'searchTextWrap' |
  'dialog' |
  'content' |
  'onlineBadge'
;

interface MapStateToProps {
  currentRoomId: string;
  user: IUser | null;
  room: Room | null;
  searchText: string;
  userRooms: {[key: string]: IRoomForUser} | null;
  problemDetail: IProblemDetail | null;
}

interface MapDispatchToProps {
  setCurrentRoomId: (currentRoomId: string) => SetCurrentRoomIdAction;
  setCurrentRoomName: (currentRoomName: string) => SetCurrentRoomNameAction;
  setSearchText: (searchText: string) => SetSearchTextAction;
  clearSelectContacts: () => ClearSelectContactsAction;
  fetchContactsRequest: () => FetchContactsRequestAction;
  createRoomAndFetchMessagesRequest: () => CreateRoomAndFetchMessagesRequestAction;
}

export interface RoomListProps {
  top?: number;
  left?: number;
  width?: number;
  enablePush?: boolean;
  enableSearch?: boolean;
  enableSearchResult?: boolean;
}

function Transition(props: SlideProps) {
  return <Slide direction="up" {...props} />;
}

class RoomListComponent extends React.Component<WithStyles<ClassNames> &
    MapStateToProps & MapDispatchToProps & RoomListProps, {}> {
  state = {
    contactListDialogOpen: false,
    accountDialogOpen: false,
    tabIndex: 0,
  };

  handleContactListClickOpen = () => {
    this.props.clearSelectContacts();
    this.props.fetchContactsRequest();
    this.setState({contactListDialogOpen: true});
  }

  handleContactListClose = () => {
    this.setState({contactListDialogOpen: false});
  }

  handleContactListOKClick = (e: React.MouseEvent<HTMLElement>) => {
    this.props.createRoomAndFetchMessagesRequest();
    this.handleContactListClose();
  }

  handleSearchInputOpen = () => {
    this.setState({accountDialogOpen: true});
  }

  handleSearchInputClose = () => {
    this.setState({accountDialogOpen: false});
  }

  handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setSearchText(e.target.value);
  }

  handleItemClick(roomId: string, roomName: string) {
    this.props.setCurrentRoomId(roomId);
    this.props.setCurrentRoomName(roomName);
    if (this.props.enablePush === true) {
      store.dispatch(push('/messages/' + roomId));
    }
  }

  handleTabChange = (e: {}, index: number) => {
    this.setState({tabIndex: index});
  }

  handleTabChangeIndex = (index: number) => {
    this.setState({tabIndex: index});
  }

  onEscapeKeyDown = (e: {}) => {
    window.console.log(e);
  }

  onEnter = (e: {}) => {
    window.console.log(e);
  }

  onEntered = (e: {}) => {
    window.console.log(e);
  }

  render() {
    const {
      theme, classes, top, left, width, enableSearch, enableSearchResult,
      currentRoomId, user, searchText, userRooms, problemDetail
    } = this.props;

    const appBartopStyle = top !== undefined ? {marginTop: top} : {};
    const appBarleftStyle = left !== undefined ? {marginLeft: left} : {};
    const appBarwidthStyle = width !== undefined ? {width: width - 1} : {};
    const appBarHeightStyle = enableSearch === true ? {
      height: APP_BAR_HEIGHT + SEARCH_FORM_HEIGHT + TAB_HEIGHT + 10
    } : {
      height: APP_BAR_HEIGHT + TAB_HEIGHT + 10
    };
    const appBarStyle = Object.assign(appBartopStyle, appBarleftStyle, appBarwidthStyle, appBarHeightStyle);

    const contentStyle = enableSearch === true ? {
      marginTop: APP_BAR_HEIGHT + SEARCH_FORM_HEIGHT + TAB_HEIGHT + 10 + 8
    } : {
      marginTop: APP_BAR_HEIGHT + TAB_HEIGHT + 10 + 8
    };

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={appBarStyle}
        >
          <Toolbar className={classes.toolbar} disableGutters={true}>
            <IconButton color="primary" className={classes.toolbarButton}>
              <AccountCircleIcon className={classes.toolbarIcon} />
            </IconButton>
            <Typography variant="subheading" className={classes.typography}>
              トーク
            </Typography>
            {user !== null ?
              <div>
                <IconButton
                  color="primary"
                  onClick={this.handleContactListClickOpen}
                  className={classes.toolbarButton}
                >
                  <AddIcon className={classes.toolbarIcon} />
                </IconButton>
                <Dialog
                  className={classes.dialog}
                  fullScreen={true}
                  transition={Transition}
                  keepMounted={true}
                  open={this.state.contactListDialogOpen}
                  onClose={this.handleContactListClose}
                  aria-labelledby="responsive-dialog-title"
                  style={width !== undefined ? {width: width} : {}}
                >
                  <DialogContent>
                    <ContactList
                      enableSearch={true}
                      handleClose={this.handleContactListClose}
                      handleOK={this.handleContactListOKClick}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            : null}
          </Toolbar>
          {enableSearch === true
            ?
              <div className={classes.searchTextWrap}>
                <SearchText fullWidth={true} placeholder="全てのメッセージから検索" />
              </div>
            : null
          }
          {enableSearchResult === true && searchText !== '' ? <SearchResultTab /> :
            <Tabs
              className={classes.tabs}
              value={this.state.tabIndex}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth={true}
              centered={true}
            >
              <Tab label="全て" className={classes.tab} />
              <Tab label="未読" className={classes.tab} />
              <Tab label="オンライン中" className={classes.tab} style={{paddingLeft: 0, paddingRight: 0}} />
            </Tabs>
          }
        </AppBar>
        <div className={classes.content} style={contentStyle}>
          {enableSearchResult === true && searchText !== '' ? <SearchResultView /> :
            <SwipeableViews
              axis="x"
              index={this.state.tabIndex}
              onChangeIndex={this.handleTabChangeIndex}
            >
              <TabContainer key="roomlist-tab-container-1" dir="ltr">
                {problemDetail !== null ? <div>{problemDetail.title}</div> : null}
                {userRooms ? Object.keys(userRooms).map((key: string) => (
                  <ListItem
                    key={userRooms[key].roomId}
                    button={true}
                    onClick={() => this.handleItemClick(userRooms[key].roomId, userRooms[key].name)}
                    style={currentRoomId === userRooms[key].roomId ?
                      {backgroundColor: theme!.palette.action.hover} : {}}
                  >
                    {userRooms[key].ruUnreadCount > 0
                      ?
                        <Badge color="secondary" badgeContent={userRooms[key].ruUnreadCount}>
                          <SwagAvatar user={userRooms[key]} />
                        </Badge>
                      : <SwagAvatar user={userRooms[key]} />
                    }
                    {false ? <Badge badgeContent="" className={classes.onlineBadge}><p /></Badge> : null}

                    <ListItemText primary={userRooms[key].name} secondary={userRooms[key].lastMessage} />
                    <Typography variant="caption" color="textSecondary">
                      {userRooms[key].lastMessageUpdated ? dateHumanize(userRooms[key].lastMessageUpdated) : ''}
                    </Typography>
                  </ListItem>
                )) : null }
              </TabContainer>
              <TabContainer key="roomlist-tab-container-2" dir="ltr">
              {problemDetail !== null ? <div>{problemDetail.title}</div> : null}
                {userRooms ? Object.keys(userRooms).map((key: string) => {
                  if (userRooms[key].ruUnreadCount > 0) {
                    return (
                      <ListItem
                        key={userRooms[key].roomId}
                        button={true}
                        onClick={() => this.handleItemClick(userRooms[key].roomId, userRooms[key].name)}
                        style={currentRoomId === userRooms[key].roomId ?
                          {backgroundColor: theme!.palette.action.hover} : {}}
                      >
                        {userRooms[key].ruUnreadCount > 0
                          ?
                            <Badge color="secondary" badgeContent={userRooms[key].ruUnreadCount}>
                              <SwagAvatar user={userRooms[key]} />
                            </Badge>
                          : <SwagAvatar user={userRooms[key]} />
                        }
                        {false ? <Badge badgeContent="" className={classes.onlineBadge}><p /></Badge> : null}

                        <ListItemText primary={userRooms[key].name} secondary={userRooms[key].lastMessage} />
                        <Typography variant="caption" color="textSecondary">
                          {userRooms[key].lastMessageUpdated ? dateHumanize(userRooms[key].lastMessageUpdated) : ''}
                        </Typography>
                      </ListItem>
                    );
                  } else {
                    return null;
                  }
                }) : null }
              </TabContainer>
              <TabContainer key="roomlist-tab-container-3" dir="ltr">
                <p>オンライン中</p>
              </TabContainer>
            </SwipeableViews>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: RoomListProps) => {
  return {
    currentRoomId: state.client.currentRoomId,
    user: state.user.user,
    room: state.room.room,
    searchText: state.message.searchText,
    userRooms: state.user.userRooms,
    problemDetail: state.user.problemDetail,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ClientActions & MessageActions>, ownProps: RoomListProps) => {
  return {
    setCurrentRoomId: (currentRoomId: string) => dispatch(setCurrentRoomIdActionCreator(currentRoomId)),
    setCurrentRoomName: (currentRoomName: string) => dispatch(setCurrentRoomNameActionCreator(currentRoomName)),
    setSearchText: (searchText: string) => dispatch(setSearchTextActionCreator(searchText)),
    clearSelectContacts: () => dispatch(clearSelectContactsActionCreator()),
    fetchContactsRequest: () => dispatch(fetchContactsRequestActionCreator()),
    createRoomAndFetchMessagesRequest: () => dispatch(createRoomAndFetchMessagesRequestActionCreator()),
  };
};

export const RoomList = connect<MapStateToProps, MapDispatchToProps, RoomListProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(RoomListComponent));
