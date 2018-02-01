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

type ClassNames = 
  'root'
;

interface MapStateToProps {
  user: User | null;
}

interface MapDispatchToProps {
  loginRequestActionCreator: (username: string, password: string) => LoginRequestAction;
}

interface Props {
  component?: React.ReactNode;
}

class Main extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & Props, {}> {
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
    const { classes, component } = this.props;

    return (
      <div className={classes.root}>
        {component}
        <Button raised={true} onClick={this.logout}>logout</Button>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: Props) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<UserActions>, ownProps: Props) => {
  return {
    loginRequestActionCreator: (username: string, password: string) => {
      dispatch(loginRequestActionCreator(username, password));
    },
  };
};

export default connect<MapStateToProps, MapDispatchToProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Main));