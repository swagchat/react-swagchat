import * as React from 'react';
import { IUser } from 'swagchat-sdk';
import { IOnClickProps } from '../../';
import { CheckListItem } from '../../components';

export interface IContactListProps extends IOnClickProps {
  contacts: IUser[];
  selectedContacts: {[key: string]: IUser};
  hasTopBar?: boolean;
  noContactListText?: string;
  noContactListImage?: string;
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
    const {contacts, selectedContacts, hasTopBar, noContactListText, noContactListImage} = this.props;
    return (
      <div className="page-container" style={hasTopBar ? {marginTop: '47px'} : {}}>
        {(() => {
          if (contacts && contacts.length > 0) {
            let roomItems = new Array;
            for (let i = 0; i < contacts.length; i++) {
              roomItems.push(
                <CheckListItem
                  key={'contact-list-item-' + i}
                  name={contacts[i].name}
                  pictureUrl={contacts[i].pictureUrl}
                  width={40}
                  height={40}
                  onClick={this.onClick.bind(this, contacts[i])}
                  isChecked={(selectedContacts[contacts[i].userId]) ? true : false}
                />
              );
            }
            return roomItems;
          } else {
            return (
              <div className="nodata-wrap">
                {noContactListImage !== '' ? <img className="nodata-image" src={noContactListImage} /> : ''}
                <p className="nodata-text">{noContactListText !== '' ? noContactListText : ''}</p>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}
