import * as React from 'react';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styles = (theme: Theme) => ({
  border: {
    border: '1px solid rgba(200, 200, 200, 0.8)',
  },
});

type ClassNames = 
  'border'
;

interface MapStateToProps {
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
  render() {
    const { classes, className, style, data, onClick } = this.props;

    const avatarClass = classNames(classes.border, className ? className : '');

    if (data.pictureUrl !== undefined && data.pictureUrl !== '') {
      return (
        <Avatar
          className={avatarClass}
          style={style}
          src={data.pictureUrl}
          onClick={onClick}
        />
      );
    } else if (data.name !== undefined && data.name !== '') {
      return (
        <Avatar
          className={avatarClass}
          style={style}
          onClick={onClick}
        >
          {data.name.slice(0, 1)}
        </Avatar>
      );
    } else {
      return <div />;
    }
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
