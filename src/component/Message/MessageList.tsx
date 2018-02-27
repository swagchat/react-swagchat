import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import SearchIcon from 'material-ui-icons/Search';
import { SearchText } from '../Search/SearchText';
import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import {
  State,
  store,
  Client,
  IUser,
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
  updateMessagesActionCreator,
  markAsReadRequestActionCreator,
  setProfileUserIdActionCreator,
  setSearchTextActionCreator,
  ClearMessagesAction,
  BeforeFetchMessagesRequestAction,
  FetchRoomRequestSuccessAction,
  FetchRoomRequestFailureAction,
  FetchMessagesRequestAction,
  FetchMessagesRequestSuccessAction,
  FetchMessagesRequestFailureAction,
  CreateMessageAction,
  SendMessagesRequestAction,
  UpdateMessagesAction,
  MarkAsReadRequestAction,
  SetProfileUserIdAction,
  SetSearchTextAction,
  routerHistory,
  RoomType,
  opponentUser,
} from 'swagchat-sdk';
import { TextItem } from '../../addons/messages/Text/TextItem';
import { ImageItem } from '../../addons/messages/Image/ImageItem';
import { TextInteraction } from '../../addons/messages/Text/TextInteraction';
import { ImageInteraction } from '../../addons/messages/Image/ImageInteraction';
import {
  MIN_WIDTH,
  MESSAGE_BOTTOM_BG_COLOR,
  BORDER_COLOR,
  ICON_SIZE,
  APP_BAR_HEIGHT,
  MESSAGE_BOTTOM_HEIGHT,
  // BORDER_RADIUS,
} from '../../setting';
import { logger } from '../../util/logger';

type positionType = 'fixed';
type displayType = 'fixed';
type justifyContentType = 'space-around';
type alignItemsType = 'center';
type overflowYType = 'scroll';

const styles = (theme: Theme) => ({
  root: {
    minWidth: MIN_WIDTH,
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
    // paddingLeft: 10,
  },
  searchToolbar: {
    minHeight: APP_BAR_HEIGHT,
    display: 'box',
  },
  cancelButton: {
    margin: 2,
  },
  toolbarButton: {
    width: 40,
    height: 40,
  },
  toolbarIcon: {
    width: ICON_SIZE,
    margin: '0 5px',
  },
  searchText: {
    // backgroundColor: theme.palette.text.hint,
    // borderRadius: BORDER_RADIUS,
    // boxFlex: 1,
    // margin: 4,
  },
  typography: {
    flex: 1,
    textAlign: 'center',
  },
  content: {
    padding: '0 10px',
    paddingTop: APP_BAR_HEIGHT + 10,
    bottom: APP_BAR_HEIGHT + MESSAGE_BOTTOM_HEIGHT,
    marginTop: APP_BAR_HEIGHT + MESSAGE_BOTTOM_HEIGHT + 10,
    position: 'relative' as positionType,
    overflowY: 'scroll' as overflowYType,
  },
  bottom: {
    width: '100%',
    minHeight: MESSAGE_BOTTOM_HEIGHT - 1,
    minWidth: MIN_WIDTH,
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
  'searchToolbar' |
  'cancelButton' |
  'toolbarButton' |
  'toolbarIcon' |
  'typography' |
  'searchText' |
  'content' |
  'bottom' |
  'bottomRight' |
  'formControl'
;

interface MapStateToProps {
  client: Client | null;
  user: IUser | null;
  currentRoomId: string;
  currentRoomName: string;
  userRooms: {[key: string]: IRoomForUser} | null;
  currentUserId: string;
  messages: {[key: string]: IMessage};
  scrollBottomAnimationDuration: number;
  roomResError: IProblemDetail | null;
  roomUsers: {[key: string]: IUserForRoom} | null;
  room: Room | null;
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
  updateMessages: (messages: IMessage[]) => UpdateMessagesAction;
  markAsReadRequest: (roomId: string) => MarkAsReadRequestAction;
  setProfileUserId: (profileUserId: string) => SetProfileUserIdAction;
  setSearchText: (searchText: string) => SetSearchTextAction;
}

export interface MessageListProps {
  width?: number;
  top?: number;
  left?: number;
  right?: number;
}

class MessageListComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & MessageListProps, {}> {
  state = {
    enableSearchText: false,
  };

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
      this.props.markAsReadRequest(this.props.currentRoomId);
    }
    this.scrollBottom();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handlerResizeEvent);
    if (this.props.room !== null) {
      this.props.room.unsubscribeMessage();
    }
  }

  handleBackClick = () => {
    routerHistory.goBack();
  }

  handleSearchClick = () => {
    this.setState({enableSearchText: true});
  }

  handleSearchCancelClick = () => {
    this.setState({enableSearchText: false});
    this.props.setSearchText('');
  }

  subMsgFunc = (message: IMessage) => {
    logger('CHAT-API', 'info', 'Receive message(push)');
    this.props.updateMessages([message]);
    this.props.markAsReadRequest(this.props.currentRoomId);
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
      roomRes.room.subscribeMessage(this.subMsgFunc);
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

  handleRoomSettingClick = () => {
    const room = this.props.room;
    if (room !== null) {
      if (room.type === RoomType.ONE_ON_ONE) {
        const users = opponentUser(room.users!, this.props.currentUserId);
        if (users !== null) {
          const profileUserId = users[0].userId;
          this.props.setProfileUserId(profileUserId);
          store.dispatch(push('/profile/' + profileUserId));
        }
      } else {
        store.dispatch(push('/roomSetting/' + this.props.currentRoomId));
      }
    }
  }

  render() {
    const {
      classes, width, top, left, right,
      currentUserId, currentRoomId, currentRoomName, messages, roomUsers
    } = this.props;
    const { enableSearchText } = this.state;

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
          {enableSearchText
            ?
              <Toolbar className={classes.searchToolbar} disableGutters={true}>
                <SearchText fullWidth={true} placeholder="メッセージを検索"　className={classes.searchText} />
                <Button className={classes.cancelButton} onClick={this.handleSearchCancelClick}>キャンセル</Button>
              </Toolbar>
            :
              <Toolbar className={classes.toolbar} disableGutters={true}>
                <IconButton
                  className={classes.toolbarButton}
                  color="primary"
                  onClick={this.handleBackClick}
                >
                  <KeyboardArrowLeftIcon className={classes.toolbarIcon} />
                </IconButton>
                <Typography variant="subheading" className={classes.typography}>
                  {currentRoomName}
                </Typography>
                <IconButton
                  className={classes.toolbarButton}
                  color="primary"
                  onClick={this.handleSearchClick}
                >
                  <SearchIcon className={classes.toolbarIcon} />
                </IconButton>
                <IconButton
                  className={classes.toolbarButton}
                  color="primary"
                  onClick={this.handleRoomSettingClick}
                >
                  <InfoOutlineIcon className={classes.toolbarIcon} />
                </IconButton>
              </Toolbar>
          }
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
            <ImageInteraction
              position="bottom"
              isAlwaysDisplay={true}
              left={left}
              right={right}
            />
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
    currentUserId: state.user.user ? state.user.user.userId : '',
    messages: state.message.messageMap,
    scrollBottomAnimationDuration: state.message.scrollBottomAnimationDuration,
    roomResError: state.room.problemDetail,
    roomUsers: state.room.roomUsers,
    room: state.room.room,
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
    updateMessages: (messages: IMessage[]) => dispatch(updateMessagesActionCreator(messages)),
    markAsReadRequest: (roomId: string) => dispatch(markAsReadRequestActionCreator(roomId)),
    setProfileUserId: (profileUserId: string) => dispatch(setProfileUserIdActionCreator(profileUserId)),
    setSearchText: (searchText: string) => dispatch(setSearchTextActionCreator(searchText)),
  };
};

export const MessageList = connect<MapStateToProps, MapDispatchToProps, MessageListProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(MessageListComponent));
