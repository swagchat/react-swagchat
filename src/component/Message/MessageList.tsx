import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
import CameraAltIcon from 'material-ui-icons/CameraAlt';
import IconButton from 'material-ui/IconButton';
import { LinearProgress } from 'material-ui/Progress';
import {
  Client,
  User,
  State,
  IMessage,
  IMessages,
  Room,
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
import { ImageItem } from '../../addons/messages/Image/ImageItem';
import { TextInteraction } from '../../addons/messages/Text/TextInteraction';
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
type overflowYType = 'scroll';

const styles = (theme: Theme) => ({
  root: {
    minWidth: MESSAGE_LIST_MIN_WIDTH,
    backgroundColor: theme.palette.background.paper,
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
    paddingTop: APP_BAR_HEIGHT + 10,
    marginTop: APP_BAR_HEIGHT + MESSAGE_BOTTOM_HEIGHT + 1,
    top: -1 * (APP_BAR_HEIGHT + MESSAGE_BOTTOM_HEIGHT + 1),
    position: 'relative' as positionType,
    overflowY: 'scroll' as overflowYType,
  },
  bottom: {
    width: '100%',
    minHeight: MESSAGE_BOTTOM_HEIGHT - 1,
    minWidth: MESSAGE_LIST_MIN_WIDTH,
    backgroundColor: MESSAGE_BOTTOM_BG_COLOR,
    display: 'flex' as displayType,
    justifyContent: 'space-around' as justifyContentType,
    alignItems: 'center' as alignItemsType,
    position: 'fixed' as positionType,
    bottom: 0,
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
  scrollBottomAnimationDuration: number;
  roomResError: IProblemDetail | null;
  roomUsers: {[key: string]: IUserForRoom} | null;
}

interface MapDispatchToProps {
  clearMessages: () => ClearMessagesAction;
  fetchRoomRequestSuccess: (room: Room) => FetchRoomRequestSuccessAction;
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
  right?: number;
  isPush?: boolean;
}

class MessageListComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & MessageListProps, {}> {
  lastInnerHeight = 0;
  contentDom: HTMLDivElement | undefined | null;
  bottomDom: HTMLDivElement | undefined | null;

  componentDidMount() {
    if (this.props.client !== null && this.props.currentRoomId !== '') {
      this.getMessages(this.props.client, this.props.currentRoomId);
    }
    // window.addEventListener('resize', this.handlerResizeEvent.bind(this));
  }

  componentDidUpdate(prevProps: MapStateToProps, prevState: {}) {
    if (this.props.client !== null && this.props.currentRoomId !== prevProps.currentRoomId) {
      this.getMessages(this.props.client, this.props.currentRoomId);
    }
    this.scrollBottom();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handlerResizeEvent);
  }

  handlerResizeEvent() {
    if (this.lastInnerHeight !== window.innerHeight) {
      this.lastInnerHeight = window.innerHeight;
      if (this.contentDom !== undefined && this.contentDom !== null &&
          this.bottomDom !== undefined && this.bottomDom !== null) {
        const bottomRect = this.bottomDom.getBoundingClientRect();
        this.contentDom.style.height = `${bottomRect.top}px`;
      }
    }
  }

  getMessages = async (client: Client, roomId: string) => {
    this.props.clearMessages();
    const roomRes = await client!.getRoom(roomId);
    if (roomRes.room) {
      this.props.fetchRoomRequestSuccess(roomRes.room);
      this.props.beforeFetchMessagesRequest(roomRes.room.messageCount, 0);
      const messageRes = await roomRes.room.getMessages({
        limit: roomRes.room.messageCount,
        offset: 0,
      });
      if (messageRes.messages) {
        this.props.fetchMessagesRequestSuccess(messageRes.messages);
        // this.scrollBottom();
      } else {
        this.props.fetchMessagesRequestFailure(messageRes.error!);
      }
    } else {
      this.props.fetchRoomRequestFailure(roomRes.error!);
    }
  }

  scrollBottom = () => {
    if (this.contentDom !== undefined && this.contentDom !== null &&
      this.bottomDom !== undefined && this.bottomDom !== null) {
      const bottomRect = this.bottomDom.getBoundingClientRect();
      this.contentDom.style.height = `${bottomRect.top}px`;
      this.contentDom.scrollTo(0, this.contentDom.scrollHeight + MESSAGE_BOTTOM_HEIGHT + APP_BAR_HEIGHT); 
    }
  }

  handleMouseDownPassword = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
  }

  render() {
    const {
      classes, width, top, left, right,
      currentUserId, currentRoomId, currentRoomName, messages, roomUsers } = this.props;

    if (currentRoomId === '') {
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

    const bottomStyle = left !== undefined || right !== undefined ?
      {width: `calc(${calcWidth} - ${leftVar}px - ${rightVar}px)`} : {};

    return (
      <div className={classes.root} style={left ? {width: `calc(100% - ${left}px)`} : {}}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={appBarStyle}
        >
          <Toolbar className={classes.toolbar} disableGutters={true}>
            <Typography variant="subheading" className={classes.typography}>
              {currentRoomName}
            </Typography>
            <IconButton
              color="primary"
            >
              <InfoOutlineIcon className={classes.icon} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div
          id="messageListContent"
          ref={(child) => this.contentDom = child}
          className={classes.content}
        >
          {messages ? Object.keys(messages).map((key: string) => {
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
                return (
                  <ImageItem
                    key={key}
                    message={messages[key]}
                    user={roomUsers![messages[key].userId]}
                    myUserId={currentUserId}
                    isLast={false}
                  />
                );
              default:
                return (<div />);
            }
          }) : null }
        </div>
        {this.props.roomResError === null ?
          <div
            id="messageListBottom"
            ref={(child) => this.bottomDom = child}
            className={classes.bottom}
            style={bottomStyle}
          >
            <IconButton>
              <CameraAltIcon />
            </IconButton>
            <TextInteraction
              position="bottom"
              isAlwaysDisplay={true}
            />
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
    scrollBottomAnimationDuration: state.message.scrollBottomAnimationDuration,
    roomResError: state.room.problemDetail,
    roomUsers: state.room.roomUsers,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<MessageActions>, ownProps: MessageListProps) => {
  return {
    clearMessages: () => dispatch(clearMessagesActionCreator()),
    fetchRoomRequestSuccess: (room: Room) => dispatch(fetchRoomRequestSuccessActionCreator(room)),
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
