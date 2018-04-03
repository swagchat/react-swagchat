import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import RemoveIcon from 'material-ui-icons/Remove';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import { SwagAvatar } from '../SwagAvatar';
import {
  State, store, IUserForRoom, IUser, RoomActions,
  setProfileUserIdActionCreator, SetProfileUserIdAction,
  clearProfileUserActionCreator, ClearProfileUserAction,
  removeRoomUserRequestActionCreator, RemoveRoomUserRequestAction,
} from 'swagchat-sdk';
import { LARGE_ABATAR_SIZE } from '../../setting';

const styles = (theme: Theme) => {
  theme!.overrides!.MuiDialogContent = {
    root: {
      margin: theme.spacing.unit * 2 + 'px auto',
    },
  };
  return {
    avatar: {
      width: LARGE_ABATAR_SIZE,
      height: LARGE_ABATAR_SIZE,
    },
    okButton: {
      color: theme.palette.common.white,
    },
  };
};

type ClassNames = 
  'avatar' |
  'okButton'
;

interface MapStateToProps {
  user: IUser | null;
}

interface MapDispatchToProps {
  setProfileUserId: (profileUserId: string) => SetProfileUserIdAction;
  clearProfileUser: () => ClearProfileUserAction;
  removeRoomUserRequest: (userIds: string[]) => RemoveRoomUserRequestAction;
}

export interface Props {
  enableRemoveIcon: boolean;
  userForRoom: IUserForRoom;
}

class RoomMemberListItemComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & Props, {}> {
  state = {
    dialog: false,
  };

  handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({dialog: true});
    e.stopPropagation();
  }

  handleClose = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({dialog: false});
    e.stopPropagation();
  }

  handleAgree = (e: React.MouseEvent<HTMLElement>) => {
    this.props.removeRoomUserRequest([this.props.userForRoom.userId]);
    this.setState({dialog: false});
    e.stopPropagation();
  }

  handleProfileClick = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props.user!.userId === this.props.userForRoom.userId) {
      store.dispatch(push('/account/'));
    } else {
      this.props.clearProfileUser();
      this.props.setProfileUserId(this.props.userForRoom.userId);
      store.dispatch(push('/profile/' + this.props.userForRoom.userId));
    }
    e.stopPropagation();
  }

  render() {
    const { classes, enableRemoveIcon, user, userForRoom } = this.props;

    return (
      <ListItem button={true} disableGutters={enableRemoveIcon} onClick={this.handleProfileClick}>
        {enableRemoveIcon
          ? 
            <div>
              {user!.userId !== userForRoom.userId
                ? <IconButton onClick={this.handleOpen}><RemoveIcon color="primary" /></IconButton>
                : <IconButton />
              }
              <Dialog open={this.state.dialog} onBackdropClick={this.handleClose} onEscapeKeyDown={this.handleClose}>
                <DialogTitle onClick={this.handleClose}>{userForRoom.name}をこのルームから外しますか？</DialogTitle>
                <DialogContent onClick={this.handleClose}>
                  <SwagAvatar className={classes.avatar} data={userForRoom} />
                </DialogContent>
                <DialogActions onClick={this.handleClose}>
                  <Button fullWidth={true} variant="raised" onClick={this.handleClose} color="inherit">キャンセル</Button>
                  <Button
                    fullWidth={true}
                    variant="raised"
                    onClick={this.handleAgree}
                    color="primary"
                    className={classes.okButton}
                  >
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          : null
        }
        <SwagAvatar data={userForRoom} />
        <ListItemText primary={userForRoom.name} />
        <IconButton onClick={this.handleProfileClick}><KeyboardArrowRightIcon /></IconButton>
      </ListItem>
    );
  }
}

const mapStateToProps = (state: State, ownProps: Props) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RoomActions>, ownProps: Props) => {
  return {
    setProfileUserId: (profileUserId: string) => dispatch(setProfileUserIdActionCreator(profileUserId)),
    clearProfileUser: () => dispatch(clearProfileUserActionCreator()),
    removeRoomUserRequest: (userIds: string[]) => dispatch(removeRoomUserRequestActionCreator(userIds)),
  };
};

export const RoomMemberListItem = connect<MapStateToProps, MapDispatchToProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(RoomMemberListItemComponent));
