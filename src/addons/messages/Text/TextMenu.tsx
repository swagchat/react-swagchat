import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAddonMessageMenuProps } from 'swagchat-sdk';
import Button from 'material-ui/Button';
import KeyboardIcon from 'material-ui-icons/Keyboard';
import {
  AddonActions,
  UpdateAddonMessageMenuIndexAction,
  updateAddonMessageMenuIndexActionCreator
} from '../../../action/addon';

interface MapStateToProps {
}

interface MapDispatchToProps {
  updateAddonMessageMenuIndex: (currentMenuIndex: number) => UpdateAddonMessageMenuIndexAction;
}

class TextMenuComponent extends React.Component<MapStateToProps & MapDispatchToProps & IAddonMessageMenuProps, {}> {
  render(): JSX.Element {
    const { ownMenuIndex } = this.props;
    return (
      <Button
        onClick={() => {this.props.updateAddonMessageMenuIndex(ownMenuIndex); }}
      >
        <KeyboardIcon />
      </Button>
    );
  }
}

const mapStateToProps = (state: {}, ownProps: {}) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<AddonActions>, ownProps: {}) => {
  return {
    updateAddonMessageMenuIndex: (currentMenuIndex: number) => {
      dispatch(updateAddonMessageMenuIndexActionCreator(currentMenuIndex));
    },
  };
};

export const TextMenu = connect<MapStateToProps, MapDispatchToProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(TextMenuComponent);
