import css from './Button.module.css';
import { GoPersonAdd } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri';
export const Button = ({ text, type, deleteElemId }) => {
  return (
    <button className={css.button} type={type} data-delete={deleteElemId}>
      <span className={css.span}>
        {text === 'Add contact' && <GoPersonAdd />}
        {text === 'Delete' && <RiDeleteBin6Line />}
        {text}
      </span>
    </button>
  );
};
