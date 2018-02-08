import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
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
  searchFormControl: {
    width: `calc(100% - 20px)`,
    margin: 10,
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
    fontSize: 16,
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
});

type ClassNames = 
  'root' |
  'searchFormControl' |
  'textFieldRoot' |
  'textFieldInput' |
  'textFieldFormLabel'
;

export interface RoomListProps {
  name?: string;
}

interface MapStateToProps {
  userRooms: {[key: string]: IRoomForUser} | null;
}

interface MapDispatchToProps {
  setCurrentRoomId: (currentRoomId: string) => SetCurrentRoomIdAction;
}

class RoomListComponent extends React.Component<WithStyles<ClassNames> &
  MapStateToProps & MapDispatchToProps & RoomListProps, {}> {

  handleItemClick(roomId: string) {
    this.props.setCurrentRoomId(roomId);
  }

  render() {
    const { classes, userRooms } = this.props;

    return (
      <div className={classes.root}>
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
