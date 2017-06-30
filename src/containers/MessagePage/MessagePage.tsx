import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as Scroll from 'react-scroll';
import { throttle } from 'lodash';
import { IRoom, RoomType } from 'swagchat-sdk';
import { opponentUser } from '../../utils';
import {
  MessageBody,
  TopBar,
  Button,
  Back,
  Avatar,
  logColor,
} from '../../';
import {
  State,
  store,
  IClientState,
  IPluginState,
  IUserState,
  IRoomState,
  IMessageState,
  IStyleState,
  ISettingState
} from '../../stores';
import {
  IMarkAsReadRequestAction,
  markAsReadRequestActionCreator,
} from  '../../actions/user';
import {
  IRoomUpdateRequestAction,
  roomUpdateRequestActionCreator,
} from '../../actions/room';
import {
  ICombinedAssetPostAndSendMessageRequestAction,
  combinedAssetPostAndSendMessageRequestActionCreator,
} from '../../actions/combined';
import {
  pluginMessageUpdateMenuIndexActionCreator,
  IPluginMessageUpdateMenuIndexAction,
} from '../../actions/plugin';
import {
  IUpdateStyleAction,
  updateStyleActionCreator,
} from '../../actions/style';
import {
  IMessagesFetchRequestAction,
  ISendMessagesAction,
  ICreateMessageAction,
  messagesFetchRequestActionCreator,
  createMessageActionCreator,
  sendMessagesActionCreator,
} from '../../actions/message';

export interface IProps extends RouteComponentProps<any> {
  pluginState: IPluginState;
  clientState: IClientState;
  userState: IUserState;
  roomState: IRoomState;
  messageState: IMessageState;
  styleState: IStyleState;
  settingState: ISettingState;
  messagesFetchRequest: () => IMessagesFetchRequestAction;
  createMessage: (messageType: string, payload: Object) => ICreateMessageAction;
  sendMessages: () => ISendMessagesAction;
  updateMenuIndex: (currentMenuIndex: number) => IPluginMessageUpdateMenuIndexAction;
  updateStyle: (style: Object) => IUpdateStyleAction;
  assetPostAndSendMessage: (file: Blob) => ICombinedAssetPostAndSendMessageRequestAction;
  markAsRead: (roomId: string) => IMarkAsReadRequestAction;
  updateRoom: (putRoom: IRoom) => IRoomUpdateRequestAction;
}

export class MessagePage extends React.Component<IProps, void> {
  private isReceiveMessagesFinished = false;
  private onScroll: EventListener;

  private updateMessages = () => {
    if (!this.props.roomState.room) {
      return;
    }
    this.props.messagesFetchRequest();
    console.info('%c[ReactSwagChat]Loaded message count [' + Object.keys(this.props.messageState.messages).length + ']', 'color:' + logColor);
    if (this.props.messageState.messagesAllCount <= Object.keys(this.props.messageState.messages).length) {
      this.isReceiveMessagesFinished = true;
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
    this.props.updateMenuIndex(0);
    Scroll.animateScroll.scrollToBottom({duration: 0});
  }

  componentWillUnmount() {
    console.info('%c[ReactSwagChat]Remove scroll EventListener', 'color:' + logColor);
    window.removeEventListener('scroll', this.onScroll);
    this.props.updateMenuIndex(0);
    this.props.roomState.room!.unsubscribeMessage();
  }

  onRoomSetting() {
    if (this.props.history) {
      store.dispatch(push('/roomSetting/' + this.props.roomState.room!.roomId));
    }
  }

  render(): JSX.Element  {
    if (!(this.props.roomState && this.props.roomState.room)) {
      return <div />;
    }
    let name = this.props.roomState.room!.name ? this.props.roomState.room!.name : '';
    let pictureUrl = this.props.roomState.room!.pictureUrl ? this.props.roomState.room!.pictureUrl : '';
    if (this.props.roomState.room!.type === RoomType.ONE_ON_ONE) {
      const users = opponentUser(this.props.roomState.room!.users!, this.props.userState.user!.userId);
      if (users && users.length > 0) {
        name = users[0].name;
        pictureUrl = users[0].pictureUrl;
      }
    }
    return (
      <div>
        <TopBar
          title={name}
          leftButton={<Button icon={<Back />} onClick={this.props.history.goBack} />}
          rightButton={<Avatar
            onClick={this.onRoomSetting.bind(this)}
            src={pictureUrl}
            width={30}
            height={30}
            margin={9}
          />}
        />
        <MessageBody
          pluginState={this.props.pluginState}
          userState={this.props.userState}
          roomState={this.props.roomState}
          messageState={this.props.messageState}
          styleState={this.props.styleState}
          createMessage={this.props.createMessage}
          sendMessages={this.props.sendMessages}
          updateMenuIndex={this.props.updateMenuIndex}
          updateStyle={this.props.updateStyle}
          settingState={this.props.settingState}
          assetPostAndSendMessage={this.props.assetPostAndSendMessage}
          markAsRead={this.props.markAsRead}
          updateRoom={this.props.updateRoom}
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

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IProps) => {
  ownProps; // TODO
  return {
    messagesFetchRequest: () => dispatch(messagesFetchRequestActionCreator()),
    createMessage: (messageType: string, payload: Object) => dispatch(createMessageActionCreator(messageType, payload)),
    sendMessages: () => dispatch(sendMessagesActionCreator()),
    updateMenuIndex: (currentMenuIndex: number) => dispatch(pluginMessageUpdateMenuIndexActionCreator(currentMenuIndex)),
    updateStyle: (style: Object) => dispatch(updateStyleActionCreator(style)),
    assetPostAndSendMessage: (file: Blob) => dispatch(combinedAssetPostAndSendMessageRequestActionCreator(file)),
    markAsRead: (roomId: string) => dispatch(markAsReadRequestActionCreator(roomId)),
    updateRoom: (putRoom: IRoom) => dispatch(roomUpdateRequestActionCreator(putRoom)),
  };
};

export const ContainerMessagePage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagePage));