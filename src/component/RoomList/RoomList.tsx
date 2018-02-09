import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
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
import blueGrey from 'material-ui/colors/blueGrey';
import teal from 'material-ui/colors/teal';
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
} from 'swagchat-sdk';

const appBarHeight = 60;

type justifyContentType = 'center';
type positionType = 'absolute';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    width: '100%',
    height: appBarHeight,
    left: 0,
    background: 'white',
    borderBottom: '1px solid ' + blueGrey[50],
  },
  toolbar: {
    minHeight: appBarHeight,
    justifyContent: 'center' as justifyContentType,
    paddingLeft: 10,
  },
  typography: {
    flex: 1,
    textAlign: 'center',
  },
  content: {
    marginTop: appBarHeight,
  },
  searchFormControl: {
    width: `calc(100% - 20px)`,
    margin: 10,
    height: 24,
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    borderRadius: 4,
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
  },
  onlineBadge: {
    top: '46px',
    left: '48px',
    borderRadius: '50%',
    height: 12,
    width: 12,
    backgroundColor: teal[400],
    position: 'absolute' as positionType,
  },
  addCircle: {
    width: 32,
    height: 32,
  },
  tab: {
    height: 30,
    flexBasis: '33%',
  },
});

type ClassNames = 
  'root' |
  'appBar' |
  'toolbar' |
  'typography' |
  'content' |
  'searchFormControl' |
  'textFieldRoot' |
  'textFieldInput' |
  'textFieldFormLabel' |
  'onlineBadge' |
  'addCircle' |
  'tab'
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
}

export interface RoomListProps {
  left?: number;
  width?: number;
}

class RoomListComponent extends React.Component<WithStyles<ClassNames> &
    MapStateToProps & MapDispatchToProps & RoomListProps, {}> {
  state = {
    value: 0,
  };

  handleItemClick(roomId: string) {
    this.props.setCurrentRoomId(roomId);
  }

  handleChange = (event: {}, value: number) => {
    this.setState({ value });
  }

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  }

  render() {
    const { classes, userRooms, left, width } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={left ? {width: width, marginLeft: left} : {}}
        >
          <Toolbar className={classes.toolbar} disableGutters={true}>
            <Typography variant="title" className={classes.typography}>
              トーク
            </Typography>
            <IconButton
              color="primary"
            >
              <AddIcon className={classes.addCircle} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
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
            style={{height: 20}}
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth={true}
            centered={true}
          >
            <Tab label="全て" className={classes.tab} />
            <Tab label="未読" className={classes.tab}  />
            <Tab label="オンライン中" className={classes.tab}  />
          </Tabs>
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
                  onClick={() => this.handleItemClick(userRooms[key].roomId)}
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
  };
};

export const RoomList = connect<MapStateToProps, MapDispatchToProps, RoomListProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(RoomListComponent));
