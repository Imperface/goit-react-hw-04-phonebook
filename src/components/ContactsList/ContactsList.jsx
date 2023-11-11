import { ContactsListItem, Input } from 'components';
import css from './ContactsList.module.css';
export const ContactsList = ({
  contacts,
  onDeleteBtnClick,
  onFilterInput,
  filterValue,
}) => (
  <>
    <Input
      type="text"
      name="filter"
      onFilterInput={onFilterInput}
      filterValue={filterValue}
    />
    <ul className={css.contactsList} onClick={onDeleteBtnClick}>
      {contacts.map(item => (
        <ContactsListItem
          key={item.id}
          name={item.name}
          tel={item.tel}
          id={item.id}
        />
      ))}
    </ul>
  </>
);
