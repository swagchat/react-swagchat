import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import SendIcon from 'material-ui-icons/Send';
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
import CameraAltIcon from 'material-ui-icons/CameraAlt';
import IconButton from 'material-ui/IconButton';
import { LinearProgress } from 'material-ui/Progress';
import { FormControl } from 'material-ui/Form';
import {
  Client,
  User,
  State,
  IMessage,
  IMessages,
  IRoom,
  IUserForRoom,
  IRoomForUser,
  IProblemDetail,
  MessageActions,
  clearMessagesActionCreator,
  fetchRoomRequestSuccessActionCreator,
  fetchRoomRequestFailureActionCreator,
  beforeFetchMessagesRequestActionCreator,
  fetchMessagesRequestActionCreator,
  fetchMessagesRequestSuccessActionCreator,
  fetchMessagesRequestFailureActionCreator,
  createMessageActionCreator,
  sendMessagesRequestActionCreator,
  ClearMessagesAction,
  BeforeFetchMessagesRequestAction,
  FetchRoomRequestSuccessAction,
  FetchRoomRequestFailureAction,
  FetchMessagesRequestAction,
  FetchMessagesRequestSuccessAction,
  FetchMessagesRequestFailureAction,
  CreateMessageAction,
  SendMessagesRequestAction,
} from 'swagchat-sdk';
import { TextItem } from '../../addons/messages/Text/TextItem';
import {
  MESSAGE_LIST_MIN_WIDTH,
  MESSAGE_BOTTOM_BG_COLOR,
  BORDER_COLOR,
  ICON_SIZE,
  APP_BAR_HEIGHT,
  MESSAGE_BOTTOM_HEIGHT,
} from '../../setting';

type positionType = 'fixed';
type displayType = 'fixed';
type justifyContentType = 'space-around';
type alignItemsType = 'center';

