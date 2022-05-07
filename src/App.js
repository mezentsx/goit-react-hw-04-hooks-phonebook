import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Container from './components/Container';
import { nanoid } from 'nanoid';
import s from './App.module.css';

export default function App () {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  useEffect(() => {
    if (localStorage.getItem("contacts")) {
      setContacts(JSON.parse(localStorage.getItem("contacts")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);

  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const nextContacts = this.state.contacts;
  //   const prevContacts = prevState.contacts;

  //   if (nextContacts !== prevContacts) {
  //     localStorage.setItem('contacts', JSON.stringify(nextContacts));
  //   }
  // }

  const formSubmitHandler = ({ name, number }) => {
    const contactsNames = contacts.map(contact => {
      return contact.name.toLowerCase();
    });

    contactsNames.includes(name.toLowerCase())
      ? alert(`${name} is already in contacts `)
      : setContacts([{ id: nanoid(), name, number }, ...contacts]);
  };

  const contactFilterHandler = (e) => {
    setFilter(e.currentTarget.value);
  };

  const onDelete = (id) => {
     setContacts((state) => state.filter((contact) => contact.id !== id));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  
  const filteredContacts = getVisibleContacts();

    return (
      <Container>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />

        <h2 className={s.title}>Contacts</h2>
        {contacts.length ? (
          <>
            <Filter
              filter={filter}
              onFilter={contactFilterHandler}
            />
            <ContactList contacts={filteredContacts} onDelete={onDelete} />
          </>
        ) : (
          <p>You don't have any contacts</p>
        )}
      </Container>
    )
}
