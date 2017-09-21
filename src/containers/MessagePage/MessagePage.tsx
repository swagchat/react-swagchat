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
  unsubscribeMessage,

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
  private isReceiveMessagesFinished = false;
  private onScroll: EventListener;

  private updateMessages = () => {
    if (!this.props.roomState.room) {
      return;
    }
    fetchMessagesRequestActionDispatch();
    if (this.props.messageState.messages) {
      console.info('%c[ReactSwagChat]Loaded message count [' + Object.keys(this.props.messageState.messages).length + ']', 'color:' + logColor);
      if (this.props.messageState.messagesAllCount <= Object.keys(this.props.messageState.messages).length) {
        this.isReceiveMessagesFinished = true;
      }
    }
  }

  private handleScroll = () => {
    if (this.isReceiveMessagesFinished) {
      console.info('%c[ReactSwagChat]Remove scroll EventListener', 'color:' + logColor);
      window.removeEventListener('scroll', this.onScroll);
      return;
    }
    const scrollPosition = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
    if (scrollPosition < 100) {
      this.updateMessages();
    }
  }

  componentDidMount() {
    this.onScroll = throttle(this.handleScroll, 100);
    console.info('%c[ReactSwagChat]Add scroll EventListener', 'color:' + logColor);
    window.addEventListener('scroll', this.onScroll);
    updateAddonMessageMenuIndexActionDispatch(0);
    Scroll.animateScroll.scrollToBottom({duration: 0});
  }

  componentWillUnmount() {
    console.info('%c[ReactSwagChat]Remove scroll EventListener', 'color:' + logColor);
    window.removeEventListener('scroll', this.onScroll);
    updateAddonMessageMenuIndexActionDispatch(0);
    unsubscribeMessage(this.props.roomState.room!.roomId!);
  }

  onRoomSetting() {
    if (this.props.history) {
      store.dispatch(push(this.props.settingState.roomSettingRoutePath + '/' + this.props.roomState.room!.roomId));
    }
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
              src={pictureUrl ? pictureUrl : settingState.noAvatarImages[0]}
              shape="square"
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
          messages={messageState.messages}
          roomUsers={roomState.roomUsers}
          addonMessages={pluginState.messages}
          customAddonMessages={pluginState.customMessages}
          noMessageImage={settingState.noMessageImage}
          noMessageText={settingState.noMessageText}
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
