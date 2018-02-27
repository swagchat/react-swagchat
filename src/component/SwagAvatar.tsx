import * as React from 'react';
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import { IUser, IRoom } from 'swagchat-sdk';

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
  className?: string;
  style?: Partial<React.CSSProperties>;
  user: IUser | IRoom;
}

class SwagAvatarComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & Props, {}> {
  render() {
    const { className, style, user } = this.props;

    if (user.pictureUrl !== undefined && user.pictureUrl !== '') {
      return (
        <Avatar
          className={className}
          style={style}
          src={user.pictureUrl}
        />
      );
    }

    if (user.name !== undefined && user.name !== '') {
      return (
        <Avatar
          className={className}
          style={style}
        >
          {user.name.slice(0, 1)}
        </Avatar>
      );
    }

    return null;
  }
}

const mapStateToProps = (state: {}, ownProps: Props) => {
  return {};
};

const mapDispatchToProps = (dispatch: {}, ownProps: Props) => {
  return {};
};

export const SwagAvatar = connect<MapStateToProps, MapDispatchToProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SwagAvatarComponent));
