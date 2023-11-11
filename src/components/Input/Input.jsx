import css from './Input.module.css';
import { FaRegUser } from 'react-icons/fa';
import { BsTelephone, BsSearch } from 'react-icons/bs';
export const Input = ({ type, name, onFilterInput = null, filterValue }) => {
  return (
    <label className={css.label}>
      <span className={css.span}>
        {name === 'name' && <FaRegUser />}
        {name === 'tel' && <BsTelephone />}
        {name === 'filter' && <BsSearch />}
        {name}
      </span>
      <input
        className={css.input}
        type={type}
        name={name}
        onChange={onFilterInput}
        value={filterValue}
        required
      />
    </label>
  );
};
