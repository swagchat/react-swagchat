import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import SwipeableViews from 'react-swipeable-views';
import Tabs, { Tab } from 'material-ui/Tabs';
import {
  IRoomForUser,
  dateHumanize,
  State,
  ClientActions,
  setCurrentRoomIdActionCreator,
  SetCurrentRoomIdAction,
  setCurrentRoomNameActionCreator,
  SetCurrentRoomNameAction,
  store,
} from 'swagchat-sdk';
import {
  ICON_SIZE,
  APP_BAR_HEIGHT,
  SEARCH_FORM_HEIGHT,
  TAB_HEIGHT,
  BORDER_COLOR,
  ONLINE_BADGE_COLOR,
  ONLINE_BADGE_SIZE,
} from '../../setting';

type justifyContentType = 'center';
type positionType = 'absolute';

const styles = (theme: Theme) => {
  theme!.overrides!.MuiTab = {
    label: {
      fontSize: '0.8125rem',
      '@media (min-width: 960px)': {
        fontSize: '0.8125rem',
      },
    },
    labelContainer: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      '@media (min-width: 960px)': {
        paddingLeft: 0,
        paddingRight: 0,
      }
    },
  };
  return {
    root: {
      width: '100%',
      backgroundColor: theme.palette.common.white,
    },
    appBar: {
      height: APP_BAR_HEIGHT + SEARCH_FORM_HEIGHT + TAB_HEIGHT + 10,
      left: 0,
      background: 'white',
      borderBottom: '1px solid ' + BORDER_COLOR,
      backgroundColor: theme.palette.common.white,
    },
    toolbar: {
      minHeight: APP_BAR_HEIGHT,
      justifyContent: 'center' as justifyContentType,
      paddingLeft: 10,
      backgroundColor: theme.palette.common.white,
    },
    typography: {
      flex: 1,
      textAlign: 'center',
      backgroundColor: 'white',
    },
    searchFormControl: {
      width: '100%',
      padding: 5,
      height: SEARCH_FORM_HEIGHT,
    },
    textFieldRoot: {
      padding: 0,
      'label + &': {
        marginTop: theme.spacing.unit * 3,
      },
    },
    textFieldInput: {
      borderRadius: 2,
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 12,
      padding: '10px 12px',
      width: 'calc(100% - 24px)',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    textFieldFormLabel: {
      backgroundColor: theme.palette.common.white,
    },
    tabs: {
      backgroundColor: theme.palette.common.white,
    },
    tab: {
      marginTop: 12,
      height: TAB_HEIGHT,
      flexBasis: '33%',
      minWidth: '33%',
      backgroundColor: theme.palette.common.white,
    },
    content: {
      marginTop: APP_BAR_HEIGHT + SEARCH_FORM_HEIGHT + TAB_HEIGHT + 10,
    },
    onlineBadge: {
      top: '46px',
      left: '48px',
      borderRadius: '50%',
      height: ONLINE_BADGE_SIZE,
      width: ONLINE_BADGE_SIZE,
      backgroundColor: ONLINE_BADGE_COLOR,
      position: 'absolute' as positionType,
    },
    icon: {
      width: ICON_SIZE,
      height: ICON_SIZE,
    },
  };
};

type ClassNames = 
  'root' |
  'appBar' |
  'toolbar' |
  'typography' |
  'tabs' |
  'tab' |
  'searchFormControl' |
  'textFieldRoot' |
  'textFieldInput' |
  'textFieldFormLabel' |
  'content' |
  'onlineBadge' |
  'icon'
;

interface TabContainerProps {
  children: string | React.ReactNode;
  dir: string;
}

