import React from 'react';
import s from './ContactItem.module.css';
import PropTypes from 'prop-types';

export default function ContactItem ({ onDelete, id, name, number }) {
  return (
    <li className={s.item}>
      {name}: {number}
      <button type="button" onClick={() => onDelete(id)} className={s.button}>
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};