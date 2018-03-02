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
    background: 'rgba(255, 255, 255, 0)',
  },
  toolbar: {
    minHeight: APP_BAR_HEIGHT,
    justifyContent: 'left' as justifyContentType,
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
    fontSize: 60,
    margin: '20px auto',
  },
  profileName: {
    fontSize: '2em',
    flex: 1,
    textAlign: 'center',
    color: theme.palette.common.white,
    wordWrap: 'break-word',
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
  room: Room | null;
  user: IUser | null;
}

interface MapDispatchToProps {
  fetchRoomRequest: (roomId: string) => FetchRoomRequestAction;
  fetchProfileUserRequest: (userId: string) => FetchProfileUserRequestAction;
}

export interface AccountProps {
  isModal: boolean;
  handleClose?: (e: React.MouseEvent<HTMLElement>) => void;
}

class AccountComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & AccountProps, {}> {

  handleBackClick = () => {
    routerHistory.goBack();
  }

  render() {
    const {
      classes, isModal, handleClose,
      user,
    } = this.props;

    if (user === null) {
      return <LinearProgress />;
    }

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar} disableGutters={true}>
            {isModal
              ?
                <IconButton color="primary" onClick={handleClose}>
                  <CloseIcon className={classes.toolbarIcon} />
                </IconButton>
              :
                <IconButton className={classes.toolbarButton} color="primary" onClick={this.handleBackClick}>
                  <KeyboardArrowLeftIcon className={classes.toolbarIcon} />
                </IconButton>
            }
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <div className={classes.profileBackground}>
            <div className={classes.profileWrap}>
              <SwagAvatar className={classes.profileAvatar} data={user} />
              <Typography variant="subheading" className={classes.profileName}>
                {user.name}
              </Typography>
            </div>
          </div>
          <List>
            <ListItem key="room-setting-notifications" button={true}>
              <ListItemIcon className={classes.listItemIcon}><NotificationsIcon /></ListItemIcon>
              <ListItemText primary="通知をオフにする" />
            </ListItem>
          </List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: AccountProps) => {
  return {
    client: state.client.client,
    room: state.room.room,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RoomActions>, ownProps: AccountProps) => {
  return {
    fetchRoomRequest: (roomId: string) => dispatch(fetchRoomRequestActionCreator(roomId)),
    fetchProfileUserRequest: (userId: string) => dispatch(fetchProfileUserRequestActionCreator(userId)),
  };
};

export const Account = connect<MapStateToProps, MapDispatchToProps, AccountProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(AccountComponent));
