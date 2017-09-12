import * as React from 'react';
import { IUser, updateSelectContactsActionDispatch } from 'swagchat-sdk';
import { Avatar, CheckListItem, IOnClickProps } from '../';
import * as indexStyles from '../../index.css';
import * as styles from './contact-list.css';

export interface IContactListProps extends IOnClickProps {
  contacts: IUser[];
  selectedContacts: {[key: string]: IUser};
  noContactListText?: string;
  noContactListImage?: string;
  checkedIcon?: React.ReactNode;
  unCheckedIcon?: React.ReactNode;
  className?: string;
  style?: Object;
}

export class ContactList extends React.Component<IContactListProps, {}> {
  public static defaultProps: Partial<IContactListProps> = {
    contacts: [],
    selectedContacts: {},
    className: '',
    style: {},
  };

  onClick(user: IUser) {
    updateSelectContactsActionDispatch(user);
  }

  render(): JSX.Element {
    const {contacts, selectedContacts, noContactListText, noContactListImage, checkedIcon, unCheckedIcon, className, style} = this.props;
    const classNames = require('classnames');
    return (
      <div
        className={classNames(styles.root, className ? className : '')}
        style={style ? style : {}}
      >
        {contacts ? contacts.map((contact, i) =>
          <CheckListItem
            key={'contact-list-item-' + i}
            text={contact.name}
            icon={<Avatar width="40px" height="40px" src={contact.pictureUrl} />}
            isChecked={(selectedContacts[contact.userId]) ? true : false}
            onClick={() => this.onClick(contact)}
            checkedIcon={checkedIcon}
            unCheckedIcon={unCheckedIcon}
          />
        ) : null}
        {!(contacts && contacts.length > 0) ?
          <div className={indexStyles.nodataWrap}>
            {noContactListImage !== '' ? <img className={indexStyles.nodataImage} src={noContactListImage} /> : ''}
            <p className={indexStyles.nodataText}>{noContactListText !== '' ? noContactListText : ''}</p>
          </div> : null
        }
      </div>
    );
  }
}