const styles = (theme: Theme) => ({
  root: {
    minWidth: MESSAGE_LIST_MIN_WIDTH,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    width: '100%',
    height: APP_BAR_HEIGHT,
    left: 0,
    background: 'white',
    borderBottom: '1px solid ' + BORDER_COLOR,
  },
  toolbar: {
    minHeight: APP_BAR_HEIGHT,
    justifyContent: 'center' as justifyContentType,
    paddingLeft: 10,
  },
  typography: {
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  content: {
    padding: '0 10px',
    marginTop: APP_BAR_HEIGHT,
    marginBottom: MESSAGE_BOTTOM_HEIGHT,
  },
  bottom: {
    width: '100%',
    height: MESSAGE_BOTTOM_HEIGHT - 1,
    minWidth: MESSAGE_LIST_MIN_WIDTH,
    backgroundColor: MESSAGE_BOTTOM_BG_COLOR,
    display: 'flex' as displayType,
    justifyContent: 'space-around' as justifyContentType,
    alignItems: 'center' as alignItemsType,
    position: 'fixed' as positionType,
    bottom: 0,
    zIndex: 1101,
    borderTop: '1px solid ' + BORDER_COLOR,
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
  'appBar' |
  'toolbar' |
  'typography' |
  'icon' |
  'content' |
  'bottom' |
  'bottomRight' |
  'formControl'
;

interface MapStateToProps {
  client: Client | null;
  user: User | null;
  currentRoomId: string;
  currentRoomName: string;
  userRooms: {[key: string]: IRoomForUser} | null;
  currentUserId: string;
  messages: {[key: string]: IMessage};
  roomResError: IProblemDetail | null;
  roomUsers: {[key: string]: IUserForRoom} | null;
}

interface MapDispatchToProps {
  clearMessages: () => ClearMessagesAction;
  fetchRoomRequestSuccess: (room: IRoom) => FetchRoomRequestSuccessAction;
  fetchRoomRequestFailure: (problemDetail: IProblemDetail) => FetchRoomRequestFailureAction;
  beforeFetchMessagesRequest: (messagesAllCount: number, messagesLimit: number) => BeforeFetchMessagesRequestAction;
  fetchMessagesRequest: () => FetchMessagesRequestAction;
  fetchMessagesRequestSuccess: (messages: IMessages) => FetchMessagesRequestSuccessAction;
  fetchMessagesRequestFailure: (problemDetail: IProblemDetail) => FetchMessagesRequestFailureAction;
  createMessage: (roomId: string, userId: string, messageType: string, payload: {}) => CreateMessageAction;
  sendMessagesRequest: () => SendMessagesRequestAction;
}

export interface MessageListProps {
  width?: number;
  top?: number;
  left?: number;
  isPush?: boolean;
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

  send = () => {
    let emptyCheckString = this.state.text.replace(/\s|\n|　/g, '');
    if (emptyCheckString === '') {
      return;
    }
    this.props.createMessage(this.props.currentRoomId, this.props.user!.userId, 'text', {text: this.state.text});
    this.props.sendMessagesRequest();
    this.setState({text: ''});
  }

  render() {
    const {
      classes, width, top, left,
      currentUserId, currentRoomId, currentRoomName, messages, roomUsers } = this.props;

    if (currentRoomId === '') {
      return <LinearProgress />;
    }

    const calcWidth = width ? width + 'px' : '100%';
    const widthStyle = width !== undefined ? {width: width} : {};
    const topStyle = top !== undefined ? {marginTop: top} : {};
    const leftStyle = left !== undefined ? {marginLeft: left, width: `calc(${calcWidth} - ${left}px)`} : {};
    const appBarStyle = Object.assign(widthStyle, topStyle, leftStyle);

    const contentMarginBottom = top ? MESSAGE_BOTTOM_HEIGHT + top : MESSAGE_BOTTOM_HEIGHT;
    return (
      <div className={classes.root} style={left ? {width: `calc(100% - ${left}px)`} : {}}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={appBarStyle}
        >
          <Toolbar className={classes.toolbar} disableGutters={true}>
            <Typography variant="title" className={classes.typography}>
              {currentRoomName}
            </Typography>
            <IconButton
              color="primary"
            >
              <InfoOutlineIcon className={classes.icon} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.content} style={{marginBottom: contentMarginBottom}}>
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
                value={this.state.text}
                multiline={true}
                rowsMax="4"
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => this.handleChange(e)}
              />
              </FormControl>
              <IconButton color="primary" onClick={() => this.send()}>
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
    user: state.user.user,
    currentRoomId: state.client.currentRoomId,
    currentRoomName: state.client.currentRoomName,
    userRooms: state.user.userRooms,
    currentUserId: state.client.userId,
    messages: state.message.messageMap,
    roomResError: state.room.problemDetail,
    roomUsers: state.room.roomUsers,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<MessageActions>, ownProps: MessageListProps) => {
  return {
    clearMessages: () => dispatch(clearMessagesActionCreator()),
    fetchRoomRequestSuccess: (room: IRoom) => dispatch(fetchRoomRequestSuccessActionCreator(room)),
    fetchRoomRequestFailure: (problemDetail: IProblemDetail) =>
      dispatch(fetchRoomRequestFailureActionCreator(problemDetail)),
    beforeFetchMessagesRequest: (messagesAllCount: number, messagesLimit: number) =>
      dispatch(beforeFetchMessagesRequestActionCreator(messagesAllCount, messagesLimit)),
    fetchMessagesRequest: () => dispatch(fetchMessagesRequestActionCreator()),
    fetchMessagesRequestSuccess: (messages: IMessages) => dispatch(fetchMessagesRequestSuccessActionCreator(messages)),
    fetchMessagesRequestFailure: (problemDetail: IProblemDetail) =>
      dispatch(fetchMessagesRequestFailureActionCreator(problemDetail)),
    createMessage: (roomId: string, userId: string, messageType: string, payload: {}) => 
      dispatch(createMessageActionCreator(roomId, userId, messageType, payload)),
    sendMessagesRequest: () => dispatch(sendMessagesRequestActionCreator()),
  };
};

export const MessageList = connect<MapStateToProps, MapDispatchToProps, MessageListProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(MessageListComponent));
