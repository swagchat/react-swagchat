import * as React from 'react';
import { IUser } from 'swagchat-sdk';

import { IOnClickProps, SimpleListItem } from '../../';

export interface IContactListProps extends IOnClickProps {
  contacts: IUser[];
  hasTopBar?: boolean;
  displayNoDataText?: string;
  displayNoDataImage?: string;
}

export class ContactList extends React.Component<IContactListProps, void> {
  public static defaultProps: Partial<IContactListProps> = {
    hasTopBar: false,
  };

  onClick(user: IUser) {
    if (this.props.onClick) {
      this.props.onClick(user);
    }
  }

  render(): JSX.Element {
    const {contacts, hasTopBar, displayNoDataText, displayNoDataImage} = this.props;
    return (
      <div className="page-container" style={hasTopBar ? {marginTop: '47px'} : {}}>
        {(() => {
          if (contacts && contacts.length > 0) {
            let roomItems = new Array;
            for (let i = 0; i < contacts.length; i++) {
              roomItems.push(
                <SimpleListItem
                  key={'contact-list-item-' + i}
                  name={contacts[i].name}
                  pictureUrl={contacts[i].pictureUrl}
                  width={40}
                  height={40}
                  onClick={this.onClick.bind(this, contacts[i])}
                />
              );
            }
            return roomItems;
          } else {
            return (
              <div className="nodata-wrap">
                {displayNoDataImage !== '' ? <img src={displayNoDataImage} /> : ''}
                <p className="nodata-text">{displayNoDataText !== '' ? displayNoDataText : ''}</p>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}
