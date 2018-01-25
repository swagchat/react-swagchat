import * as React from 'react';
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';

type overflowType = 'hidden' | 'inherit' | 'initial' | 'unset' | 'auto' | 'scroll' | 'visible';

const styles = (theme: Theme) => ({
  root: {
    overflow: 'hidden' as overflowType,
    backgroundColor: theme.palette.background.paper,
  },
});

interface Props {
  name?: string;
}

interface MapStateToProps {
}

interface MapDispatchToProps {
}

type ClassNames = 
  'root'
;

class Component1 extends React.Component<Props & WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps, {}> {
  render() {
    const { classes, name } = this.props;

    return (
        <div className={classes.root}>
          <p>name is {name}</p>
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

export default connect<MapStateToProps, MapDispatchToProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Component1));
