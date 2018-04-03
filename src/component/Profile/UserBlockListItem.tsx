import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import {
  State, IUser,
  userBlockRequestActionCreator, UserBlockRequestAction,
  userUnBlockRequestActionCreator, UserUnBlockRequestAction,
  UserActions,
} from 'swagchat-sdk';

const styles = (theme: Theme) => {
  theme!.overrides!.MuiDialogActions = {
    action: {
      width: '50%',
      justifyContent: 'space-around' as 'space-around',
    },
  };
  theme!.overrides!.MuiDialogContent = {
    root: {
      margin: '0 auto',
      padding: 0,
    },
  };
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
  blocks: string[];
  profileUser: IUser | null;
}

interface MapDispatchToProps {
  userBlockRequest: (blockUserIds: string[]) => UserBlockRequestAction;
  userUnBlockRequest: (unBlockUserIds: string[]) => UserUnBlockRequestAction;
}

export interface Props {
}

class UserBlockListItemComponent
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
    if (this.props.blocks.indexOf(this.props.profileUser!.userId) < 0) {
      this.props.userBlockRequest([this.props.profileUser!.userId]);
    } else {
      this.props.userUnBlockRequest([this.props.profileUser!.userId]);
    }
    this.setState({dialog: false});
    e.stopPropagation();
  }

  render() {
    const { classes, blocks, profileUser } = this.props;

    if (profileUser === null) {
      return null;
    }

    return (
      <ListItem button={true} disableGutters={true} onClick={this.handleOpen}>
        <IconButton onClick={this.handleOpen}><ExitToAppIcon color="primary" /></IconButton>
        <ListItemText primary={blocks.indexOf(profileUser.userId) < 0 ? 'ブロックする' : 'ブロックを解除する'} />
        <Dialog open={this.state.dialog} onBackdropClick={this.handleClose} onEscapeKeyDown={this.handleClose}>
          <DialogTitle onClick={this.handleClose}>
            {blocks.indexOf(profileUser.userId) < 0 ? 'ブロックしますか？' : 'ブロックを解除しますか？'}
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

const mapStateToProps = (state: State, ownProps: Props) => {
  return {
    blocks: state.user.blocks,
    profileUser: state.user.profileUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<UserActions>, ownProps: Props) => {
  return {
    userBlockRequest: (blockUserIds: string[]) => dispatch(userBlockRequestActionCreator(blockUserIds)),
    userUnBlockRequest: (unBlockUserIds: string[]) => dispatch(userUnBlockRequestActionCreator(unBlockUserIds)),
  };
};

export const UserBlockListItem = connect<MapStateToProps, MapDispatchToProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(UserBlockListItemComponent));
