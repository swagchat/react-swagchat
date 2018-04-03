import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Dialog, { DialogContent, DialogActions, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import CameraAltIcon from 'material-ui-icons/CameraAlt';
import {
  State, IUser, RoomActions,
  uploadAssetAndUpdateUserRequestActionCreator, UploadAssetAndUpdateRoomRequestAction,
} from 'swagchat-sdk';
import { SwagAvatar } from '../SwagAvatar';
import { X_LARGE_ABATAR_SIZE, X_LARGE_ABATAR_FONT_SIZE, BORDER_RADIUS, BG_TRANSPARENT_1 } from '../../setting';

const styles = (theme: Theme) => {
  theme!.overrides!.MuiDialogContent = {
    root: {
      padding: 0,
    },
  };
  theme!.overrides!.MuiDialogActions = {
    action: {
      width: '50%',
    },
  };
  theme!.overrides!.MuiInput = {
    input: {
      textAlign: 'center',
    },
  };
  return {
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
    avatar: {
      width: X_LARGE_ABATAR_SIZE,
      height: X_LARGE_ABATAR_SIZE,
      fontSize: X_LARGE_ABATAR_FONT_SIZE,
      margin: theme.spacing.unit + 'px auto',
      cursor: 'pointer',
    },
    cameraIcon: {
      position: 'absolute' as 'absolute',
      bottom: 120,
      right: 80,
      backgroundColor: BG_TRANSPARENT_1,
      border: '1px solid ' + BG_TRANSPARENT_1,
    },
    imageInput: {
      display: 'none',
    },
    button: {
      margin: '0 auto',
      color: theme.palette.common.white,
      display: 'block',
      border: '1px solid ' + BG_TRANSPARENT_1,
      borderRadius: BORDER_RADIUS,
    },
    okButton: {
      color: theme.palette.common.white,
    },
  };
};

type ClassNames = 
  'dialog' |
  'dialogTitle' |
  'dialogContent' |
  'dialogActions' |
  'avatar' |
  'cameraIcon' |
  'imageInput' |
  'button' |
  'okButton'
;

interface MapStateToProps {
  user: IUser | null;
}

interface MapDispatchToProps {
  uploadAssetAndUpdateUserRequest: (userName: string, file: Blob) => UploadAssetAndUpdateRoomRequestAction;
}

export interface ProfileEditButtonProps {
  className?: string;
  style?: Partial<React.CSSProperties>;
}

export interface ProfileEditButtonState {
  dialog: boolean;
  userName: string;
  userPictureUrl: string | undefined;
}

class ProfileEditButtonComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps &
      ProfileEditButtonProps, ProfileEditButtonState> {

  selectImage: File;
  confirmImageDOM: HTMLImageElement | null;
  inputFileDom: HTMLInputElement | null;

  constructor(props: WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps &
      // tslint:disable-next-line:align
      ProfileEditButtonProps, context: ProfileEditButtonState) {

    super(props, context);
    const { user } = this.props;

    if (user === null) {
      return;
    }

    this.state = {
      dialog: false,
      userName: this.props.user!.name,
      userPictureUrl: this.props.user!.pictureUrl,
    };
  }

  handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({dialog: true});
    e.stopPropagation();
  }

  handleClose = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({
      dialog: false,
      userName: this.props.user!.name,
      userPictureUrl: this.props.user!.pictureUrl,
    });
    e.stopPropagation();
  }

  handleAgree = (e: React.MouseEvent<HTMLElement>) => {
    this.props.uploadAssetAndUpdateUserRequest(this.state.userName, this.selectImage);
    this.setState({dialog: false});
    e.stopPropagation();
  }

  handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({userName: event.target.value});
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
          userPictureUrl: url,
        });
      };
    }.bind(this))(this.selectImage);
    reader.readAsDataURL(this.selectImage);
  }

  render() {
    const { classes, user, className, style } = this.props;

    if (user === null) {
      return null;
    }

    let editAvatarData = {
      pictureUrl: this.state.userPictureUrl,
      name: this.state.userName,
    };

    return (
      <div className={className} style={style}>
        <Button className={classes.button} color="primary" onClick={this.handleOpen}>
          プロフィールを編集
        </Button>
        <Dialog
          className={classes.dialog}
          open={this.state.dialog}
          onBackdropClick={this.handleClose}
          onEscapeKeyDown={this.handleClose}
        >
          <DialogTitle className={classes.dialogTitle} onClick={this.handleClose}>プロフィール編集</DialogTitle>
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
              value={this.state.userName}
              onChange={this.handleChangeText}
              margin="normal"
            />
          </DialogContent>
          <DialogActions className={classes.dialogActions} onClick={this.handleClose}>
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
    );
  }
}

const mapStateToProps = (state: State, ownProps: ProfileEditButtonProps) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RoomActions>, ownProps: ProfileEditButtonProps) => {
  return {
    uploadAssetAndUpdateUserRequest: (userName: string, file: File) =>
      dispatch(uploadAssetAndUpdateUserRequestActionCreator(userName, file)),
  };
};

export const ProfileEditButton = connect<MapStateToProps, MapDispatchToProps, ProfileEditButtonProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ProfileEditButtonComponent));
