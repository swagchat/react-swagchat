import * as React from 'react';
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
// import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
// import { FormControl } from 'material-ui/Form';
import SendIcon from 'material-ui-icons/Send';
import CameraAltIcon from 'material-ui-icons/CameraAlt';
import blueGrey from 'material-ui/colors/blueGrey';
import IconButton from 'material-ui/IconButton';
import { FormControl } from 'material-ui/Form';

type positionType = 'fixed';
type displayType = 'fixed';
type justifyContentType = 'space-around';
type alignItemsType = 'center';

const styles = (theme: Theme) => ({
  root: {
  },
  bottom: {
    width: 640,
    display: 'flex' as displayType,
    justifyContent: 'space-around' as justifyContentType,
    alignItems: 'center' as alignItemsType,
    position: 'fixed' as positionType,
    bottom: 0,
    zIndex: 1101,
    borderTop: '1px solid ' + blueGrey[50],
  },
  bottomRight: {
    flex: '1 1 0%',
    display: 'flex' as displayType,
    justifyContent: 'space-around' as justifyContentType,
    alignItems: 'center' as alignItemsType,
  },
  formControl: {
    width: '100%',
  },
});

type ClassNames = 
  'root' |
  'bottom' |
  'bottomRight' |
  'formControl'
;

interface MapStateToProps {
}

interface MapDispatchToProps {
}

export interface Props {
}

class TextInteractionComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & Props, {}> {
  state = {
    amount: '',
    text: '',
    weight: '',
    showPassword: false,
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      text: event.target.value
    });
  }

  handleMouseDownPassword = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
  }

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
          <div className={classes.bottom}>
            <IconButton>
              <CameraAltIcon />
            </IconButton>
            <IconButton>
              <CameraAltIcon />
            </IconButton>
            <div className={classes.bottomRight}>
              <FormControl className={classes.formControl}>
              <TextField
                defaultValue=""
                multiline={true}
                rowsMax="4"
                InputProps={{
                  disableUnderline: true,
                }}
              />
              </FormControl>
              <IconButton color="primary">
                <SendIcon />
              </IconButton>
              <IconButton color="primary">
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state: {}, ownProps: Props) => {
  return {};
};

const mapDispatchToProps = (dispatch: {}, ownProps: Props) => {
  return {};
};

export const TextInteraction = connect<MapStateToProps, MapDispatchToProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(TextInteractionComponent));
