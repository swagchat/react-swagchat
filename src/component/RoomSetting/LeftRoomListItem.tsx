import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import {
  State, IUser, Room, RoomType, RoomActions,
  removeRoomUserRequestActionCreator, RemoveRoomUserRequestAction,
} from 'swagchat-sdk';

const styles = (theme: Theme) => {
  return {
    okButton: {
      color: theme.palette.common.white,
    },
  };
};

type ClassNames = 
  'okButton'
;

interface MapStateToProps {
  room: Room | null;
  user: IUser | null;
}

interface MapDispatchToProps {
  removeRoomUserRequest: (userIds: string[]) => RemoveRoomUserRequestAction;
}

export interface LeftRoomListItemProps {
}

class LeftRoomListItemComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & LeftRoomListItemProps, {}> {
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
    this.props.removeRoomUserRequest([this.props.user!.userId]);
    this.setState({dialog: false});
    e.stopPropagation();
  }

  render() {
    const { classes, room } = this.props;

    if (room === null) {
      return null;
    }

    return (
      <ListItem button={true} disableGutters={true} onClick={this.handleOpen}>
        <IconButton onClick={this.handleOpen}><ExitToAppIcon color="primary" /></IconButton>
        <ListItemText primary={room.type === RoomType.ONE_ON_ONE ? 'このダイレクトメールを削除する' : 'このルームから退出する'} />
        <Dialog open={this.state.dialog} onBackdropClick={this.handleClose} onEscapeKeyDown={this.handleClose}>
          <DialogTitle onClick={this.handleClose}>
            {room.type === RoomType.ONE_ON_ONE ? 'このダイレクトメールを削除しますか？（元には戻せません！）' : 'このルームから退出しますか？'}
          </DialogTitle>
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
      </ListItem>
    );
  }
}

const mapStateToProps = (state: State, ownProps: LeftRoomListItemProps) => {
  return {
    room: state.room.room,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RoomActions>, ownProps: LeftRoomListItemProps) => {
  return {
    removeRoomUserRequest: (userIds: string[]) => dispatch(removeRoomUserRequestActionCreator(userIds)),
  };
};

export const LeftRoomListItem = connect<MapStateToProps, MapDispatchToProps, LeftRoomListItemProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(LeftRoomListItemComponent));
