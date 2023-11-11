import { Button, Input } from 'components';
import css from './ContactAddForm.module.css';
export const ContactAddForm = ({ onAddFormSubmit }) => {
  return (
    <form onSubmit={onAddFormSubmit} className={css.form}>
      <Input type="text" name="name" />
      <Input type="tel" name="tel" />
      <Button type="submit" text="Add contact" />
    </form>
  );
};
// onSubmit={onSubmitButtonContactAdd}
//
