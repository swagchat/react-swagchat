import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import SendIcon from 'material-ui-icons/Send';
import IconButton from 'material-ui/IconButton';
import {
  IAddonMessageInteractionProps,
  State,
  IUser,
  Room,
  MessageActions,
  CreateMessageAction,
  SendMessagesRequestAction,
  createMessageActionCreator,
  sendMessagesRequestActionCreator,
} from 'swagchat-sdk';

const styles = (theme: Theme) => ({
  bottomRight: {
    flex: '1 1 0%',
    display: 'flex',
    justifyContent: 'space-around' as 'space-around',
    alignItems: 'center' as 'center',
  },
  formControl: {
    width: '100%',
    textAlign: 'left',
  },
  textField: {
    textAlign: 'left',
  },
});

type ClassNames = 
  'bottomRight' |
  'formControl' |
  'textField'
;

interface MapStateToProps {
  user: IUser | null;
  room: Room | null;
  currentRoomId: string;
}

interface MapDispatchToProps {
  createMessage: (roomId: string, userId: string, messageType: string, payload: {}) => CreateMessageAction;
  sendMessagesRequest: () => SendMessagesRequestAction;
}

class TextInteractionComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & IAddonMessageInteractionProps, {}> {
  state = {
    textAreaStyle: {},
    textValue: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({textValue: event.target.value});
  }

  send = () => {
    let emptyCheckString = this.state.textValue.replace(/\s|\n|　/g, '');
    if (emptyCheckString === '') {
      return;
    }
    this.props.createMessage(this.props.currentRoomId, this.props.user!.userId, 'text', {text: this.state.textValue});
    this.props.sendMessagesRequest();
    this.setState({textValue: ''});
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.bottomRight}>
        <FormControl className={classes.formControl}>
          <TextField
            value={this.state.textValue}
            className={classes.textField}
            multiline={true}
            rowsMax="4"
            InputProps={{
              disableUnderline: true,
            }}
            onChange={(e) => this.handleChange(e)}
          />
        </FormControl>
        <IconButton color="primary" onClick={() => this.send()}><SendIcon /></IconButton>
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
    createMessage: (roomId: string, userId: string, messageType: string, payload: {}) => 
      dispatch(createMessageActionCreator(roomId, userId, messageType, payload)),
    sendMessagesRequest: () => dispatch(sendMessagesRequestActionCreator()),
  };
};

export const TextInteraction = connect<MapStateToProps, MapDispatchToProps, IAddonMessageInteractionProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(TextInteractionComponent));
