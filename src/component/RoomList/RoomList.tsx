import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import SwipeableViews from 'react-swipeable-views';
import Tabs, { Tab } from 'material-ui/Tabs';
import {
  IRoomForUser,
  dateHumanize,
  store,
  State,
  ClientActions,
  setCurrentRoomIdActionCreator,
  SetCurrentRoomIdAction,
  setCurrentRoomNameActionCreator,
  SetCurrentRoomNameAction,
  setSearchTextActionCreator,
  SetSearchTextAction,
  MessageActions,
} from 'swagchat-sdk';
import { SearchText } from '../Search/SearchText';
import { SearchResultTab } from '../Search/SearchResultTab';
import { SearchResultView } from '../Search/SearchResultView';
import { TabContainer } from '../TabContainer';
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
  return {
    root: {
      width: '100%',
      backgroundColor: theme.palette.common.white,
    },
    appBar: {
      left: 0,
      background: 'white',
      borderBottom: '1px solid ' + BORDER_COLOR,
      backgroundColor: theme.palette.common.white,
    },
    toolbar: {
      minHeight: APP_BAR_HEIGHT,
      justifyContent: 'center' as justifyContentType,
      paddingLeft: 10,
      backgroundColor: theme.palette.common.white,
    },
    typography: {
      flex: 1,
      textAlign: 'center',
      backgroundColor: 'white',
    },
    searchFormControl: {
      width: '100%',
      padding: 5,
      height: SEARCH_FORM_HEIGHT,
    },
    textFieldRoot: {
      padding: 0,
      'label + &': {
        marginTop: theme.spacing.unit * 3,
      },
    },
    textFieldInput: {
      borderRadius: 2,
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 12,
      padding: '10px 12px',
      width: 'calc(100% - 24px)',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    textFieldFormLabel: {
      backgroundColor: theme.palette.common.white,
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
    icon: {
      width: ICON_SIZE,
      height: ICON_SIZE,
    },
  };
};

type ClassNames = 
  'root' |
  'appBar' |
  'toolbar' |
  'typography' |
  'tabs' |
  'tab' |
  'searchFormControl' |
  'textFieldRoot' |
  'textFieldInput' |
  'textFieldFormLabel' |
  'content' |
  'onlineBadge' |
  'icon'
;

interface MapStateToProps {
  searchText: string;
  userRooms: {[key: string]: IRoomForUser} | null;
}

interface MapDispatchToProps {
  setCurrentRoomId: (currentRoomId: string) => SetCurrentRoomIdAction;
  setCurrentRoomName: (currentRoomName: string) => SetCurrentRoomNameAction;
  setSearchText: (searchText: string) => SetSearchTextAction;
}

export interface RoomListProps {
  top?: number;
  left?: number;
  width?: number;
  enablePush?: boolean;
  enableSearch?: boolean;
}

class RoomListComponent extends React.Component<WithStyles<ClassNames> &
    MapStateToProps & MapDispatchToProps & RoomListProps, {}> {
  state = {
    accountDialogOpen: false,
    tabIndex: 0,
  };

  handleSearchInputOpen = () => {
    this.setState({accountDialogOpen: true});
  }

  handleSearchInputClose = () => {
    this.setState({accountDialogOpen: false});
  }

  handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    // this.setState({searchText: e.target.value});
    this.props.setSearchText(e.target.value);
    // this.handleSearchInputOpen();
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
    const { classes, userRooms, top, left, width, enableSearch, searchText } = this.props;

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
            <Typography variant="subheading" className={classes.typography}>
              トーク
            </Typography>
            <IconButton
              color="primary"
            >
              <AddIcon className={classes.icon} />
            </IconButton>
          </Toolbar>
          {enableSearch === true ? <SearchText /> : null}
          {searchText !== '' ? <SearchResultTab /> :
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
          {searchText !== '' ? <SearchResultView /> :
            <SwipeableViews
              axis="x"
              index={this.state.tabIndex}
              onChangeIndex={this.handleTabChangeIndex}
            >
              <TabContainer dir="ltr">
                {userRooms ? Object.keys(userRooms).map((key: string) => (
                  <ListItem
                    key={userRooms[key].roomId}
                    button={true}
                    onClick={() => this.handleItemClick(userRooms[key].roomId, userRooms[key].name)}
                  >
                    {userRooms[key].ruUnreadCount > 0 ?
                      <Badge color="secondary" badgeContent={userRooms[key].ruUnreadCount}>
                        <Avatar src={userRooms[key].pictureUrl} />
                      </Badge>
                    : <Avatar src={userRooms[key].pictureUrl} />}
                    {false ? <Badge badgeContent="" className={classes.onlineBadge}><p /></Badge> : null}

                    <ListItemText primary={userRooms[key].name} secondary={userRooms[key].lastMessage} />
                    <Typography variant="caption" color="textSecondary">
                      {userRooms[key].lastMessageUpdated ? dateHumanize(userRooms[key].lastMessageUpdated) : ''}
                    </Typography>
                  </ListItem>
                )) : null }
              </TabContainer>
              <TabContainer dir="ltr">
                <p>未読</p>
              </TabContainer>
              <TabContainer dir="ltr">
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
    searchText: state.message.searchText,
    userRooms: state.user.userRooms,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ClientActions & MessageActions>, ownProps: RoomListProps) => {
  return {
    setCurrentRoomId: (currentRoomId: string) => dispatch(setCurrentRoomIdActionCreator(currentRoomId)),
    setCurrentRoomName: (currentRoomName: string) => dispatch(setCurrentRoomNameActionCreator(currentRoomName)),
    setSearchText: (searchText: string) => dispatch(setSearchTextActionCreator(searchText)),
  };
};

export const RoomList = connect<MapStateToProps, MapDispatchToProps, RoomListProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(RoomListComponent));
