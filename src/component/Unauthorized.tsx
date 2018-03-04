import * as React from 'react';
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { BORDER_RADIUS } from '../setting';

const styles = (theme: Theme) => {
  theme!.overrides!.MuiDialog = {
    fullScreen: {
      background: 'linear-gradient(to top, #4cb8c4, #3cd3ad)',
      justifyContent: 'center' as 'center',
      alignItems: 'center' as 'center',
    },
  };
  return {
    typography: {
      color: theme.palette.common.white,
      fontSize: '1.2em',
      textAlign: 'center',
      margin: theme.spacing.unit * 3,
    },
    button: {
      color: theme.palette.common.white,
      borderRadius: BORDER_RADIUS,
      border: '1px solid ' + theme.palette.common.white,
      margin: theme.spacing.unit,
    },
  };
};

type ClassNames = 
  'typography' |
  'button'
;

interface MapStateToProps {
}

interface MapDispatchToProps {
}

export interface Props {
}

class UnauthorizedComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & Props, {}> {

  handleReflesh = () => {
    location.reload();
  }

  handleLogout = () => {
    window.console.log('handleLogout');
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog fullScreen={true} open={true}>
        <Typography variant="subheading" className={classes.typography}>このサービスの利用権限がありません</Typography>
        <Button color="primary" className={classes.button} onClick={this.handleReflesh}>再読み込みする</Button>
        <Button color="primary" className={classes.button} onClick={this.handleLogout}>別のユーザでログインする</Button>
      </Dialog>
    );
  }
}

const mapStateToProps = (state: {}, ownProps: Props) => {
  return {};
};

const mapDispatchToProps = (dispatch: {}, ownProps: Props) => {
  return {};
};

export const Unauthorized = connect<MapStateToProps, MapDispatchToProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(UnauthorizedComponent));