function TabContainer(props: TabContainerProps) {
  const { children, dir } = props;
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

interface MapStateToProps {
  userRooms: {[key: string]: IRoomForUser} | null;
}

interface MapDispatchToProps {
  setCurrentRoomId: (currentRoomId: string) => SetCurrentRoomIdAction;
  setCurrentRoomName: (currentRoomName: string) => SetCurrentRoomNameAction;
}

export interface RoomListProps {
  top?: number;
  left?: number;
  width?: number;
  isPush?: boolean;
}

class RoomListComponent extends React.Component<WithStyles<ClassNames> &
    MapStateToProps & MapDispatchToProps & RoomListProps, {}> {
  state = {
    value: 0,
  };

  handleItemClick(roomId: string, roomName: string) {
    this.props.setCurrentRoomId(roomId);
    this.props.setCurrentRoomName(roomName);
    if (this.props.isPush === true) {
      store.dispatch(push('/messages/' + roomId));
    }
  }

  handleChange = (event: {}, value: number) => {
    this.setState({ value });
  }

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  }

  render() {
    const { classes, userRooms, top, left, width } = this.props;
    const topStyle = top !== undefined ? {marginTop: top} : {};
    const leftStyle = left !== undefined ? {marginLeft: left} : {};
    const widthStyle = width !== undefined ? {width: width - 1} : {};
    const appBarStyle = Object.assign(topStyle, leftStyle, widthStyle);

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={appBarStyle}
        >
          <Toolbar className={classes.toolbar} disableGutters={true}>
            <Typography variant="subheading" className={classes.typography}>
              トーク
            </Typography>
            <IconButton
              color="primary"
            >
              <AddIcon className={classes.icon} />
            </IconButton>
          </Toolbar>
          <FormControl className={classes.searchFormControl}>
            <TextField
              autoComplete="abc,def" // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
              placeholder="検索キーワードを入力してください"
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.textFieldRoot,
                  input: classes.textFieldInput,
                },
              }}
              InputLabelProps={{
                shrink: true,
                className: classes.textFieldFormLabel,
              }}
            />
          </FormControl>
          <Tabs
            className={classes.tabs}
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth={true}
            centered={true}
          >
            <Tab label="全て" className={classes.tab} />
            <Tab label="未読" className={classes.tab} />
            <Tab label="オンライン中" className={classes.tab} style={{paddingLeft: 0, paddingRight: 0}} />
          </Tabs>
        </AppBar>
        <div className={classes.content}>
 
          <SwipeableViews
            axis="x"
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer dir="ltr">
              {userRooms ? Object.keys(userRooms).map((key: string) => (
                <ListItem
                  key={userRooms[key].roomId}
                  button={true}
                  onClick={() => this.handleItemClick(userRooms[key].roomId, userRooms[key].name)}
                >
                  {userRooms[key].ruUnreadCount > 0 ?
                    <Badge color="secondary" badgeContent={userRooms[key].ruUnreadCount}>
                      <Avatar src={userRooms[key].pictureUrl} />
                    </Badge>
                  : <Avatar src={userRooms[key].pictureUrl} />}
                  {false ? <Badge badgeContent="" className={classes.onlineBadge}><p /></Badge> : null}

                  <ListItemText primary={userRooms[key].name} secondary={userRooms[key].lastMessage} />
                  <Typography variant="caption" color="textSecondary">
                    {userRooms[key].lastMessageUpdated ? dateHumanize(userRooms[key].lastMessageUpdated) : ''}
                  </Typography>
                </ListItem>
              )) : null }
            </TabContainer>
            <TabContainer dir="ltr">
              <p>未読</p>
            </TabContainer>
            <TabContainer dir="ltr">
              <p>オンライン中</p>
            </TabContainer>
          </SwipeableViews>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: RoomListProps) => {
  return {
    userRooms: state.user.userRooms,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ClientActions>, ownProps: RoomListProps) => {
  return {
    setCurrentRoomId: (currentRoomId: string) => dispatch(setCurrentRoomIdActionCreator(currentRoomId)),
    setCurrentRoomName: (currentRoomName: string) => dispatch(setCurrentRoomNameActionCreator(currentRoomName)),
  };
};

export const RoomList = connect<MapStateToProps, MapDispatchToProps, RoomListProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(RoomListComponent));
