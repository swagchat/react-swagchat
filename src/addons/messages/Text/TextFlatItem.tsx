import * as React from 'react';
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { dateFormateHHMM, IAddonMessageItemProps, ITextPayload } from 'swagchat-sdk';
import Avatar from 'material-ui/Avatar';

type displayType = 'flex';
type flexDirectionType = 'column';
type wordWrapType = 'break-word';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex' as displayType,
    width: '100%',
    margin: '20px 10px',
  },
  wrap: {
    display: 'flex' as displayType,
    flexDirection: 'column' as flexDirectionType,
    paddingLeft: 10,
  },
  wrapNameTime: {
    display: 'flex' as displayType,
  },
  avatar: {
    // width: 24,
    // height: 24,
  },
  name: {
    fontSize: '0.8em',
    color: 'rgb(33, 33, 33)',
  },
  time: {
    fontSize: '0.8em',
    color: 'rgb(33, 33, 33)',
    paddingLeft: 10,
  },
  message: {
    width: 'calc(100% - 20px)',
    fontSize: '1em',
    textAlign: 'left',
    wordWrap: 'break-word' as wordWrapType,
  },
});

type ClassNames = 
  'root' |
  'wrap' |
  'wrapNameTime' |
  'avatar' |
  'name' |
  'time' |
  'message'
;

interface MapStateToProps {
}

interface MapDispatchToProps {
}

class TextFlatItemComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & IAddonMessageItemProps, {}> {
  render(): JSX.Element {
    const { classes, message, user } = this.props;
    const payload = message.payload as ITextPayload;
    let splitMessage = payload.text.split('\n');
    let displayText = new Array;
    splitMessage.forEach((value, index) => {
      displayText.push(<span key={'text-item-' + message.messageId + '-' + index}>{value}<br /></span>);
    });

    return (
      <div className={classes.root}>
        <Avatar className={classes.avatar} src={user.pictureUrl} />
        <div className={classes.wrap}>
          <div className={classes.wrapNameTime}>
            <div className={classes.name}>{user.name}</div>
            <div className={classes.time}>{dateFormateHHMM(message.created!)}</div>
          </div>
          <div className={classes.message}>{payload.text}</div>
        </div>
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

export const TextFlatItem = connect<MapStateToProps, MapDispatchToProps, IAddonMessageItemProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(TextFlatItemComponent));
