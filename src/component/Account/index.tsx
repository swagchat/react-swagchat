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
  MIN_WIDTH, BORDER_RADIUS, BG_COLOR_1, X_LARGE_ABATAR_SIZE, X_LARGE_ABATAR_FONT_SIZE, BG_TRANSPARENT_1
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
    border: '1px solid ' + BG_TRANSPARENT_1,
    borderRadius: BORDER_RADIUS,
  },
  profileEditButton: {
    margin: theme.spacing.unit * 2,
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
  'profileName' |
  'listItemIcon' |
  'iconButton' |
  'button' |
  'profileEditButton'
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
        <div>
          <div className={classes.profileBackground}>
            <div className={classes.profileWrap}>
              <SwagAvatar className={classes.profileAvatar} data={user} />
              <Typography variant="subheading" className={classes.profileName}>
                {user.name}
              </Typography>
              <ProfileEditButton className={classes.profileEditButton} />
            </div>
          </div>
          <List>
            <ListItem key="room-setting-notifications" button={true}>
              <ListItemIcon className={classes.listItemIcon}><NotificationsIcon /></ListItemIcon>
              <ListItemText primary="全ての通知をオフにする" />
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
