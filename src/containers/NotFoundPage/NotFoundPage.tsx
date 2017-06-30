import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

export interface IProps extends RouteComponentProps<any> {
}
export class NotFoundPage extends React.Component<IProps, void> {
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

export const ContainerNotFoundPage = connect(
  null,
  mapDispatchToProps
)(NotFoundPage);
