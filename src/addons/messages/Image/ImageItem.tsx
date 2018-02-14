import * as React from 'react';
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { dateFormateHHMM, IAddonMessageItemProps, IImagePayload } from 'swagchat-sdk';
import { CircularProgress } from 'material-ui/Progress';
import Avatar from 'material-ui/Avatar';

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
    margineft: 70,
    marginBottom: 0,
    color: 'rgb(33, 33, 33)',
  },
  messageLeft: {
    borderRadius: 10,
    margin: '5px 10px 5px 60px',
    float: 'left',
  },
  messageRight: {
    borderRadius: 10,
    clear: 'both',
    position: 'relative' as positionType,
    margin: '10px 0px 5px 10px',
    right: '10px',
    float: 'right',
  },
  timeLeft: {
    fontSize: '0.6em',
    color: 'rgb(33, 33, 33)',
    marginTop: 5,
    float: 'left',
  },
  timeRight: {
    fontSize: '0.6em',
    color: 'rgb(33, 33, 33)',
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
  'clear'
;

interface MapStateToProps {
}

interface MapDispatchToProps {
}

class ImageItemComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & IAddonMessageItemProps, {}> {
  imageDom: HTMLImageElement | null;

  state = {
    isLoaded: false,
    width: 0,
    height: 0,
  };

  componentWillMount() {
    let image = new Image();
    const self = this;
    image.onload = function() {
      let convertWidth = document.documentElement.clientWidth * 0.4;
      if (convertWidth > 250) {
        convertWidth = 250;
      }
      const renderPercent = convertWidth / image.naturalWidth;
      const width = Math.floor(image.naturalWidth * renderPercent);
      const height = Math.floor(image.naturalHeight * renderPercent);
      self.setState({
        isLoaded: true,
        width: width,
        height: height,
      });
    };

    const payload = this.props.message.payload as IImagePayload;
    image.src = payload.thumbnailUrl ? payload.thumbnailUrl : payload.sourceUrl;
  }

  componentDidUpdate() {
    if (this.props.onRenderComplete) {
      this.props.onRenderComplete();
    }
  }

  render(): JSX.Element {
    const { classes, message, myUserId, user } = this.props;
    const payload = message.payload as IImagePayload;

    return (
      <div className={classes.root}>
        {user.userId === myUserId ? (
          <div>
            {this.state.isLoaded ? (
              <img
                ref={(child) => this.imageDom = child}
                src={payload.thumbnailUrl ? payload.thumbnailUrl : payload.sourceUrl}
                className={classes.messageRight}
                width={this.state.width}
                height={this.state.height}
              />
            ) : <CircularProgress />}
            <div className={classes.timeRight}>{dateFormateHHMM(message.created!)}</div>
            <div className={classes.clear} />
          </div>
        ) : (
          <div>
            <Avatar className={classes.avatar} src={user.pictureUrl} />
            <p className={classes.name}>{user.name}</p>
            {this.state.isLoaded ? (
              <img
                src={payload.thumbnailUrl ? payload.thumbnailUrl : payload.sourceUrl}
                ref={(child) => this.imageDom = child}
                className={classes.messageLeft}
                width={this.state.width}
                height={this.state.height}
              />
            ) : <CircularProgress />}
            <div className={classes.timeLeft}>{dateFormateHHMM(message.created!)}</div>
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

export const ImageItem = connect<MapStateToProps, MapDispatchToProps, IAddonMessageItemProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ImageItemComponent));
