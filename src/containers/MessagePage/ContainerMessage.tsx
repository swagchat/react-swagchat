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
  IPluginState,
  IUserState,
  IRoomState,
  IMessageState,
  IStyleState,
  ISettingState,
  pluginMessageUpdateMenuIndexActionDispatch,
  messagesFetchRequestActionDispatch,
  logColor,
  opponentUser,
  unsubscribeMessage,
} from 'swagchat-sdk';
import {
  MessageBody,
  TopBar,
  Button,
  Back,
  Avatar,
} from '../../components';

export interface IReduxMessageProps extends RouteComponentProps<any> {
  pluginState: IPluginState;
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
    messagesFetchRequestActionDispatch();
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

    if (document.body.scrollTop < 100) {
      this.updateMessages();
    }
  }

  componentDidMount() {
    this.onScroll = throttle(this.handleScroll, 100);
    console.info('%c[ReactSwagChat]Add scroll EventListener', 'color:' + logColor);
    window.addEventListener('scroll', this.onScroll);
    pluginMessageUpdateMenuIndexActionDispatch(0);
    Scroll.animateScroll.scrollToBottom({duration: 0});
  }

  componentWillUnmount() {
    console.info('%c[ReactSwagChat]Remove scroll EventListener', 'color:' + logColor);
    window.removeEventListener('scroll', this.onScroll);
    pluginMessageUpdateMenuIndexActionDispatch(0);
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
      settingState,
      userState,
      pluginState,
      history,
      messageState,
      styleState,
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
    return (
      <div>
        <TopBar
          title={name}
          leftButton={<Button icon={<Back />} onClick={history.goBack} />}
          rightButton={<Avatar
            onClick={this.onRoomSetting.bind(this)}
            src={pictureUrl ? pictureUrl : settingState.noAvatarImages[0]}
            width="30px"
            height="30px"
            margin="9px"
          />}
        />
        <MessageBody
          pluginState={pluginState}
          userState={userState}
          roomState={roomState}
          messageState={messageState}
          styleState={styleState}
          settingState={settingState}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  if (state.client.client && state.user.user) {
    return {
      pluginState: state.plugin,
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

export const ContainerMessage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxMessage));
