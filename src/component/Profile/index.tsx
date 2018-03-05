import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
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
  MIN_WIDTH, BORDER_RADIUS, BG_COLOR_1, X_LARGE_ABATAR_SIZE, X_LARGE_ABATAR_FONT_SIZE
} from '../../setting';

const styles = (theme: Theme) => ({
  root: {
    minWidth: MIN_WIDTH,
  },
  appBar: {
    background: 'transparent',
    border: 'none',
  },
  toolbarIcon: {
    color: theme.palette.common.white,
  },
  profileBackground: {
    background: BG_COLOR_1,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  profileWrap: {
    margin: theme.spacing.unit * 4 + 'px ' + theme.spacing.unit * 2 + 'px ' + theme.spacing.unit + 'px',
    borderRadius: BORDER_RADIUS,
  },
  profileAvatar: {
    width: X_LARGE_ABATAR_SIZE,
    height: X_LARGE_ABATAR_SIZE,
    fontSize: X_LARGE_ABATAR_FONT_SIZE,
    margin: theme.spacing.unit + 'px auto',
  },
  profileName: {
    fontSize: '2em',
    flex: 1,
    textAlign: 'center',
    color: theme.palette.common.white,
    wordWrap: 'break-word',
  },
});

type ClassNames = 
  'root' |
  'appBar' |
  'toolbarIcon' |
  'typography' |
  'profileBackground' |
  'profileWrap' |
  'profileAvatar' |
  'profileName'
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
  isModal: boolean;
  handleClose?: (e: React.MouseEvent<HTMLElement>) => void;
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
      classes, width, top, left, right, isModal, handleClose,
      profileUser,
    } = this.props;

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
          <Toolbar disableGutters={true}>
            {isModal
              ?
                <IconButton color="primary" onClick={handleClose}>
                  <CloseIcon className={classes.toolbarIcon} />
                </IconButton>
              :
                <IconButton color="primary" onClick={this.handleBackClick}>
                  <KeyboardArrowLeftIcon className={classes.toolbarIcon} />
                </IconButton>
            }
          </Toolbar>
        </AppBar>
        {profileUser !== null
          ?
            <div>
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
                  <ListItemIcon><NotificationsIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="通知をオフにする" />
                </ListItem>
                <UserBlockListItem />
              </List>
            </div>
          : <LinearProgress />
        }
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: ProfileProps) => {
  return {
    client: state.client.client,
    profileUserId: state.user.profileUserId,
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
