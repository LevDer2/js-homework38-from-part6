import { useDispatch, useSelector } from "react-redux";

import { deleteContactThunk } from "../redux/contacts/contactsSlice";
import { selectContacts } from "../redux/contacts/selectors";

function ContactList() {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);

  const handleDelete = (contactId) => {
    dispatch(deleteContactThunk(contactId));
  };

  if (contacts.length === 0) {
    return <p>No contacts yet.</p>;
  }

  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <span>
            {contact.name}: {contact.phone}
          </span>

          <button type="button" onClick={() => handleDelete(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
