import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import NotificationsIcon from 'material-ui-icons/Notifications';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import { LinearProgress } from 'material-ui/Progress';
import {
  State, Client, IUser, Room, routerHistory,
  fetchRoomRequestActionCreator, FetchRoomRequestAction,
  fetchProfileUserRequestActionCreator, FetchProfileUserRequestAction,
  RoomActions,
} from 'swagchat-sdk';
import { SwagAvatar } from '../SwagAvatar';
import { UserBlockListItem } from './UserBlockListItem';
import {
  MIN_WIDTH,
  ICON_SIZE,
  APP_BAR_HEIGHT,
  BORDER_RADIUS,
} from '../../setting';

type positionType = 'fixed';
type justifyContentType = 'space-around';
type overflowYType = 'scroll';

const styles = (theme: Theme) => ({
  root: {
    minWidth: MIN_WIDTH,
  },
  appBar: {
    width: '100%',
    height: APP_BAR_HEIGHT,
    left: 0,
  },
  toolbar: {
    minHeight: APP_BAR_HEIGHT,
    justifyContent: 'left' as justifyContentType,
    // paddingLeft: 10,
  },
  toolbarButton: {
    width: 40,
    height: 40,
  },
  toolbarIcon: {
    width: ICON_SIZE,
    margin: '0 5px',
    color: theme.palette.common.white,
  },
  content: {
    position: 'relative' as positionType,
    overflowY: 'scroll' as overflowYType,
  },
  profileBackground: {
    background: 'linear-gradient(to top, #00c6ff, #0072ff)',
    paddingTop: 1,
    paddingBottom: 10,
  },
  profileWrap: {
    margin: '40px 20px 10px',
    borderRadius: BORDER_RADIUS,
  },
  profileAvatar: {
    width: 120,
    height: 120,
    margin: '20px auto',
  },
  profileName: {
    fontSize: '2em',
    flex: 1,
    textAlign: 'center',
    color: theme.palette.common.white,
  },
  listItemIcon: {
    color: theme.palette.primary.main,
  },
  iconButton: {
    position: 'relative' as positionType,
    right: '-12px',
  },
});

type ClassNames = 
  'root' |
  'appBar' |
  'toolbar' |
  'toolbarButton' |
  'toolbarIcon' |
  'typography' |
  'content' |
  'profileBackground' |
  'profileWrap' |
  'profileAvatar' |
  'profileName' |
  'listItemIcon' |
  'iconButton'
;

interface MapStateToProps {
  client: Client | null;
  profileUserId: string;
  room: Room | null;
  profileUser: IUser | null;
}

interface MapDispatchToProps {
  fetchRoomRequest: (roomId: string) => FetchRoomRequestAction;
  fetchProfileUserRequest: (userId: string) => FetchProfileUserRequestAction;
}

export interface ProfileProps {
  width?: number;
  top?: number;
  left?: number;
  right?: number;
}

class ProfileComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & ProfileProps, {}> {
  componentDidMount() {
    if (this.props.client !== null && this.props.profileUser === null && this.props.profileUserId !== '') {
      this.props.fetchProfileUserRequest(this.props.profileUserId);
    }
  }

  componentDidUpdate(prevProps: MapStateToProps, prevState: {}) {
    if (this.props.client !== null && this.props.profileUser === null && this.props.profileUserId !== '') {
      this.props.fetchProfileUserRequest(this.props.profileUserId);
    }
  }

  handleBackClick = () => {
    routerHistory.goBack();
  }

  render() {
    const {
      classes, width, top, left, right,
      profileUser,
    } = this.props;

    if (profileUser === null) {
      return <LinearProgress />;
    }

    const leftVar = left !== undefined ? left : 0; 
    const rightVar = right !== undefined ? right : 0; 

    const calcWidth = width !== undefined ? width + 'px' : '100%';
    const widthStyle = width !== undefined ? {width: width} : {};
    const topStyle = top !== undefined ? {marginTop: top} : {};
    const appBarleftRightStyle = left !== undefined || right !== undefined ?
      {
        background: 'rgba(255, 255, 255, 0)',
        marginLeft: leftVar,
        width: `calc(${calcWidth} - ${leftVar}px - ${rightVar}px)`
      } : {background: 'rgba(255, 255, 255, 0)'};
    const appBarStyle = Object.assign(widthStyle, topStyle, appBarleftRightStyle);

    return (
      <div className={classes.root} style={left ? {width: `calc(100% - ${left}px)`} : {}}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={appBarStyle}
        >
          <Toolbar className={classes.toolbar} disableGutters={true}>
            <IconButton
              className={classes.toolbarButton}
              color="primary"
              onClick={this.handleBackClick}
            >
              <KeyboardArrowLeftIcon className={classes.toolbarIcon} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <div className={classes.profileBackground}>
            <div className={classes.profileWrap}>
              <SwagAvatar className={classes.profileAvatar} data={profileUser} />
              <Typography variant="subheading" className={classes.profileName}>
                {profileUser.name}
              </Typography>
            </div>
          </div>
          <List>
            <ListItem key="room-setting-notifications" button={true}>
              <ListItemIcon className={classes.listItemIcon}><NotificationsIcon /></ListItemIcon>
              <ListItemText primary="通知をオフにする" />
            </ListItem>
            <UserBlockListItem />
          </List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: ProfileProps) => {
  return {
    client: state.client.client,
    profileUserId: state.client.profileUserId,
    room: state.room.room,
    profileUser: state.user.profileUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RoomActions>, ownProps: ProfileProps) => {
  return {
    fetchRoomRequest: (roomId: string) => dispatch(fetchRoomRequestActionCreator(roomId)),
    fetchProfileUserRequest: (userId: string) => dispatch(fetchProfileUserRequestActionCreator(userId)),
  };
};

export const Profile = connect<MapStateToProps, MapDispatchToProps, ProfileProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ProfileComponent));
