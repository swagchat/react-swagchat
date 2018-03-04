import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import NotificationsActiveIcon from 'material-ui-icons/NotificationsActive';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { LinearProgress } from 'material-ui/Progress';
import {
  State, Client, IUser, Room, IProblemDetail, RoomType,
  fetchRoomRequestActionCreator, FetchRoomRequestAction,
  RoomActions,
  routerHistory, opponentUser,
} from 'swagchat-sdk';
import { AddRoomMemberListItem } from './AddRoomMemberListItem';
import { RoomMemberListItem } from './RoomMemberListItem';
import { LeftRoomListItem } from './LeftRoomListItem';
import { RoomEditListItem } from './RoomEditListItem';
import {
  MIN_WIDTH, BORDER_COLOR, ICON_SIZE, APP_BAR_HEIGHT,
} from '../../setting';

const styles = (theme: Theme) => {
  theme!.overrides!.MuiDialogContent = {
    root: {
      padding: 0,
      '&:first-child': {
        paddingTop: 0,
      },
    },
  };
  return {
    root: {
      minWidth: MIN_WIDTH,
    },
    appBar: {
      width: '100%',
      height: APP_BAR_HEIGHT,
      left: 0,
      background: theme.palette.common.white,
      borderBottom: '1px solid ' + BORDER_COLOR,
    },
    toolbar: {
      minHeight: APP_BAR_HEIGHT,
      justifyContent: 'center' as 'center',
    },
    toolbarButton: {
      width: 40,
      height: 40,
    },
    toolbarIcon: {
      width: ICON_SIZE,
      margin: '0 5px',
    },
    typography: {
      flex: 1,
      textAlign: 'center',
    },
    content: {
      paddingTop: APP_BAR_HEIGHT,
      position: 'relative' as 'relative',
      overflowY: 'scroll' as 'scroll',
    },
    listItemIcon: {
      color: theme.palette.primary.main,
    },
  };
};

type ClassNames = 
  'root' |
  'appBar' |
  'toolbar' |
  'toolbarButton' |
  'toolbarIcon' |
  'typography' |
  'content' |
  'listItemIcon'
;

interface MapStateToProps {
  client: Client | null;
  room: Room | null;
  user: IUser | null;
  currentRoomId: string;
  currentRoomName: string;
  userProblemDetail: IProblemDetail | null;
}

interface MapDispatchToProps {
  fetchRoomRequest: (roomId: string) => FetchRoomRequestAction;
}

export interface RoomSettingProps {
  width?: number;
  top?: number;
  left?: number;
  right?: number;
}

const OneOnOneContent = withStyles(styles)<MapStateToProps & MapDispatchToProps & RoomSettingProps>(
  (props: MapStateToProps & MapDispatchToProps & RoomSettingProps & WithStyles<ClassNames>) => {
    const { classes, room, user } = props;

    if (room === null || user === null) {
      return <LinearProgress />;
    }

    const dmUser = opponentUser(room.users!, user.userId);
    if (dmUser === null || dmUser.length === 0) {
      return <LinearProgress />;
    }

    return (
      <div className={classes.content}>
        <RoomMemberListItem key={dmUser[0].userId} enableRemoveIcon={false} userForRoom={dmUser[0]} />
        <List subheader={<ListSubheader component="div">設定</ListSubheader>}>
          <ListItem disableGutters={true} key="room-setting-notifications" button={true}>
            <IconButton className={classes.listItemIcon}><NotificationsActiveIcon /></IconButton>
            <ListItemText primary="このダイレクトルームの通知をオフにする" />
          </ListItem>
          <LeftRoomListItem />
        </List>
      </div>
    );
  }
);

