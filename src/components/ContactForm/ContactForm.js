import { useState } from 'react';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';
import PropTypes from "prop-types";

export default function ContactForm ({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // state = {
  //   name: '',
  //   number: '',
  // };

  const inputName = nanoid();
  const inputNumber = nanoid();

  const handleChange = (e) => {
    // const { name, value } = e.currentTarget;

    // this.setState({
    //   [name]: value,
    // });

    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "number":
        setNumber(e.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

    return (
      <>
        <form onSubmit={handleSubmit} className={s.form}>
          <label htmlFor={inputName} className={s.label}>
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            id={inputName}
            className={s.input}
            placeholder="Enter contact name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label htmlFor={inputNumber} className={s.label}>
            Number
          </label>
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            id={inputNumber}
            className={s.input}
            placeholder="Enter phone number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />

          <button type="submit" className={s.button}>
            Add contact
          </button>
        </form>
      </>
    )
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};