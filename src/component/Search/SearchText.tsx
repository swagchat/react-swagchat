import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import {
  State,
  setSearchTextActionCreator,
  SetSearchTextAction,
  MessageActions,
} from 'swagchat-sdk';
import {
  SEARCH_FORM_HEIGHT,
  SEARCH_FORM_INPUT_TEXT_HEIGHT,
  SEARCH_FORM_INPUT_TEXT_FONT_SIZE,
} from '../../setting';

const styles = (theme: Theme) => ({
  root: {
    height: SEARCH_FORM_HEIGHT,
  },
  searchFormControl: {
    width: '100%',
    height: SEARCH_FORM_HEIGHT,
    padding: 5,
    marginTop: -17,
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    borderRadius: 2,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: SEARCH_FORM_INPUT_TEXT_FONT_SIZE,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    height: SEARCH_FORM_INPUT_TEXT_HEIGHT,
  },
  textFieldFormLabel: {
    backgroundColor: theme.palette.common.white,
  },
});

type ClassNames = 
  'root' |
  'searchFormControl' |
  'textFieldRoot' |
  'textFieldInput' |
  'textFieldFormLabel'
;

interface MapStateToProps {
  searchText: string;
}

interface MapDispatchToProps {
  setSearchText: (searchText: string) => SetSearchTextAction;
}

export interface SearchTextProps {
  width?: number | string;
  enableBorder?: boolean;
}

class SearchTextComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & SearchTextProps, {}> {

  handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setSearchText(event.target.value);
  }

  render() {
    const { classes, width, searchText } = this.props;
    
    return (
      <div className={classes.root} style={width !== undefined ? {width: width} : {}}>
        <FormControl className={classes.searchFormControl} style={width !== undefined ? {width: width} : {}}>
          <TextField
            value={searchText}
            margin="normal"
            autoFocus={true}
            placeholder="検索キーワードを入力してください"
            InputProps={{
              disableUnderline: true,
              classes: {
                root: classes.textFieldRoot,
                input: classes.textFieldInput,
              },
            }}
            InputLabelProps={{
              shrink: true,
              className: classes.textFieldFormLabel,
            }}
            onChange={(e) => this.handleSearchText(e)}
          />
        </FormControl>
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
