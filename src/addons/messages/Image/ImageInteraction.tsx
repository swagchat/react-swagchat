import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import PhotoLibraryIcon from 'material-ui-icons/PhotoLibrary';
import CloseIcon from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import {
  IAddonMessageInteractionProps,
  State,
  IUser,
  Room,
  MessageActions,
  uploadAssetAndSendMessageRequestActionCreator,
  UploadAssetAndSendMessageRequestAction,
} from 'swagchat-sdk';

type positionType = 'absolute';

const styles = (theme: Theme) => ({
  confirmWrap: {
    height: '40%',
    background: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    zIndex: 10000,
    position: 'fixed' as positionType,
    bottom: 0,
    left: 0,
  },
  confirmImage: {
    margin: '48px 10px',
    height: '70%',
  },
  imageInput: {
    display: 'none',
  },
  closeIcon: {
    display: 'inline-block',
    position: 'absolute' as positionType,
    left: 0,
    color: theme.palette.common.white,
  },
  sendText: {
    display: 'inline-block',
    position: 'absolute' as positionType,
    right: 0,
    color: theme.palette.common.white,
    fontSize: '1em',
  },
});

type ClassNames = 
  'confirmWrap' |
  'top' |
  'bottom' |
  'confirmImage' |
  'imageInput' |
  'closeIcon' |
  'sendText'
;

interface MapStateToProps {
  user: IUser | null;
  room: Room | null;
  currentRoomId: string;
}

interface MapDispatchToProps {
  uploadAssetAndSendMessageRequest: (file: Blob) => UploadAssetAndSendMessageRequestAction;
}

export interface ImageInteractionProps {
  top?: number;
  left?: number;
  right?: number;
}

class ImageInteractionComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps &
    IAddonMessageInteractionProps & ImageInteractionProps, {}> {
  selectImage: File;
  confirmImageDOM: HTMLImageElement | null;
  inputFileDom: HTMLInputElement | null;

  state = {
    displayConfirmWrap: false,
  };

  handleIconClick = () => {
    if (this.inputFileDom !== null && this.inputFileDom !== undefined) {
      this.inputFileDom.click();
    }
  }

  onFileUploadChange(e: React.ChangeEvent<HTMLInputElement>) {
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
      return function(event: ProgressEvent) {
        // tslint:disable-next-line:no-any
        self.confirmImageDOM!.src = (event.target as any).result;
        self.setState({
          displayConfirmWrap: true,
        });
      };
    }.bind(this))(this.selectImage);
    reader.readAsDataURL(this.selectImage);
  }

  onConfirmClose = () => {
    this.setState({
      displayConfirmWrap: false,
    });
    this.inputFileDom!.value = '';
  }

  onFileUploadRequest = () => {
    this.confirmImageDOM!.src = '';
    this.inputFileDom!.value = '';
    this.setState({
      displayConfirmWrap: false,
    });
    this.props.uploadAssetAndSendMessageRequest(this.selectImage);
  }

  render() {
    const { classes, left, right } = this.props;
    // const topValue = top !== undefined ? top : 0;
    const leftValue = left !== undefined ? left : 0;
    const rightValue = right !== undefined ? right : 0;
    const confirmWrapWidthStyle = leftValue + rightValue > 0 ?
      {width: `calc(100% - ${leftValue}px - ${rightValue}px)`, marginLeft: left} : {width: '100%'};
    const confirmWrapDisplayStyle = this.state.displayConfirmWrap ? {display: 'block'} : {display: 'none'};
    return (
      <div>
        <div
          className={classes.confirmWrap}
          style={Object.assign(confirmWrapWidthStyle, confirmWrapDisplayStyle)}
        >
          <IconButton className={classes.closeIcon} onClick={this.onConfirmClose}><CloseIcon /></IconButton>
          <img
            id="confirmImage"
            ref={(child) => this.confirmImageDOM = child}
            role="presentation"
            className={classes.confirmImage}
          />
          <IconButton className={classes.sendText} onClick={this.onFileUploadRequest}>送信</IconButton>
        </div>
        <input
          type="file"
          ref={(child) => this.inputFileDom = child}
          className={classes.imageInput}
          accept="image/*"
          onChange={e => this.onFileUploadChange(e)}
        />
        <IconButton color="primary" onClick={this.handleIconClick}><PhotoLibraryIcon /></IconButton>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: IAddonMessageInteractionProps) => {
  return {
    user: state.user.user,
    room: state.room.room,
    currentRoomId: state.room.currentRoomId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<MessageActions>, ownProps: IAddonMessageInteractionProps) => {
  return {
    uploadAssetAndSendMessageRequest: (file: File) => dispatch(uploadAssetAndSendMessageRequestActionCreator(file)),
  };
};

export const ImageInteraction =
    connect<MapStateToProps, MapDispatchToProps, IAddonMessageInteractionProps & ImageInteractionProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ImageInteractionComponent));
