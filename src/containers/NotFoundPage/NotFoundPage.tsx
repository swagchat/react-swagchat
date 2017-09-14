import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

export interface IProps extends RouteComponentProps<any> {
}
export class ReduxNotFoundPage extends React.Component<IProps, {}> {
  render() {
    return (
      <div className="not-found-page-root">
        <p>Page Not Found.</p>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IProps) => {
  dispatch; ownProps; // TODO
  return {};
};

export const NotFoundPage = connect(
  null,
  mapDispatchToProps
)(ReduxNotFoundPage);
