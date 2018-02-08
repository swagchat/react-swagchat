import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { store, State } from 'swagchat-sdk';
import Cookie from '../util/cookie';

const styles = (theme: Theme) => ({
  root: {
  },
});

type ClassNames = 
  'root'
;

interface MapStateToProps {
}

interface MapDispatchToProps {
}

export interface Props {
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
        <a onClick={this.logout}>logout</a>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: Props) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<{}>, ownProps: Props) => {
  return {};
};

export default connect<MapStateToProps, MapDispatchToProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Main));