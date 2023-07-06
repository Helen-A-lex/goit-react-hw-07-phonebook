import { useState } from 'react';
import {
  Form,
  Label,
  Input,
  ButtonAddDeleteContact,
} from './ContactForm.styled';

import { useDispatch, useSelector } from 'react-redux';
import { getContactsItems } from '../../redux/contactsSlice';
import { addContact } from 'redux/operations';
// import { nanoid } from 'nanoid';
export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(getContactsItems);
  console.log(contacts);

  const handleChange = evt => {
    const { name, value } = evt.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const isDuplicateName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicateName) {
      alert(`${name} is already in contacts`);
      return;
    }
    // const id = nanoid();
    dispatch(addContact({ name, phone }));

    setName('');
    setPhone('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="user_name">
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </Label>

      <Label htmlFor="user_tel">
        Number
        <Input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handleChange}
        />
      </Label>
      <ButtonAddDeleteContact type="submit">Add contact</ButtonAddDeleteContact>
    </Form>
  );
}
