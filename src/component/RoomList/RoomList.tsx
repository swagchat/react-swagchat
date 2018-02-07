import * as React from 'react';
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import { IRoomForUser } from 'swagchat-sdk';
import { State } from '../../store';

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

}

type ClassNames = 
  'root'
;

class RoomListComponent extends React.Component<WithStyles<ClassNames> &
  MapStateToProps & MapDispatchToProps & RoomListProps, {}> {

  render() {
    const { classes, userRooms } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {userRooms ? Object.keys(userRooms).map((key: string) => (
            <ListItem button={true}>
              <Avatar src={userRooms[key].pictureUrl} />
              <ListItemText primary={userRooms[key].name} secondary={userRooms[key].lastMessage} />
              <Typography variant="caption" color="textSecondary">{userRooms[key].lastMessageUpdated}</Typography>
            </ListItem>
          )) : null }
          <p>sss</p>
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: RoomListProps) => {
  return {
    userRooms: state.user.userRooms,
  };
};

const mapDispatchToProps = (dispatch: {}, ownProps: RoomListProps) => {
  return {};
};

export const RoomList = connect<MapStateToProps, MapDispatchToProps, RoomListProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(RoomListComponent));