const NotOneOnOneContent = withStyles(styles)<MapStateToProps & MapDispatchToProps & RoomSettingProps>(
  (props: MapStateToProps & MapDispatchToProps & RoomSettingProps & WithStyles<ClassNames>) => {
    const { classes, room } = props;

    if (room === null) {
      return <LinearProgress />;
    }

    return (
      <div className={classes.content}>
        <RoomEditListItem />
        <Divider />
        <List subheader={<ListSubheader component="div">メンバー管理</ListSubheader>}>
          <AddRoomMemberListItem />
          {room.users !== null
            ? Object.keys(room.users).map((key: string) => (
              <RoomMemberListItem key={key} enableRemoveIcon={true} userForRoom={room.users![key]} />
            ))
            : null
          }
        </List>
        <Divider />
        <List subheader={<ListSubheader component="div">設定</ListSubheader>}>
          <ListItem disableGutters={true} key="room-setting-notifications" button={true}>
            <IconButton className={classes.listItemIcon}><NotificationsActiveIcon /></IconButton>
            <ListItemText primary="このルームの通知をオフにする" />
          </ListItem>
          <LeftRoomListItem />
        </List>
      </div>
    );
  }
);

class RoomSettingComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & RoomSettingProps, {}> {
  componentDidMount() {
    if (this.props.client !== null && this.props.room === null && this.props.currentRoomId !== '') {
      this.props.fetchRoomRequest(this.props.currentRoomId);
    }
  }

  componentDidUpdate(prevProps: MapStateToProps, prevState: {}) {
    if (this.props.client !== null && this.props.room === null && this.props.currentRoomId !== '') {
      this.props.fetchRoomRequest(this.props.currentRoomId);
    }
  }

  handleBackClick = () => {
    routerHistory.goBack();
  }

  render() {
    const {
      classes, width, top, left, right,
      room, user, userProblemDetail,
    } = this.props;

    if (userProblemDetail !== null) {
      return <LinearProgress />;
    }

    if (room === null || user === null) {
      return <LinearProgress />;
    }

    const leftVar = left !== undefined ? left : 0; 
    const rightVar = right !== undefined ? right : 0; 

    const calcWidth = width !== undefined ? width + 'px' : '100%';
    const widthStyle = width !== undefined ? {width: width} : {};
    const topStyle = top !== undefined ? {marginTop: top} : {};
    const appBarleftRightStyle = left !== undefined || right !== undefined ?
      {marginLeft: leftVar, width: `calc(${calcWidth} - ${leftVar}px - ${rightVar}px)`} : {};
    const appBarStyle = Object.assign(widthStyle, topStyle, appBarleftRightStyle);

    return (
      <div className={classes.root} style={left ? {width: `calc(100% - ${left}px)`} : {}}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={appBarStyle}
        >
          <Toolbar className={classes.toolbar} disableGutters={true}>
            <IconButton
              className={classes.toolbarButton}
              color="primary"
              onClick={this.handleBackClick}
            >
              <KeyboardArrowLeftIcon className={classes.toolbarIcon} />
            </IconButton>
            <Typography variant="subheading" className={classes.typography}>
              {room.type === RoomType.ONE_ON_ONE ? 'ダイレクトメール設定' : 'ルーム設定'}
            </Typography>
            <IconButton
              className={classes.toolbarButton}
              color="primary"
            />
          </Toolbar>
        </AppBar>
        {room.type === RoomType.ONE_ON_ONE
          ? <OneOnOneContent {...this.props} />
          : <NotOneOnOneContent {...this.props} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: RoomSettingProps) => {
  return {
    client: state.client.client,
    room: state.room.room,
    user: state.user.user,
    currentRoomId: state.room.currentRoomId,
    currentRoomName: state.room.currentRoomName,
    userProblemDetail: state.user.problemDetail,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RoomActions>, ownProps: RoomSettingProps) => {
  return {
    fetchRoomRequest: (roomId: string) => dispatch(fetchRoomRequestActionCreator(roomId)),
  };
};

export const RoomSetting = connect<MapStateToProps, MapDispatchToProps, RoomSettingProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(RoomSettingComponent));
