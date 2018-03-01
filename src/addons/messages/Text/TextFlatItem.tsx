import * as React from 'react';
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { dateFormateHHMM, IAddonMessageItemProps, ITextPayload } from 'swagchat-sdk';
import { ListItem } from 'material-ui/List';
import { SwagAvatar } from '../../../component/SwagAvatar';

const listItemMargin = 10;

type displayType = 'flex';
type flexDirectionType = 'column';
type wordWrapType = 'break-word';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex' as displayType,
    width: 'calc(100% - 20px)',
    margin: '20px 0',
  },
  wrap: {
    width: 'calc(100% - 20px)',
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
    width: 'calc(100% - 30px)',
    fontSize: '1em',
    textAlign: 'left',
    wordWrap: 'break-word' as wordWrapType,
  },
  listItem: {
    width: `calc(100% - ${listItemMargin * 2}px)`,
    margin: listItemMargin,
    padding: '0 10px',
    border: `1px solid #ccc`,
    borderRadius: 5,
  },
});

type ClassNames = 
  'root' |
  'wrap' |
  'wrapNameTime' |
  'avatar' |
  'name' |
  'time' |
  'message' |
  'listItem'
;

interface MapStateToProps {
}

interface MapDispatchToProps {
}

const Item = withStyles(styles)<IAddonMessageItemProps>(
  (props: IAddonMessageItemProps & WithStyles<ClassNames>) => {
    const { classes, message, user } = props;
    const payload = message.payload as ITextPayload;
    let splitMessage = payload.text.split('\n');
    let displayText = new Array;
    splitMessage.forEach((value, index) => {
      displayText.push(<span key={'text-item-' + message.messageId + '-' + index}>{value}<br /></span>);
    });

    return (
      <div className={classes.root}>
        <SwagAvatar className={classes.avatar} data={user} />
        <div className={classes.wrap}>
          <div className={classes.wrapNameTime}>
            <div className={classes.name}>{user.name}</div>
            <div className={classes.time}>{dateFormateHHMM(message.created!)}</div>
          </div>
          <div className={classes.message}>{displayText}</div>
        </div>
      </div>
    );
  }
);

class TextFlatItemComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & IAddonMessageItemProps, {}> {
  render(): JSX.Element {
    const { classes, isSearchResult } = this.props;

    return isSearchResult !== undefined && isSearchResult === true
      ?
        (
          <ListItem button={true} className={classes.listItem}>
            <Item {...this.props} />
          </ListItem>
        )
      :
        <Item {...this.props} />
    ;
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
