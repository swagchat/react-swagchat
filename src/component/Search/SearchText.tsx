import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as classNames from 'classnames';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import SearchIcon from 'material-ui-icons/Search';
import { fade } from 'material-ui/styles/colorManipulator';
import {
  State,
  setSearchTextActionCreator,
  SetSearchTextAction,
  MessageActions,
} from 'swagchat-sdk';
import {
  SEARCH_FORM_HEIGHT,
} from '../../setting';

type positionType = 'relative' | 'absolute';
type alignItemsType = 'center';
type justifyContentType = 'center';

const styles = (theme: Theme) => ({
  root: {
    height: SEARCH_FORM_HEIGHT,
    position: 'relative' as positionType,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    background: fade(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   background: fade(theme.palette.common.white, 0.25),
    // },
  },
  root100: {
    '& $input': {
      width: '100%',
    },
  },
  rootCustom: {
    '& $input': {
      transition: theme.transitions.create('width'),
      width: '13em',
      '&:focus': {
        width: '20em',
      },
    },
  },
  search: {
    width: theme.spacing.unit * 5,
    height: '100%',
    position: 'absolute' as positionType,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center' as alignItemsType,
    justifyContent: 'center' as justifyContentType,
    color: fade(theme.palette.common.white, 0.7),
  },
  searchBlack: {
    color: fade(theme.palette.common.black, 0.3),
  },
  input: {
    fontSize: '0.8em',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 5}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    width: '100%',
    height: '100%',
    color: theme.palette.common.white,
    '&:focus': {
      outline: 0,
    },
    '&::-webkit-input-placeholder': {
      color: fade(theme.palette.common.white, 0.7),
    },
    '&::-moz-placeholder': {
      color: fade(theme.palette.common.white, 0.7),
    },
  },
  inputBlack: {
    color: theme.palette.common.black,
    '&::-webkit-input-placeholder': {
      color: fade(theme.palette.common.black, 0.3),
    },
    '&::-moz-placeholder': {
      color: fade(theme.palette.common.black, 0.3),
    },
  }
});

type ClassNames = 
  'root' |
  'root100' |
  'rootCustom' |
  'search' |
  'searchBlack' |
  'input' |
  'inputBlack'
;

interface MapStateToProps {
  searchText: string;
}

interface MapDispatchToProps {
  setSearchText: (searchText: string) => SetSearchTextAction;
}

export interface SearchTextProps {
  fullWidth?: boolean;
  enableBorder?: boolean;
}

class SearchTextComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & SearchTextProps, {}> {

  handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setSearchText(event.target.value);
  }

  render() {
    const { classes, fullWidth } = this.props;

    const rootClass = fullWidth === true
      ? classNames(classes.root, classes.root100)
      : classNames(classes.root, classes.rootCustom);

    const searchClass = fullWidth === true
      ? classNames(classes.search, classes.searchBlack)
      : classNames(classes.search);

    const inputClass = fullWidth === true
    ? classNames(classes.input, classes.inputBlack)
    : classNames(classes.input);

    return (
      <div className={rootClass}>
        <div className={searchClass}>
          <SearchIcon />
        </div>
        <input
          className={inputClass}
          onChange={(e) => this.handleSearchText(e)}
          placeholder="メッセージを検索"
        />
    </div>

      // <div className={classes.root} style={width !== undefined ? {width: width} : {}}>
      //   <FormControl className={classes.searchFormControl} style={width !== undefined ? {width: width} : {}}>
      //     <TextField
      //       value={searchText}
      //       margin="normal"
      //       autoFocus={true}
      //       placeholder="検索キーワードを入力してください"
      //       InputProps={{
      //         disableUnderline: true,
      //         classes: {
      //           root: classes.textFieldRoot,
      //           input: classes.textFieldInput,
      //         },
      //       }}
      //       InputLabelProps={{
      //         shrink: true,
      //         className: classes.textFieldFormLabel,
      //       }}
      //       onChange={(e) => this.handleSearchText(e)}
      //     />
      //   </FormControl>
      // </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: SearchTextProps) => {
  return {
    searchText: state.message.searchText,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<MessageActions>, ownProps: SearchTextProps) => {
  return {
    setSearchText: (searchText: string) => dispatch(setSearchTextActionCreator(searchText)),
  };
};

export const SearchText = connect<MapStateToProps, MapDispatchToProps, SearchTextProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SearchTextComponent));
