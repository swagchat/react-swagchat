import * as React from 'react';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import {
  State, Client, IUser,
  isUrl, isDataUrl,
} from 'swagchat-sdk';

const styles = (theme: Theme) => ({
  border: {
    border: '1px solid rgba(200, 200, 200, 0.8)',
  },
});

type ClassNames = 
  'border'
;

interface MapStateToProps {
  client: Client | null;
  user: IUser | null;
}

interface MapDispatchToProps {
}

export interface Props {
  className?: string;
  style?: Partial<React.CSSProperties>;
  data: {
    pictureUrl?: string;
    name?: string;
  };
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

class SwagAvatarComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & Props, {}> {

  state = {
    status: '',
    src: '',
  };

  componentDidMount() {
    let imageUrl = this.props.data.pictureUrl;

    if (imageUrl === undefined || imageUrl === '') {
      this.setState({src: imageUrl});
      return;
    }

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
      self.setState({
        status: 'loaded',
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
    let imageUrl = this.props.data.pictureUrl;

    if (imageUrl === undefined || imageUrl === '') {
      return;
    }

    if (!isDataUrl(imageUrl) && !isUrl(imageUrl)) {
      imageUrl = this.props.client!.apiEndpoint + '/assets/' + imageUrl;
    }

    if (this.state.src !== imageUrl) {
      this.setState({src: imageUrl});
    }
  }

  render() {
    const { classes, className, style, data, onClick } = this.props;
    const avatarClass = classNames(classes.border, className ? className : '');

    if (data.pictureUrl !== undefined && data.pictureUrl !== '') {
      return (
        <Avatar className={avatarClass} style={style} src={this.state.src} onClick={onClick} />
      );
    } else if (data.name !== undefined && data.name !== '') {
      return (
        <Avatar className={avatarClass} style={style} onClick={onClick}>{data.name.slice(0, 1)}</Avatar>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (state: State, ownProps: Props) => {
  return {
    client: state.client.client,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch: {}, ownProps: Props) => {
  return {};
};

export const SwagAvatar = connect<MapStateToProps, MapDispatchToProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SwagAvatarComponent));
