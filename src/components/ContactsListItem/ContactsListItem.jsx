import { Button } from 'components';
import css from './ContactsListItem.module.css';
export const ContactsListItem = ({ name, tel, id }) => (
  <li className={css.contactsListItem} id={id}>
    <p>
      {name}: {tel}
    </p>

    <Button text="Delete" type="button" deleteElemId={id} />
  </li>
);
