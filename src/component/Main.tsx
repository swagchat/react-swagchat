import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { UserActions, loginRequestActionCreator, LoginRequestAction } from '../action/user';
import { store, State } from '../store';
import { User } from '../store/user';
import Cookie from '../util/cookie';

const styles = (theme: Theme) => ({
  root: {
  },
});

interface Props {
  user: User | null;
  loginRequestActionCreator: (username: string, password: string) => LoginRequestAction;
}

type ClassNames = 
  'root'
;

class Main extends React.Component<Props & WithStyles<ClassNames>, {}> {
  state = {
  };

  componentDidMount() {
    const jwt = new Cookie().read('jwt');
    if (jwt === null) {
      store.dispatch(push('/login'));
    }
  }

  logout() {
    new Cookie().remove('jwt');
    store.dispatch(push('/login'));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1>main</h1>
        <Button raised={true} onClick={this.logout}>logout</Button>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    user: state.user.user,
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
)(withStyles(styles, { withTheme: true })<Props>(Main));