import * as React from 'react';
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { dateFormateHHMM, IAddonMessageItemProps, ITextPayload } from 'swagchat-sdk';
import { SwagAvatar } from '../../../component/SwagAvatar';

type wordWrapType = 'break-word';
type positionType = 'relative';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
  },
  avatar: {
    borderRadius: '50%',
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  name: {
    fontSize: '0.6em',
    marginTop: '-45px',
    // marginLeft: 70,
    marginBottom: 0,
    color: 'rgb(33, 33, 33)',
  },
  messageLeft: {
    width: 'auto',
    maxWidth: '60%',
    background: theme.palette.grey[100],
    border: '0px solid #777',
    padding: '5px 10px',
    margin: '5px 10px 5px 50px',
    borderRadius: 15,
    clear: 'both',
    float: 'left',
    wordWrap: 'break-word' as wordWrapType,
  },
  messageRight: {
    width: 'auto',
    maxWidth: '70%',
    color: theme.palette.common.white,
    position: 'relative' as positionType,
    background: theme.palette.primary.main,
    border: '0px solid #777',
    padding: '5px 10px',
    margin: '10px 0px 5px 10px',
    right: '10px',
    borderRadius: 15,
    clear: 'both',
    float: 'right',
    wordWrap: 'break-word' as wordWrapType,
    fontSize: '1em',
  },
  timeLeft: {
    fontSize: '0.6em',
    color: theme.palette.grey.A400,
    marginTop: 5,
    float: 'left',
  },
  timeRight: {
    fontSize: '0.6em',
    color: theme.palette.grey.A400,
    marginTop: 10,
    marginRight: 10,
    float: 'right',
  },
  clear: {
    clear: 'both',
    marginBottom: 30,
  }
});

type ClassNames = 
  'root' |
  'avatar' |
  'name' |
  'messageLeft' |
  'messageRight' |
  'timeLeft' |
  'timeRight' |
  'text' |
  'clear'
;

interface MapStateToProps {
}

interface MapDispatchToProps {
}

class TextItemComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & IAddonMessageItemProps, {}> {
  render(): JSX.Element {
    const { classes, message, myUserId, user } = this.props;

    if (!user) {
      return <div />;
    }

    const payload = message.payload as ITextPayload;
    let splitMessage = payload.text.split('\n');
    let displayText = new Array;
    splitMessage.forEach((value, index) => {
      displayText.push(<span key={'text-item-' + message.messageId + '-' + index}>{value}<br /></span>);
    });

    return (
      <div className={classes.root}>
        {user.userId === myUserId ? (
          <div>
            <Typography className={classes.messageRight}>{displayText}</Typography>
            <Typography className={classes.timeRight}>{dateFormateHHMM(message.created!)}</Typography>
            <div className={classes.clear} />
          </div>
        ) : (
          <div>
            <SwagAvatar className={classes.avatar} data={user} />
            <Typography className={classes.name}>{user.name}</Typography>
            <Typography className={classes.messageLeft}>{displayText}</Typography>
            <Typography className={classes.timeLeft}>{dateFormateHHMM(message.created!)}</Typography>
            <div className={classes.clear} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: {}, ownProps: IAddonMessageItemProps) => {
  return {};
};

const mapDispatchToProps = (dispatch: {}, ownProps: IAddonMessageItemProps) => {
  return {};
};

export const TextItem = connect<MapStateToProps, MapDispatchToProps, IAddonMessageItemProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(TextItemComponent));
