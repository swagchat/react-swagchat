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
  State, IUser, routerHistory,
  RoomActions,
} from 'swagchat-sdk';
import { SwagAvatar } from '../SwagAvatar';
import { ProfileEditButton } from './ProfileEditButton';
import {
  MIN_WIDTH, ICON_SIZE, BORDER_RADIUS, X_LARGE_ABATAR_SIZE, X_LARGE_ABATAR_FONT_SIZE,
} from '../../setting';

const styles = (theme: Theme) => ({
  root: {
    minWidth: MIN_WIDTH,
  },
  appBar: {
    width: '100%',
    left: 0,
    background: 'transparent',
  },
  toolbar: {
    justifyContent: 'left' as 'space-around',
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
    position: 'relative' as 'relative',
    overflowY: 'scroll' as 'scroll',
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
    width: X_LARGE_ABATAR_SIZE,
    height: X_LARGE_ABATAR_SIZE,
    fontSize: X_LARGE_ABATAR_FONT_SIZE,
    margin: theme.spacing.unit * 3 + 'px auto',
  },
  profileName: {
    fontSize: '2em',
    flex: 1,
    textAlign: 'center',
    color: theme.palette.common.white,
    wordWrap: 'break-word',
    margin: theme.spacing.unit * 3 + 'px auto',
  },
  listItemIcon: {
    color: theme.palette.primary.main,
  },
  iconButton: {
    position: 'relative' as 'relative',
    right: '-12px',
  },
  button: {
    margin: '0 auto',
    color: theme.palette.common.white,
    display: 'block',
    border: '1px solid ' + theme.palette.common.white,
    borderRadius: BORDER_RADIUS,
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
  'iconButton' |
  'button'
;

interface MapStateToProps {
  user: IUser | null;
}

interface MapDispatchToProps {
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

  handleEditProfile = () => {
    window.console.log('handleEditProfile');
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
                <IconButton color="primary" className={classes.toolbarButton} onClick={handleClose}>
                  <CloseIcon className={classes.toolbarIcon} />
                </IconButton>
              :
                <IconButton color="primary" className={classes.toolbarButton} onClick={this.handleBackClick}>
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
              <ProfileEditButton />
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
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RoomActions>, ownProps: AccountProps) => {
  return {};
};

export const Account = connect<MapStateToProps, MapDispatchToProps, AccountProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(AccountComponent));
