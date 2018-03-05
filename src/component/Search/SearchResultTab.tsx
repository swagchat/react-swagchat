import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import {
  State,
  SetSearchResultTabIndexAction, setSearchResultTabIndexActionCreator,
  MessageActions,
} from 'swagchat-sdk';

const styles = (theme: Theme) => ({
  tabs: {
  },
});

type ClassNames = 
  'tabs'
;

interface MapStateToProps {
  searchResultTabIndex: number;
}

interface MapDispatchToProps {
  setSearchResultTabIndex: (searchResultTabIndex: number) => SetSearchResultTabIndexAction;
}

export interface SearchResultTabProps {
}

class SearchResultTabComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & SearchResultTabProps, {}> {
  state = {
    tabIndex: 0,
  };

  handleTabChange = (e: {}, index: number) => {
    this.props.setSearchResultTabIndex(index);
  }

  render() {
    const { classes, searchResultTabIndex } = this.props;

    return (
      <Tabs
        className={classes.tabs}
        value={searchResultTabIndex}
        onChange={this.handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        fullWidth={true}
        centered={true}
      >
        <Tab label="全て" />
        <Tab label="メッセージ" />
        <Tab label="ファイル" />
      </Tabs>
    );
  }
}

const mapStateToProps = (state: State, ownProps: SearchResultTabProps) => {
  return {
    searchResultTabIndex: state.message.searchResultTabIndex,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<MessageActions>, ownProps: SearchResultTabProps) => {
  return {
    setSearchResultTabIndex: (searchResultTabIndex: number) =>
      dispatch(setSearchResultTabIndexActionCreator(searchResultTabIndex)),
  };
};

export const SearchResultTab = connect<MapStateToProps, MapDispatchToProps, SearchResultTabProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SearchResultTabComponent));
