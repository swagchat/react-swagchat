import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  IUser,
  RoomType,
  State,
  IUserState,
  IRoomState,
  IStyleState,
  ISettingState,
  opponentUser,
} from 'swagchat-sdk';
import {
  TopBar,
  RoomSettingButtons,
  Avatar,
  SubTitleBar,
  Button,
} from '../../components';
import * as indexStyles from '../../index.css';
import * as styles from './room-setting-page.css';
const classNames = require('classnames');

export interface IReduxRoomSettingProps extends RouteComponentProps<any> {
  title: string;
  userState: IUserState;
  userBlocks: string[];
  roomState: IRoomState;
  styleState: IStyleState;
  settingState: ISettingState;
  roomListTabbar?: React.ComponentClass<any>;
}

class ReduxRoomSetting extends React.Component<IReduxRoomSettingProps, {}> {
  onItemTap(user: IUser) {
    console.log(user);
  }

  render(): JSX.Element  {
    const {
      settingState,
      roomState,
      userState,
      userBlocks,
      history,
      roomListTabbar,
    } = this.props;
    if (!(roomState && roomState.room)) {
      return <div />;
    }
    let pictureUrl = roomState.room!.pictureUrl ? roomState.room!.pictureUrl : '';
    let name = roomState.room!.name!;
    if (roomState.room!.type === RoomType.ONE_ON_ONE) {
      const users = opponentUser(roomState.room!.users!, userState.user!.userId);
      if (users && users.length > 0) {
        pictureUrl = users[0].pictureUrl;
        name = users[0].name;
      }
    }

    const rootClassName = classNames(styles.root, styles.topBar, roomListTabbar ? styles.tabBar : '');

    return (
      <div className={rootClassName}>
        <TopBar
          title={settingState.roomSettingTitle}
          leftButton={
            <Button
              color="linkPrimary"
              icon={<i className="material-icons">keyboard_arrow_left</i>} onClick={history.goBack}
            />
          }
        />
        <Button
          position="left"
          color="linkBlack"
          shape="square"
          className={styles.roomButton}
          text={name}
          icon={<Avatar src={pictureUrl ? pictureUrl : settingState.noAvatarImages[0]} style={{width: '80px', height: '80px'}} />}
        />
        <RoomSettingButtons
          userId={userState.user!.userId}
          userBlocks={userBlocks}
          room={roomState.room}
          noAvatarImages={settingState.noAvatarImages}
          displayNoDataText="No contacts."
          onItemTap={this.onItemTap.bind(this)}
        />
        {(roomState.room!.type !== RoomType.ONE_ON_ONE && roomState.room!.isShowUsers && roomState.room!.type !== RoomType.NOTICE_ROOM) ? (
          <div className={indexStyles.layoutBox1}>
            <SubTitleBar title={settingState.roomMembersTitle} />
            {roomState.room!.users!.map((user, i) =>
              <Button
                key={'member-list-item-' + i}
                className={styles.membersBlockButton}
                position="left"
                shape="square"
                color="linkBlack"
                text={user.name}
                icon={<Avatar src={user.pictureUrl} style={{width: '40px', height: '40px'}} />}
                style={{padding: '10px'}}
              />
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  if (state.client.client && state.user.user) {
    return {
      userState: state.user,
      userBlocks: state.user.blocks,
      roomState: state.room,
      styleState: state.style,
      settingState: state.setting,
    };
  }
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IReduxRoomSettingProps) => {
  dispatch; // TODO
  ownProps; // TODO
  return {};
};

export const RoomSettingPage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxRoomSetting));
