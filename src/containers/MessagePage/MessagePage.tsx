import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as Scroll from 'react-scroll';
import { throttle } from 'lodash';
import {
  RoomType,
  State,
  store,
  IClientState,
  IAddonState,
  IUserState,
  IRoomState,
  IMessageState,
  IStyleState,
  ISettingState,
  updateAddonMessageMenuIndexActionDispatch,
  fetchMessagesRequestActionDispatch,
  logColor,
  opponentUser,
} from 'swagchat-sdk';
import {
  MessageMenu,
  MessageInteraction,
  MessageBody,
  TopBar,
  Button,
  Avatar,
} from '../../components';
import * as styles from './message-page.css';
const classNames = require('classnames');

export interface IReduxMessageProps extends RouteComponentProps<any> {
  pluginState: IAddonState;
  clientState: IClientState;
  userState: IUserState;
  roomState: IRoomState;
  messageState: IMessageState;
  styleState: IStyleState;
  settingState: ISettingState;
}

export class ReduxMessage extends React.Component<IReduxMessageProps, {}> {
  private _isReceiveMessagesFinished = false;
  private _onScroll: EventListener;
  private _previousBodyHeight = 0;

  private updateMessages = () => {
    if (!this.props.roomState.room) {
      return;
    }
    fetchMessagesRequestActionDispatch();
    if (this.props.messageState.messageMap) {
      console.info('%c[ReactSwagChat]Loaded message count [' + Object.keys(this.props.messageState.messageMap).length + ']', 'color:' + logColor);
      if (this.props.messageState.messagesAllCount <= Object.keys(this.props.messageState.messageMap).length) {
        this._isReceiveMessagesFinished = true;
      }
    }
  }

  private _scrollBottom = () => {
    const scrollPosition = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
    if (this._previousBodyHeight - scrollPosition < 200) {
      const state: State = store.getState();
      Scroll.animateScroll.scrollToBottom({duration: state.message.scrollBottomAnimationDuration});
      this._previousBodyHeight = document.documentElement.offsetHeight - document.documentElement.clientHeight;
    }
  }

  private _handleScroll = () => {
    const scrollPosition = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
    if (this._isReceiveMessagesFinished) {
      console.info('%c[ReactSwagChat]Remove scroll EventListener', 'color:' + logColor);
      window.removeEventListener('scroll', this._onScroll);
      return;
    }
    if (scrollPosition < 100) {
      this.updateMessages();
    }
  }

  componentDidMount() {
    this._onScroll = throttle(this._handleScroll, 100);
    console.info('%c[ReactSwagChat]Add scroll EventListener', 'color:' + logColor);
    window.addEventListener('scroll', this._onScroll);
    updateAddonMessageMenuIndexActionDispatch(0);
  }

  componentDidUpdate() {
    const state: State = store.getState();
    const pathname = state.router.location!.pathname;
    let messagePathRegExp = state.setting.client!.messageRoutePath ? pathname.match(new RegExp('^' + state.setting.client!.messageRoutePath)) : null;
    if (messagePathRegExp) {
      this._scrollBottom();
    }
  }

  componentWillUnmount() {
    console.info('%c[ReactSwagChat]Remove scroll EventListener', 'color:' + logColor);
    window.removeEventListener('scroll', this._onScroll);
    updateAddonMessageMenuIndexActionDispatch(0);
    this.props.clientState.currentRoom!.unsubscribeMessage();
  }

  onRoomSetting() {
    if (this.props.history) {
      store.dispatch(push(this.props.settingState.client!.roomSettingRoutePath + '/' + this.props.roomState.room!.roomId));
    }
  }

  onRenderComplete = () => {
    this._scrollBottom();
  }

  render(): JSX.Element  {
    const {
      roomState,
      styleState,
      settingState,
      userState,
      pluginState,
      history,
      messageState,
    } = this.props;
    if (!(roomState && roomState.room)) {
      return <div />;
    }
    let name = roomState.room!.name!;
    let pictureUrl = roomState.room!.pictureUrl ? roomState.room!.pictureUrl : '';
    if (roomState.room!.type === RoomType.ONE_ON_ONE) {
      const users = opponentUser(roomState.room!.users!, userState.user!.userId);
      if (users && users.length > 0) {
        name = users[0].name;
        pictureUrl = users[0].pictureUrl;
      }
    }

    const rootClassName = classNames(styles.topBar, styles.tabBar);

    return (
      <div className={rootClassName}>
        <TopBar
          title={name}
          leftButton={
            <Button
              icon={<i className="material-icons">keyboard_arrow_left</i>} onClick={history.goBack}
              shape="square"
              color="linkPrimary"
            />
          }
          rightButton={
            <Avatar
              src={pictureUrl ? pictureUrl : settingState.server!.values.noAvatarImages[0]}
              className={styles.topBarAvatar}
              onClick={this.onRoomSetting.bind(this)}
            />
          }
        />
        <div className={classNames(styles.menu, styles.top)} style={styleState.messageBodyMenuStyle}>
          <MessageMenu
            position="top"
            addonMessages={pluginState.messages}
            customAddonMessages={pluginState.customMessages}
            user={userState.user!}
            room={roomState.room!}
            currentMenuIndex={pluginState.currentMenuIndex}
            availableMessageTypes={roomState.room!.availableMessageTypes!}
          />
          <MessageInteraction
            position="top"
            isAlwaysDisplay={false}
            addonMessages={pluginState.messages}
            customAddonMessages={pluginState.customMessages}
            currentMenuIndex={pluginState.currentMenuIndex}
            settingState={settingState}
            user={userState.user!}
            room={roomState.room!}
            availableMessageTypes={roomState.room!.availableMessageTypes!}
          />
        </div>
        <MessageBody
          myUserId={userState.user!.userId}
          messages={messageState.messageMap}
          roomUsers={roomState.roomUsers}
          addonMessages={pluginState.messages}
          customAddonMessages={pluginState.customMessages}
          noMessageImage={settingState.server!.values.noMessageImage}
          noMessageText={settingState.server!.values.noMessageText}
          onRenderComplete={this.onRenderComplete.bind(this)}
        />
        <div className={classNames(styles.menu, styles.bottom)} style={styleState.messageBodyMenuStyle}>
          <MessageMenu
            position="bottom"
            addonMessages={pluginState.messages}
            customAddonMessages={pluginState.customMessages}
            user={userState.user!}
            room={roomState.room!}
            currentMenuIndex={pluginState.currentMenuIndex}
            availableMessageTypes={roomState.room!.availableMessageTypes!}
          />
          <MessageInteraction
            position="bottom"
            isAlwaysDisplay={false}
            addonMessages={pluginState.messages}
            customAddonMessages={pluginState.customMessages}
            currentMenuIndex={pluginState.currentMenuIndex}
            settingState={settingState}
            user={userState.user!}
            room={roomState.room!}
            availableMessageTypes={roomState.room!.availableMessageTypes!}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  if (state.client.client && state.user.user) {
    return {
      pluginState: state.addon,
      clientState: state.client,
      userState: state.user,
      roomState: state.room,
      messageState: state.message,
      styleState: state.style,
      settingState: state.setting,
    };
  }
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IReduxMessageProps) => {
  ownProps; // TODO
  dispatch; // TODO
  return {};
};

export const MessagePage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxMessage));
