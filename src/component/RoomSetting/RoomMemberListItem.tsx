import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import RemoveIcon from 'material-ui-icons/Remove';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import { SwagAvatar } from '../SwagAvatar';
import {
  State, store, IUserForRoom, RoomActions,
  setProfileUserIdActionCreator, SetProfileUserIdAction,
  clearProfileUserActionCreator, ClearProfileUserAction,
  removeRoomUserRequestActionCreator, RemoveRoomUserRequestAction,
} from 'swagchat-sdk';
import { BIG_ABATAR_SIZE } from '../../setting';

const styles = (theme: Theme) => {
  theme!.overrides!.MuiDialogActions = {
    action: {
      width: '50%',
    },
  };
  return {
    root: {
    },
    listItemIcon: {
      color: theme.palette.primary.main,
    },
    dialogContent: {
      margin: '0 auto 20px',
    },
    dialogActions: {
      justifyContent: 'space-around' as 'space-around',
    },
    avatar: {
      width: BIG_ABATAR_SIZE,
      height: BIG_ABATAR_SIZE,
    },
  };
};

type ClassNames = 
  'root' |
  'listItemIcon' |
  'dialogContent' |
  'dialogActions' |
  'avatar'
;

interface MapStateToProps {
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
    this.props.clearProfileUser();
    this.props.setProfileUserId(this.props.userForRoom.userId);
    store.dispatch(push('/profile/' + this.props.userForRoom.userId));
    e.stopPropagation();
  }

  render() {
    const { classes, enableRemoveIcon, userForRoom } = this.props;

    return (
      <ListItem
        button={true}
        disableGutters={enableRemoveIcon}
        onClick={(e: React.MouseEvent<HTMLElement>) => this.handleProfileClick(e)}
      >
        {enableRemoveIcon ?
          <IconButton
            className={classes.listItemIcon}
            onClick={(e: React.MouseEvent<HTMLElement>) => this.handleOpen(e)}
          >
            <RemoveIcon />
          </IconButton>
        : null
        }
        <Dialog
          open={this.state.dialog}
          onBackdropClick={(e: React.MouseEvent<HTMLElement>) => this.handleClose(e)}
          onEscapeKeyDown={(e: React.MouseEvent<HTMLElement>) => this.handleClose(e)}
        >
          <DialogTitle
            onClick={(e: React.MouseEvent<HTMLElement>) => this.handleClose(e)}
          >{userForRoom.name}をこのルームから外しますか？
          </DialogTitle>
          <DialogContent
            className={classes.dialogContent}
            onClick={(e: React.MouseEvent<HTMLElement>) => this.handleClose(e)}
          >
            <SwagAvatar className={classes.avatar} data={userForRoom} />
          </DialogContent>
          <DialogActions
            className={classes.dialogActions}
            onClick={(e: React.MouseEvent<HTMLElement>) => this.handleClose(e)}
          >
            <Button
              fullWidth={true}
              variant="raised"
              onClick={(e: React.MouseEvent<HTMLElement>) => this.handleClose(e)}
              color="inherit"
            >
              キャンセル
            </Button>
            <Button
              fullWidth={true}
              variant="raised"
              onClick={(e: React.MouseEvent<HTMLElement>) => this.handleAgree(e)}
              color="primary"
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <SwagAvatar data={userForRoom} />
        <ListItemText primary={userForRoom.name} />
        <IconButton
          onClick={(e: React.MouseEvent<HTMLElement>) => this.handleProfileClick(e)}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </ListItem>
    );
  }
}

const mapStateToProps = (state: State, ownProps: Props) => {
  return {
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
