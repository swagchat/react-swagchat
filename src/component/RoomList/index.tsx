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
  State, store, IUser, Room, IRoomForUser, IProblemDetail,
  ClientActions, MessageActions,
  setCurrentRoomIdActionCreator, SetCurrentRoomIdAction,
  setCurrentRoomNameActionCreator, SetCurrentRoomNameAction,
  setSearchTextActionCreator, SetSearchTextAction,
  clearSelectContactsActionCreator, ClearSelectContactsAction,
  fetchContactsRequestActionCreator, FetchContactsRequestAction,
  createRoomAndFetchMessagesRequestActionCreator, CreateRoomAndFetchMessagesRequestAction,
  dateHumanize,
} from 'swagchat-sdk';
import { SearchText } from '../Search/SearchText';
import { SearchResultTab } from '../Search/SearchResultTab';
import { SearchResultView } from '../Search/SearchResultView';
import { TabContainer } from '../TabContainer';
import { ContactList } from '../ContactList';
import { SwagAvatar } from '../SwagAvatar';
import { Account } from '../Account';
import {
  APP_BAR_HEIGHT, SEARCH_FORM_HEIGHT, TAB_HEIGHT, ONLINE_BADGE_COLOR,
  ONLINE_BADGE_SIZE,
} from '../../setting';

const styles = (theme: Theme) => {
  theme.overrides!.MuiDialogContent = {
    root: {
      padding: 0,
      '&:first-child': {
        paddingTop: 0,
      },
    },
  };
  return {
    typography: {
      flex: 1,
      textAlign: 'center',
    },
    onlineBadge: {
      top: '46px',
      left: '48px',
      borderRadius: '50%',
      height: ONLINE_BADGE_SIZE,
      width: ONLINE_BADGE_SIZE,
      backgroundColor: ONLINE_BADGE_COLOR,
      position: 'absolute' as 'absolute',
    },
  };
};

type ClassNames = 
  'typography' |
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
    accountDialogOpen: false,
    contactListDialogOpen: false,
    tabIndex: 0,
  };

  componentDidUpdate(prevProps: MapStateToProps, prevState: {}) {
    if (this.props.currentRoomId !== prevProps.currentRoomId) {
      if (this.props.enablePush === true) {
        store.dispatch(push('/messages/' + this.props.currentRoomId));
      }
    }
  }

  handleAccountClickOpen = () => {
    this.setState({accountDialogOpen: true});
  }

  handleAccountClose = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({accountDialogOpen: false});
  }

  handleContactListClickOpen = () => {
    this.props.clearSelectContacts();
    this.props.fetchContactsRequest();
    this.setState({contactListDialogOpen: true});
  }

  handleContactListClose = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({contactListDialogOpen: false});
  }

  handleContactListOKClick = (e: React.MouseEvent<HTMLElement>) => {
    this.props.createRoomAndFetchMessagesRequest();
    this.handleContactListClose(e);
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
      marginTop: APP_BAR_HEIGHT + SEARCH_FORM_HEIGHT + TAB_HEIGHT + 10 + 8 + 8
    } : {
      marginTop: APP_BAR_HEIGHT + TAB_HEIGHT + 10 + 8
    };

    return (
      <div>
        <AppBar position="fixed" style={appBarStyle}>
          <Toolbar disableGutters={true}>
            <IconButton color="primary" onClick={this.handleAccountClickOpen}>
              <AccountCircleIcon />
            </IconButton>
            {user !== null ?
              <Dialog
                fullScreen={true}
                transition={Transition}
                keepMounted={true}
                open={this.state.accountDialogOpen}
                onClose={this.handleAccountClose}
                style={width !== undefined ? {width: width} : {}}
              >
                <DialogContent>
                  <Account isModal={true} handleClose={this.handleAccountClose} />
                </DialogContent>
              </Dialog>
            : null}
            <Typography variant="subheading" className={classes.typography}>トーク</Typography>
            <IconButton color="primary" onClick={this.handleContactListClickOpen}>
              <AddIcon />
            </IconButton>
            {user !== null ?
              <Dialog
                fullScreen={true}
                transition={Transition}
                keepMounted={true}
                open={this.state.contactListDialogOpen}
                onClose={this.handleContactListClose}
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
            : null}
          </Toolbar>
          {enableSearch === true
            ? <div><SearchText fullWidth={true} placeholder="全てのメッセージから検索" /></div>
            : null
          }
          {enableSearchResult === true && searchText !== '' ? <SearchResultTab /> :
            <Tabs
              value={this.state.tabIndex}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth={true}
              centered={true}
            >
              <Tab label="全て" />
              <Tab label="未読" />
              <Tab label="オンライン中" />
            </Tabs>
          }
        </AppBar>
        <div style={contentStyle}>
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
                          <SwagAvatar data={userRooms[key]} />
                        </Badge>
                      : <SwagAvatar data={userRooms[key]} />
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
                              <SwagAvatar data={userRooms[key]} />
                            </Badge>
                          : <SwagAvatar data={userRooms[key]} />
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
    currentRoomId: state.room.currentRoomId,
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
