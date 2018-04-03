import * as React from 'react';
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ErrorOutlineIcon from 'material-ui-icons/ErrorOutline';
import {
  State, Client,
  IAddonMessageItemProps, IImagePayload,
  dateFormateHHMM, isUrl,
} from 'swagchat-sdk';
import { CircularProgress } from 'material-ui/Progress';
import { SwagAvatar } from '../../../component/SwagAvatar';

type positionType = 'relative';

const styles = (theme: Theme) => {
  const progressStyle = {
    position: 'relative' as 'relative',
    margin: 40,
  };
  const errorStyle = {
    position: 'relative' as 'relative',
    margin: theme.spacing.unit * 3 + 'px ' + theme.spacing.unit + 'px',
    display: 'flex',
    alignItems: 'center' as 'center',
    justifyContent: 'space-around' as 'space-around',
    flexDirection: 'column' as 'column',
    fontSize: '0.7em',
    color: theme.palette.grey[700],
    border: '1px solid ' + theme.palette.grey[300],
    borderRadius: 10,
    padding: theme.spacing.unit,
  };
  const timeStyle = {
    fontSize: '0.6em',
    color: 'rgb(33, 33, 33)',
    marginTop: 5,
  };
  return {
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
      margineft: 70,
      marginBottom: 0,
      color: 'rgb(33, 33, 33)',
    },
    imageLeft: {
      borderRadius: 10,
      margin: '5px 10px 5px 60px',
      float: 'left',
    },
    progressLeft: Object.assign(progressStyle, {float: 'left'}),
    errorLeft: Object.assign(errorStyle, {float: 'left'}),
    timeLeft: Object.assign(timeStyle, {float: 'left'}),
    imageRight: {
      borderRadius: 10,
      clear: 'both',
      position: 'relative' as positionType,
      margin: '10px 0px 5px 10px',
      right: '10px',
      float: 'right',
    },
    progressRight: Object.assign(progressStyle, {float: 'right'}),
    errorRight: Object.assign(errorStyle, {float: 'right'}),
    timeRight: Object.assign(timeStyle, {float: 'right'}),
    errorText: {
      margin: theme.spacing.unit,
    },
    clear: {
      clear: 'both',
      marginBottom: 30,
    },
  };
};

type ClassNames = 
  'root' |
  'avatar' |
  'name' |
  'imageLeft' |
  'progressLeft' |
  'errorLeft' |
  'timeLeft' |
  'imageRight' |
  'progressRight' |
  'errorRight' |
  'timeRight' |
  'errorText' |
  'clear'
;

interface MapStateToProps {
  client: Client | null;
}

interface MapDispatchToProps {
}

class ImageItemComponent
  extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & IAddonMessageItemProps, {}> {

  imageDom: HTMLImageElement | null;

  state = {
    status: '',
    width: 0,
    height: 0,
    src: '',
  };

  componentDidMount() {
    const payload = this.props.message.payload as IImagePayload;
    let imageUrl = payload.thumbnailUrl ? payload.thumbnailUrl : payload.sourceUrl;
    if (!isUrl(imageUrl)) {
      imageUrl = this.props.client!.apiEndpoint + '/assets/' + imageUrl;
    } 

    let image = new Image();
    const self = this;
    image.onload = (e: Event) => {
      let convertWidth = document.documentElement.clientWidth * 0.4;
      if (convertWidth > 250) {
        convertWidth = 250;
      }
      const renderPercent = convertWidth / image.naturalWidth;
      const width = Math.floor(image.naturalWidth * renderPercent);
      const height = Math.floor(image.naturalHeight * renderPercent);
      self.setState({
        status: 'loaded',
        width: width,
        height: height,
        src: imageUrl,
      });
    };
    image.onerror = (e: Event) => {
      self.setState({
        status: 'error',
      });
    };
    image.src = imageUrl;
  }

  componentDidUpdate() {
    if (this.props.onRenderComplete) {
      this.props.onRenderComplete();
    }
  }

  render(): JSX.Element {
    const { classes, message, myUserId, user } = this.props;

    return (
      <div className={classes.root}>
        {user.userId === myUserId ? (
          <div>
            {this.state.status === 'loaded' ? (
              <img
                ref={(child) => this.imageDom = child}
                className={classes.imageRight}
                width={this.state.width}
                height={this.state.height}
                src={this.state.src}
              />
            ) : this.state.status === 'error' ? (
              <div className={classes.errorRight}>
                <ErrorOutlineIcon />
                <Typography className={classes.errorText}>画像の読み込みに失敗しました</Typography>
              </div>
            ) :
              <CircularProgress className={classes.progressRight} />
            }
            <Typography className={classes.timeRight}>{dateFormateHHMM(message.created!)}</Typography>
            <div className={classes.clear} />
          </div>
        ) : (
          <div>
            <SwagAvatar className={classes.avatar} data={user} />
            <p className={classes.name}>{user.name}</p>
            {this.state.status === 'loaded' ? (
              <img
                ref={(child) => this.imageDom = child}
                className={classes.imageLeft}
                width={this.state.width}
                height={this.state.height}
                src={this.state.src}
              />
            ) : this.state.status === 'error' ? (
              <div className={classes.errorLeft}>
                <ErrorOutlineIcon />
                <Typography className={classes.errorText}>画像の読み込みに失敗しました</Typography>
              </div>
            ) :
              <CircularProgress className={classes.progressLeft} />
            }
            <Typography className={classes.timeLeft}>{dateFormateHHMM(message.created!)}</Typography>
            <div className={classes.clear} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: IAddonMessageItemProps) => {
  return {
    client: state.client.client,
  };
};

const mapDispatchToProps = (dispatch: {}, ownProps: IAddonMessageItemProps) => {
  return {};
};

export const ImageItem = connect<MapStateToProps, MapDispatchToProps, IAddonMessageItemProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ImageItemComponent));
