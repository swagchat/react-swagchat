import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogContent, DialogActions, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import CameraAltIcon from 'material-ui-icons/CameraAlt';
import {
  State, IUser, Room, RoomActions,
  uploadAssetAndUpdateRoomRequestActionCreator, UploadAssetAndUpdateRoomRequestAction,
  generateRoomPictureUrl,
} from 'swagchat-sdk';
import { SwagAvatar } from '../SwagAvatar';
import { X_LARGE_ABATAR_SIZE, X_LARGE_ABATAR_FONT_SIZE } from '../../setting';

const styles = (theme: Theme) => {
  theme!.overrides!.MuiDialogActions = {
    action: {
      width: '50%',
    },
  };
  theme!.overrides!.MuiDialogContent = {
    root: {
      padding: 0,
    },
  };
  theme!.overrides!.MuiInput = {
    input: {
      textAlign: 'center',
    },
  };
  return {
    root: {
    },
    listItemIcon: {
      color: theme.palette.primary.main,
    },
    dialog: {
      minWidth: 260,
    },
    dialogTitle: {
      minWidth: 260,
      textAlign: 'center',
    },
    dialogContent: {
      margin: theme.spacing.unit,
    },
    dialogActions: {
      justifyContent: 'space-around' as 'space-around',
    },
    textField: {
    },
    avatar: {
      width: X_LARGE_ABATAR_SIZE,
      height: X_LARGE_ABATAR_SIZE,
      fontSize: X_LARGE_ABATAR_FONT_SIZE,
      margin: '20px auto',
    },
    cameraIcon: {
      position: 'absolute' as 'absolute',
      bottom: 128,
      right: 68,
    },
    imageInput: {
      display: 'none',
    },
  };
};

type ClassNames = 
  'root' |
  'listItemIcon' |
  'dialog' |
  'dialogTitle' |
  'dialogContent' |
  'dialogActions' |
  'textField' |
  'avatar' |
  'cameraIcon' |
  'imageInput'
;

interface MapStateToProps {
  room: Room | null;
  user: IUser | null;
  currentRoomName: string;
}

interface MapDispatchToProps {
  uploadAssetAndUpdateRoomRequest: (roomName: string, file: Blob) => UploadAssetAndUpdateRoomRequestAction;
}

export interface RoomEditListItemProps {
}

export interface RoomEditListItemState {
  dialog: boolean;
  roomName: string;
  roomPictureUrl: string;
}

class RoomEditListItemComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps &
      RoomEditListItemProps, RoomEditListItemState> {

  selectImage: File;
  confirmImageDOM: HTMLImageElement | null;
  inputFileDom: HTMLInputElement | null;

  constructor(props: WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps &
      // tslint:disable-next-line:align
      RoomEditListItemProps, context: RoomEditListItemState) {

    super(props, context);
    const { room, user } = this.props;

    if (room === null || user === null) {
      return;
    }

    this.state = {
      dialog: false,
      roomName: this.props.currentRoomName,
      roomPictureUrl: generateRoomPictureUrl(room, user.userId),
    };
  }

  handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({dialog: true});
    e.stopPropagation();
  }

  handleClose = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({
      dialog: false,
      roomName: this.props.currentRoomName,
      roomPictureUrl: generateRoomPictureUrl(this.props.room!, this.props.user!.userId),
    });
    e.stopPropagation();
  }

  handleAgree = (e: React.MouseEvent<HTMLElement>) => {
    this.props.uploadAssetAndUpdateRoomRequest(this.state.roomName, this.selectImage);
    this.setState({dialog: false});
    e.stopPropagation();
  }

  handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({roomName: event.target.value});
  }

  handleFileClick = () => {
    if (this.inputFileDom !== null && this.inputFileDom !== undefined) {
      this.inputFileDom.click();
    }
  }

  handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }

    this.selectImage = e.target.files[0];
    if (!this.selectImage.type.match('image.*')) {
      return;
    }

    const reader = new FileReader();
    const self = this;
    reader.onload = (function() {
      return function(ev: Event) {
        // tslint:disable-next-line:no-any
        const url = (ev.target as any).result;
        self.setState({
          roomPictureUrl: url,
        });
      };
    }.bind(this))(this.selectImage);
    reader.readAsDataURL(this.selectImage);
  }

  render() {
    const { classes, room, user, currentRoomName } = this.props;

    if (room === null || user === null) {
      return null;
    }

    let avatarData = {
      pictureUrl: generateRoomPictureUrl(room, user.userId),
      name: this.props.currentRoomName,
    };

    let editAvatarData = {
      pictureUrl: this.state.roomPictureUrl,
      name: this.state.roomName,
    };

    return (
      <ListItem className={classes.root} button={true} onClick={this.handleOpen}>
        <SwagAvatar className={classes.avatar} data={avatarData} />
        <ListItemText primary={currentRoomName} />
        <IconButton color="primary"><ModeEditIcon /></IconButton>
        <Dialog
          className={classes.dialog}
          open={this.state.dialog}
          onBackdropClick={this.handleClose}
          onEscapeKeyDown={this.handleClose}
        >
          <DialogTitle className={classes.dialogTitle} onClick={this.handleClose}>ルーム編集</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <SwagAvatar className={classes.avatar} data={editAvatarData} onClick={this.handleFileClick} />
            <IconButton
              className={classes.cameraIcon}
              color="primary"
              onClick={this.handleFileClick}
            >
              <CameraAltIcon />
            </IconButton>
            <input
              type="file"
              ref={(child) => this.inputFileDom = child}
              className={classes.imageInput}
              accept="image/*"
              onChange={this.handleChangeFile}
            />
            <TextField
              fullWidth={true}
              className={classes.textField}
              value={this.state.roomName}
              onChange={this.handleChangeText}
              margin="normal"
            />
          </DialogContent>
          <DialogActions className={classes.dialogActions} onClick={this.handleClose}>
            <Button fullWidth={true} variant="raised" onClick={this.handleClose} color="inherit">キャンセル</Button>
            <Button fullWidth={true} variant="raised" onClick={this.handleAgree} color="primary">OK</Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    );
  }
}

const mapStateToProps = (state: State, ownProps: RoomEditListItemProps) => {
  return {
    room: state.room.room,
    user: state.user.user,
    currentRoomName: state.room.currentRoomName,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RoomActions>, ownProps: RoomEditListItemProps) => {
  return {
    uploadAssetAndUpdateRoomRequest: (roomName: string, file: File) =>
      dispatch(uploadAssetAndUpdateRoomRequestActionCreator(roomName, file)),
  };
};

export const RoomEditListItem = connect<MapStateToProps, MapDispatchToProps, RoomEditListItemProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(RoomEditListItemComponent));
