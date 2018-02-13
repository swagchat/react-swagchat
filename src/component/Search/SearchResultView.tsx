import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { ListItem } from 'material-ui/List';
import SwipeableViews from 'react-swipeable-views';
import { TabContainer } from '../TabContainer';
import ListSubheader from 'material-ui/List/ListSubheader';
import {
  State,
  setSearchResultTabIndexActionCreator,
  SetSearchResultTabIndexAction,
  MessageActions,
  IMessage,
  IUserForRoom,
} from 'swagchat-sdk';
import { TextFlatItem } from '../../addons/messages/Text/TextFlatItem';

const listItemMargin = 10;
type fontWeightType = 'bold';

const styles = (theme: Theme) => ({
  progress: {
    marginTop: 50,
  },
  swipeableViews: {
    textAlign: 'center',
    width: '100%',
  },
  listSubheader: {
    textAlign: 'left',
    fontWeight: 'bold' as fontWeightType,
    height: 25,
    lineHeight: '25px',
  },
  listItem: {
    width: `calc(100% - ${listItemMargin * 2}px)`,
    margin: listItemMargin,
    padding: 0,
    border: `1px solid #ccc`,
    borderRadius: 5,
  }
});

type ClassNames = 
  'progress' |
  'swipeableViews' |
  'listSubheader' |
  'listItem'
;

interface MapStateToProps {
  searchResultTabIndex: number;
  currentUserId: string;
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
    const { classes, searchResultTabIndex, currentUserId, messages, roomUsers } = this.props;

    return (
      <SwipeableViews
        axis="x"
        index={searchResultTabIndex}
        onChangeIndex={this.handleTabChangeIndex}
        className={classes.swipeableViews}
      >
        <TabContainer dir="ltr">
          <ListSubheader className={classes.listSubheader}>メッセージ ( {Object.keys(messages).length} )</ListSubheader>
          {messages ? Object.keys(messages).map((key: string) => {
            switch (messages[key].type) {
              case 'text':
                return (
                  <ListItem key={key} button={true} className={classes.listItem}>
                    <TextFlatItem
                      message={messages[key]}
                      user={roomUsers![messages[key].userId]}
                      myUserId={currentUserId}
                      isLast={false}
                    />
                  </ListItem>
                );
              case 'image':
                return (<div />);
              default:
                return (<div />);
            }
          }) : <CircularProgress className={classes.progress} /> }
          <ListSubheader className={classes.listSubheader}>ファイル</ListSubheader>
        </TabContainer>
        <TabContainer dir="ltr">
          <CircularProgress className={classes.progress} />
        </TabContainer>
        <TabContainer dir="ltr">
          <p>ファイル</p>
        </TabContainer>
      </SwipeableViews>
    );
  }
}

const mapStateToProps = (state: State, ownProps: SearchResultViewProps) => {
  return {
    searchResultTabIndex: state.message.searchResultTabIndex,
    currentUserId: state.client.userId,
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
