import * as React from 'react';
import { IUser, updateSelectContactsActionDispatch } from 'swagchat-sdk';
import { Avatar, IRootStyleProps, IOnClickProps } from '../';
import { CheckListItem　} from './internal/CheckListItem/CheckListItem';
import * as indexStyles from '../../index.css';
import * as styles from './contact-list.css';

export interface IContactListProps extends IRootStyleProps, IOnClickProps {
  contacts: IUser[];
  selectedContacts?: {[key: string]: IUser};
  noContactListText?: string;
  noContactListImage?: string;
  checkedIcon?: React.ReactNode;
  unCheckedIcon?: React.ReactNode;
}

export class ContactList extends React.Component<IContactListProps, {}> {
  public static defaultProps: Partial<IContactListProps> = {
    contacts: [],
    selectedContacts: {},
    className: '',
    style: {},
    onClick: () => {},
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
        style={style}
      >
        {contacts ? contacts.map((contact, i) =>
          <CheckListItem
            key={'contact-list-item-' + i}
            text={contact.name}
            icon={<Avatar className={styles.avatar} src={contact.pictureUrl!} />}
            isChecked={(selectedContacts![contact.userId]) ? true : false}
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
