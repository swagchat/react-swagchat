import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import SwipeableViews from 'react-swipeable-views';
import { TabContainer } from '../TabContainer';
import ListSubheader from 'material-ui/List/ListSubheader';
import {
  State, IMessage, IUserForRoom, IUser,
  SetSearchResultTabIndexAction, setSearchResultTabIndexActionCreator,
  MessageActions,
} from 'swagchat-sdk';
import { TextFlatItem } from '../../addons/messages/Text/TextFlatItem';
import { TAB_HEIGHT } from '../../setting';

const styles = (theme: Theme) => ({
  progress: {
    marginTop: 50,
  },
  swipeableViews: {
    textAlign: 'center',
    width: '100%',
    marginBottom: TAB_HEIGHT + 12,
  },
  listSubheader: {
    textAlign: 'left',
    fontWeight: 'bold' as 'bold',
    height: 25,
    lineHeight: '25px',
  },
});

type ClassNames = 
  'progress' |
  'swipeableViews' |
  'listSubheader'
;

interface MapStateToProps {
  searchResultTabIndex: number;
  user: IUser | null;
  messages: {[key: string]: IMessage};
  roomUsers: {[key: string]: IUserForRoom} | null;
}

interface MapDispatchToProps {
  setSearchResultTabIndex: (searchResultTabIndex: number) => SetSearchResultTabIndexAction;
}

export interface SearchResultViewProps {
  top?: number;
  left?: number;
  width?: number;
}

class SearchResultViewComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & SearchResultViewProps, {}> {
  state = {
    tabIndex: 0,
  };

  handleTabChangeIndex = (index: number) => {
    this.props.setSearchResultTabIndex(index);
  }

  render() {
    const { classes, searchResultTabIndex, user, messages, roomUsers } = this.props;

    if (user === null) {
      return <div>loading ...</div>;
    }

    return (
      <SwipeableViews
        axis="x"
        index={searchResultTabIndex}
        onChangeIndex={this.handleTabChangeIndex}
        className={classes.swipeableViews}
      >
        <TabContainer key="searchresult-tab-container-1" dir="ltr">
          <ListSubheader className={classes.listSubheader}>メッセージ ( {Object.keys(messages).length} )</ListSubheader>
          {messages ? Object.keys(messages).map((key: string) => {
            switch (messages[key].type) {
              case 'text':
                return (
                  <TextFlatItem
                    key={key}
                    message={messages[key]}
                    user={roomUsers![messages[key].userId]}
                    myUserId={user.userId}
                    isLast={false}
                    isSearchResult={true}
                  />
                );
              case 'image':
                return (<div />);
              default:
                return (<div />);
            }
          }) : <CircularProgress className={classes.progress} /> }
          <ListSubheader className={classes.listSubheader}>ファイル</ListSubheader>
        </TabContainer>
        <TabContainer key="searchresult-tab-container-2" dir="ltr">
          <CircularProgress className={classes.progress} />
        </TabContainer>
        <TabContainer key="searchresult-tab-container-3" dir="ltr">
          <p>ファイル</p>
        </TabContainer>
      </SwipeableViews>
    );
  }
}

const mapStateToProps = (state: State, ownProps: SearchResultViewProps) => {
  return {
    searchResultTabIndex: state.message.searchResultTabIndex,
    user: state.user.user,
    messages: state.message.messageMap,
    roomUsers: state.room.roomUsers,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<MessageActions>, ownProps: SearchResultViewProps) => {
  return {
    setSearchResultTabIndex: (searchResultTabIndex: number) =>
      dispatch(setSearchResultTabIndexActionCreator(searchResultTabIndex)),
  };
};

export const SearchResultView = connect<MapStateToProps, MapDispatchToProps, SearchResultViewProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SearchResultViewComponent));
