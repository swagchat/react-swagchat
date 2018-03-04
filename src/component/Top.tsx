import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { store } from 'swagchat-sdk';

const styles = (theme: Theme) => ({
  root: {
  },
});

export interface TopProps {
}

interface MapStateToProps {
}

interface MapDispatchToProps {
}

type ClassNames = 
  'root'
;

class TopComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & TopProps, {}> {

  componentDidMount() {
    store.dispatch(push('/rooms'));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}><CircularProgress /></div>
    );
  }
}

const mapStateToProps = (state: {}, ownProps: TopProps) => {
  return {};
};

const mapDispatchToProps = (dispatch: {}, ownProps: TopProps) => {
  return {};
};

export const Top = connect<MapStateToProps, MapDispatchToProps, TopProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(TopComponent));
