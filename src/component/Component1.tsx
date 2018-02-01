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

type ClassNames = 
  'root'
;

interface MapStateToProps {
}

interface MapDispatchToProps {
}

interface Props {
  name?: string;
}

class Component1 extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & Props, {}> {
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
