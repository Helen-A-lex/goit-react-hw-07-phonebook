import PropTypes from 'prop-types';
import { ListItem } from './ContactListItem.styled';
import { ButtonAddDeleteContact } from 'components/ContactForm/ContactForm.styled';
import { deleteContact } from '../../redux/operations';
import { useDispatch } from 'react-redux';

export const ContactListItem = ({ contact }) => {
  
  const dispatch = useDispatch();

  return (
    <>
      <ListItem key={contact.id}>
        {contact.name}: {contact.phone}
        <ButtonAddDeleteContact
          onClick={() => {
            dispatch(deleteContact(contact.id));
          }}
        >
          Delete
        </ButtonAddDeleteContact>
      </ListItem>
    </>
  );
};
ContactListItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
