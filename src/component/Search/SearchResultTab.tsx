import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import {
  State,
  setSearchResultTabIndexActionCreator,
  SetSearchResultTabIndexAction,
  MessageActions,
} from 'swagchat-sdk';
import {
  TAB_HEIGHT,
} from '../../setting';

const styles = (theme: Theme) => ({
  tabs: {
    backgroundColor: theme.palette.common.white,
  },
  tab: {
    marginTop: 12,
    height: TAB_HEIGHT,
    flexBasis: '33%',
    minWidth: '33%',
    backgroundColor: theme.palette.common.white,
  },
});

type ClassNames = 
  'tabs' |
  'tab'
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
        <Tab label="全て" className={classes.tab} />
        <Tab label="メッセージ" className={classes.tab} />
        <Tab label="ファイル" className={classes.tab} style={{paddingLeft: 0, paddingRight: 0}} />
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
