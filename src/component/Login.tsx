import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { store } from '../store';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import { lightBlue } from 'material-ui/colors';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { UserActions, loginRequestActionCreator, LoginRequestAction } from '../action/user';
import { State } from '../store';
import { User } from '../store/user';
import { ErrorResponse, InvalidParam } from '../protogen/errorResponse_pb';
import Cookie from '../util/cookie';

type positionType = 'absolute';
type flexWrapType = 'wrap';
type flexDirectionType = 'column';

const styles = (theme: Theme) => ({
  loginWrap: {
    margin: '-200px 0 0 -200px',
    position: 'absolute' as positionType,
    top: '50%',
    left: '50%',
    width: 400,
    height: 400,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap' as flexWrapType,
    flexDirection: 'column' as flexDirectionType,
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
});

interface Props {
  user: User;
  errorResponse: ErrorResponse;
  loginRequestActionCreator: (username: string, password: string) => LoginRequestAction;
}

type ClassNames = 
  'loginWrap' |
  'form'
;

class Login extends React.Component<Props & WithStyles<ClassNames>, {}> {
  state = {
    error: false,
    username: '',
    password: '',
    errorResponse: null,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.user !== null) {
      new Cookie().write('jwt', 'true');
      store.dispatch(push('/'));
    } else if (nextProps.errorResponse !== null) {
      this.setState({
        errorResponse: nextProps.errorResponse,
        error: true,
      });
    }
    return false;
  }

  componentDidMount() {
    const jwt = new Cookie().read('jwt');
    if (jwt !== null) {
      store.dispatch(push('/'));
    }
    document.body.style.backgroundColor = lightBlue[700];
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = 'white';
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClickLogin = () => {
    this.props.loginRequestActionCreator(this.state.username, this.state.password);
    return null;
  }

  render() {
    const { classes } = this.props;

    let errorResponse = null;
    let usernameErrorReason = null;
    let passwordErrorReason = null;
    if (this.state.errorResponse !== null) {
        errorResponse = this.state.errorResponse! as ErrorResponse;
        const invalidParams = errorResponse.getInvalidparamsList();
        if (invalidParams !== null) {
          invalidParams.map((value: InvalidParam) => {
            if (value.getName() === 'username') {
              usernameErrorReason = value.getReason();
            }
            if (value.getName() === 'password') {
              passwordErrorReason = value.getReason();
            }
          });
        }
    }

    return (
      <div className={classes.loginWrap}>
        <form className={classes.form} noValidate={true} autoComplete="off">
          <FormControl margin="dense">
            <TextField
              error={usernameErrorReason ? true : false}
              label="username"
              required={true}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder=""
              helperText={usernameErrorReason ? usernameErrorReason : ''}
              fullWidth={true}
              margin="normal"
              name="username"
              onChange={e => this.onChange(e)}
            />
          </FormControl>
          <FormControl margin="dense">
            <TextField
              error={passwordErrorReason ? true : false}
              label="password"
              required={true}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder=""
              helperText={passwordErrorReason ? passwordErrorReason : ''}
              fullWidth={true}
              margin="normal"
              name="password"
              onChange={e => this.onChange(e)}
            />
          </FormControl>
          <Typography color="error">{errorResponse ? errorResponse.getTitle() : ''}</Typography>
          <FormControl margin="dense">
            <Button
              raised={true}
              color="primary"
              onClick={this.onClickLogin}
            >
              ログイン
            </Button>
          </FormControl>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    user: state.user.user,
    errorResponse: state.user.errorResponse,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<UserActions>) => {
  return {
    loginRequestActionCreator: (username: string, password: string) => {
      dispatch(loginRequestActionCreator(username, password));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })<Props>(Login));