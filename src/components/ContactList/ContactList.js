import React from 'react';
import ContactItem from '../ContactItem';
import s from './ContactList.module.css';

export default function ContactList ({ contacts, onDelete }) {
  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <ContactItem
            key={id}
            id={id}
            onDelete={onDelete}
            name={name}
            number={number}
          />
        );
      })}
    </ul>
  );
}
