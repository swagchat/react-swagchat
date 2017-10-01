import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IRoomForUser, State, store, IAddonRoomListItem } from 'swagchat-sdk';
import { push } from 'react-router-redux';
import {
  RoomList,
  TopBar,
  Button,
} from '../../components';
import * as styles from './room-list-page.css';
const classNames = require('classnames');

export interface IReduxRoomListProps extends RouteComponentProps<any> {
  roomListTitle: string;
  userId: string;
  userRooms: IRoomForUser[];
  roomListItems: {[key: number]: IAddonRoomListItem};
  customRoomListItems: {[key: number]: IAddonRoomListItem};
  noRoomListText: string;
  noRoomListImage: string;
  noAvatarImages: string[];
  roomListRoutePath: string;
  messageRoutePath: string;
  selectContactRoutePath: string;
  roomListTabbar?: React.ComponentClass<any>;
}

class ReduxRoomListPage extends React.Component<IReduxRoomListProps, any> {
  onItemTap(room: IRoomForUser) {
    if (this.props.history) {
      store.dispatch(push(this.props.messageRoutePath + '/' + room.roomId));
    }
  }

  onCreateRoomButton() {
    if (this.props.history) {
      store.dispatch(push(this.props.selectContactRoutePath));
    }
  }

  render(): JSX.Element  {
    const {userId, userRooms, roomListTitle, roomListItems, customRoomListItems, roomListTabbar, noRoomListText, noRoomListImage, noAvatarImages} = this.props;
    const rootClassName = classNames(styles.topBar, roomListTabbar ? styles.tabBar : '');
    return (
      <div>
        <TopBar
          title={roomListTitle}
          rightButton={
            <Button
              icon={<i className="material-icons">open_in_new</i>} onClick={this.onCreateRoomButton.bind(this)}
              shape="square"
              color="linkPrimary"
            />
          }
        />
        <RoomList
          className={rootClassName}
          myUserId={userId}
          userRooms={userRooms}
          roomListItems={roomListItems}
          customRoomListItems={customRoomListItems}
          noRoomListText={noRoomListText}
          noRoomListImage={noRoomListImage}
          noAvatarImages={noAvatarImages}
          onClick={this.onItemTap.bind(this)}
        />
        {roomListTabbar ? roomListTabbar : null}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  if (state.client.client && state.user.user) {
    return {
      userId: state.user.user.userId,
      userRooms: state.user.user.rooms,
      roomListTitle: state.setting.roomListTitle,
      roomListItems: state.addon.roomListItems,
      customRoomListItems: state.addon.customRoomListItems,
      noRoomListText: state.setting.noRoomListText,
      noRoomListImage: state.setting.noRoomListImage,
      noAvatarImages: state.setting.noAvatarImages,
      roomListRoutePath: state.setting.roomListRoutePath,
      messageRoutePath: state.setting.messageRoutePath,
      selectContactRoutePath: state.setting.selectContactRoutePath,
      roomListTabbar: state.setting.roomListTabbar,
    };
  }
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IReduxRoomListProps) => {
  dispatch; // TODO
  ownProps; // TODO
  return {};
};

export const RoomListPage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxRoomListPage));
