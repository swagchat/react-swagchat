import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as classNames from 'classnames';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import CloseIcon from 'material-ui-icons/Close';
import { fade } from 'material-ui/styles/colorManipulator';
import {
  State,
  SetSearchTextAction, setSearchTextActionCreator,
  MessageActions,
} from 'swagchat-sdk';
import {
  SEARCH_FORM_HEIGHT, BORDER_RADIUS,
} from '../../setting';

const styles = (theme: Theme) => ({
  root: {
    height: SEARCH_FORM_HEIGHT,
    position: 'relative' as 'relative',
    display: 'flex',
    backgroundColor: '#efefef',
    borderRadius: BORDER_RADIUS,
    boxFlex: 1,
    margin: '4px 10px',
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
  searchIcon: {
    width: theme.spacing.unit * 5,
    height: '100%',
    position: 'absolute' as 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    color: fade(theme.palette.grey.A700, 0.7),
  },
  searchBlack: {
    color: fade(theme.palette.common.black, 0.3),
  },
  input: {
    fontSize: '0.8em',
    textAlign: 'left',
    overflowY: 'scroll' as 'scroll',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 5}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 5}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    width: '100%',
    color: theme.palette.grey.A700,
    '&:focus': {
      outline: 0,
    },
    '&::-webkit-input-placeholder': {
      color: fade(theme.palette.grey.A700, 0.7),
    },
    '&::-moz-placeholder': {
      color: fade(theme.palette.grey.A700, 0.7),
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
  },
  clearIcon: {
    right: 0,
    width: theme.spacing.unit * 5,
    height: '100%',
    position: 'absolute' as 'absolute',
    display: 'flex',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    color: fade(theme.palette.grey.A700, 0.7),
  },
});

type ClassNames = 
  'root' |
  'root100' |
  'rootCustom' |
  'searchIcon' |
  'searchBlack' |
  'input' |
  'inputBlack' |
  'clearIcon'
;

interface MapStateToProps {
  searchText: string;
}

interface MapDispatchToProps {
  setSearchText: (searchText: string) => SetSearchTextAction;
}

export interface SearchTextProps {
  className?: string;
  style?: Partial<React.CSSProperties>;
  fullWidth?: boolean;
  enableBorder?: boolean;
  placeholder?: string;
}

class SearchTextComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & SearchTextProps, {}> {

  handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setSearchText(event.target.value);
  }

  handleClearClick = () => {
    if (this.props.searchText !== '') {
      this.props.setSearchText('');
    }
  }

  render() {
    const { classes, className, style, fullWidth, searchText, placeholder } = this.props;

    const rootClass = fullWidth === true
      ? classNames(classes.root, classes.root100, className)
      : classNames(classes.root, classes.rootCustom, className);

    const searchClass = fullWidth === true
      ? classNames(classes.searchIcon)
      : classNames(classes.searchIcon);

    const inputClass = fullWidth === true
    ? classNames(classes.input)
    : classNames(classes.input);

    return (
      <div className={rootClass} style={style ? style : {}}>
        <div className={searchClass}>
          <SearchIcon />
        </div>
        <input
          className={inputClass}
          value={searchText}
          onChange={(e) => this.handleSearchText(e)}
          placeholder={placeholder ? placeholder : ''}
        />
        <IconButton onClick={this.handleClearClick} className={classNames(classes.clearIcon)}>
          <CloseIcon />
        </IconButton>
      </div>
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
