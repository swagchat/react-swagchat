import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import SendIcon from 'material-ui-icons/Send';
import CameraAltIcon from 'material-ui-icons/CameraAlt';
import blueGrey from 'material-ui/colors/blueGrey';
import IconButton from 'material-ui/IconButton';
import { FormControl } from 'material-ui/Form';
import {
  Client,
  State,
  IMessage,
  IMessages,
  IRoom,
  IUserForRoom,
  IProblemDetail,
  MessageActions,
  clearMessagesActionCreator,
  fetchRoomRequestSuccessActionCreator,
  fetchRoomRequestFailureActionCreator,
  beforeFetchMessagesRequestActionCreator,
  fetchMessagesRequestActionCreator,
  fetchMessagesRequestSuccessActionCreator,
  fetchMessagesRequestFailureActionCreator,
  ClearMessagesAction,
  BeforeFetchMessagesRequestAction,
  FetchRoomRequestSuccessAction,
  FetchRoomRequestFailureAction,
  FetchMessagesRequestAction,
  FetchMessagesRequestSuccessAction,
  FetchMessagesRequestFailureAction,
} from 'swagchat-sdk';
import { TextItem } from '../../addons/messages/Text/TextItem';

type positionType = 'fixed';
type displayType = 'fixed';
type justifyContentType = 'space-around';
type alignItemsType = 'center';

const styles = (theme: Theme) => ({
  root: {
    minWidth: 200,
  },
  body: {
    padding: 10,
    marginBottom: 80,
  },
  bottom: {
    width: '100%',
    minWidth: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    display: 'flex' as displayType,
    justifyContent: 'space-around' as justifyContentType,
    alignItems: 'center' as alignItemsType,
    position: 'fixed' as positionType,
    bottom: 0,
    zIndex: 1101,
    borderTop: '1px solid ' + blueGrey[50],
  },
  bottomRight: {
    flex: '1 1 0%',
    display: 'flex' as displayType,
    justifyContent: 'space-around' as justifyContentType,
    alignItems: 'center' as alignItemsType,
  },
  formControl: {
    width: '100%',
  },
});

type ClassNames = 
  'root' |
  'body' |
  'bottom' |
  'bottomRight' |
  'formControl'
;

interface MapStateToProps {
  client: Client | null;
  currentRoomId: string;
  currentUserId: string;
  messages: {[key: string]: IMessage};
  roomResError: IProblemDetail | null;
  roomUsers: {[key: string]: IUserForRoom} | null;
}

interface MapDispatchToProps {
  clearMessages: () => ClearMessagesAction;
  beforeFetchMessagesRequest: (messagesAllCount: number, messagesLimit: number) => BeforeFetchMessagesRequestAction;
  fetchRoomRequestSuccess: (room: IRoom) => FetchRoomRequestSuccessAction;
  fetchRoomRequestFailure: (problemDetail: IProblemDetail) => FetchRoomRequestFailureAction;
  fetchMessagesRequest: () => FetchMessagesRequestAction;
  fetchMessagesRequestSuccess: (messages: IMessages) => FetchMessagesRequestSuccessAction;
  fetchMessagesRequestFailure: (problemDetail: IProblemDetail) => FetchMessagesRequestFailureAction;
}

export interface MessageListProps {
  left?: number;
}

class MessageListComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & MessageListProps, {}> {
  state = {
    text: '',
  };

  componentDidMount() {
    if (this.props.client !== null && this.props.currentRoomId !== '') {
      this.getMessages(this.props.client, this.props.currentRoomId);
    }
  }

  componentDidUpdate(prevProps: MapStateToProps, prevState: {}) {
    if (this.props.client !== null && this.props.currentRoomId !== prevProps.currentRoomId) {
      this.getMessages(this.props.client, this.props.currentRoomId);
    }
  }

  getMessages = async (client: Client, roomId: string) => {
    this.props.clearMessages();
    const roomRes = await client!.getRoom(roomId);
    if (roomRes.room) {
      this.props.fetchRoomRequestSuccess(roomRes.room.data);
      this.props.beforeFetchMessagesRequest(roomRes.room.messageCount, 0);
      const messageRes = await roomRes.room.getMessages({
        limit: roomRes.room.messageCount,
        offset: 0,
      });
      if (messageRes.messages) {
        this.props.fetchMessagesRequestSuccess(messageRes.messages);
      } else {
        this.props.fetchMessagesRequestFailure(messageRes.error!);
      }
    } else {
      this.props.fetchRoomRequestFailure(roomRes.error!);
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      text: event.target.value
    });
    window.console.log(event.target.value);
  }

  handleMouseDownPassword = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
  }

  render() {
    const { classes, left, currentUserId, messages, roomUsers } = this.props;
    return (
        <div className={classes.root} style={left ? {width: `calc(100% - ${left}px)`} : {}}>
          <div className={classes.body}>
            {messages ? Object.keys(messages).map((key: string) => {
              // window.console.log(key);
              window.console.log(messages[key].type);
              // window.console.log(roomUsers![messages[key].userId]);
              // window.console.log(currentUserId);
              switch (messages[key].type) {
                case 'text':
                  return (
                    <TextItem
                      key={key}
                      message={messages[key]}
                      user={roomUsers![messages[key].userId]}
                      myUserId={currentUserId}
                      isLast={false}
                    />
                  );
                case 'image':
                  return (<div />);
                default:
                  return (<div />);
              }
            }) : null }
          </div>
          {this.props.roomResError === null ?
            <div className={classes.bottom} style={left ? {width: `calc(100% - ${left}px)`} : {}}>
              <IconButton>
                <CameraAltIcon />
              </IconButton>
              <div className={classes.bottomRight}>
                <FormControl className={classes.formControl}>
                <TextField
                  defaultValue=""
                  multiline={true}
                  rowsMax="4"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={(e) => this.handleChange(e)}
                />
                </FormControl>
                <IconButton color="primary">
                  <SendIcon />
                </IconButton>
              </div>
            </div>
          : <p>{this.props.roomResError.title}</p>}
        </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: {}) => {
  return {
    client: state.client.client,
    currentRoomId: state.client.currentRoomId,
    currentUserId: state.client.userId,
    messages: state.message.messageMap,
    roomResError: state.room.problemDetail,
    roomUsers: state.room.roomUsers,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<MessageActions>, ownProps: MessageListProps) => {
  return {
    clearMessages: () => dispatch(clearMessagesActionCreator()),
    beforeFetchMessagesRequest: (messagesAllCount: number, messagesLimit: number) =>
      dispatch(beforeFetchMessagesRequestActionCreator(messagesAllCount, messagesLimit)),
    fetchMessagesRequest: () => dispatch(fetchMessagesRequestActionCreator()),
    fetchRoomRequestSuccess: (room: IRoom) => dispatch(fetchRoomRequestSuccessActionCreator(room)),
    fetchRoomRequestFailure: (problemDetail: IProblemDetail) =>
      dispatch(fetchRoomRequestFailureActionCreator(problemDetail)),
    fetchMessagesRequestSuccess: (messages: IMessages) => dispatch(fetchMessagesRequestSuccessActionCreator(messages)),
    fetchMessagesRequestFailure: (problemDetail: IProblemDetail) =>
      dispatch(fetchMessagesRequestFailureActionCreator(problemDetail)),
  };
};

export const MessageList = connect<MapStateToProps, MapDispatchToProps, MessageListProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(MessageListComponent));
