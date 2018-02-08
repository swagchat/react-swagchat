import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import {
  IRoomForUser,
  dateHumanize,
  State,
  ClientActions,
  setCurrentRoomIdActionCreator,
  SetCurrentRoomIdAction,
} from 'swagchat-sdk';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

export interface RoomListProps {
  name?: string;
}

interface MapStateToProps {
  userRooms: {[key: string]: IRoomForUser} | null;
}

interface MapDispatchToProps {
  setCurrentRoomId: (currentRoomId: string) => SetCurrentRoomIdAction;
}

type ClassNames = 
  'root'
;

class RoomListComponent extends React.Component<WithStyles<ClassNames> &
  MapStateToProps & MapDispatchToProps & RoomListProps, {}> {

  handleItemClick(roomId: string) {
    this.props.setCurrentRoomId(roomId);
  }

  render() {
    const { classes, userRooms } = this.props;

    return (
      <div className={classes.root}>
        {userRooms ? Object.keys(userRooms).map((key: string) => (
          <ListItem
            key={userRooms[key].roomId}
            button={true}
            onClick={() => this.handleItemClick(userRooms[key].roomId)}
          >
            <Avatar src={userRooms[key].pictureUrl} />
            <ListItemText primary={userRooms[key].name} secondary={userRooms[key].lastMessage} />
            <Typography variant="caption" color="textSecondary">
              {userRooms[key].lastMessageUpdated ? dateHumanize(userRooms[key].lastMessageUpdated) : ''}
            </Typography>
          </ListItem>
        )) : null }
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
