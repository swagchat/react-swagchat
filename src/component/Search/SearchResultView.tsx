import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import SwipeableViews from 'react-swipeable-views';
import { TabContainer } from '../TabContainer';
import {
  State,
  setSearchResultTabIndexActionCreator,
  SetSearchResultTabIndexAction,
  MessageActions,
} from 'swagchat-sdk';

const styles = (theme: Theme) => ({
  root: {},
});

type ClassNames = 
  'root'
;

interface MapStateToProps {
  searchResultTabIndex: number;
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
    const { searchResultTabIndex } = this.props;

    return (
      <SwipeableViews
        axis="x"
        index={searchResultTabIndex}
        onChangeIndex={this.handleTabChangeIndex}
      >
        <TabContainer dir="ltr">
          <LinearProgress />
        </TabContainer>
        <TabContainer dir="ltr">
          <p>未読</p>
        </TabContainer>
        <TabContainer dir="ltr">
          <p>オンライン中</p>
        </TabContainer>
      </SwipeableViews>
    );
  }
}

const mapStateToProps = (state: State, ownProps: SearchResultViewProps) => {
  return {
    searchResultTabIndex: state.message.searchResultTabIndex,
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
