import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import { fetchContacts } from "../../redux/contacts/contactsSlice.js";
import { selectError, selectIsLoading } from "../../redux/contacts/selectors";
import { selectUserId } from "../../redux/auth/selectors";

function Contacts() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    if (userId) {
      dispatch(fetchContacts(userId));
    }
  }, [dispatch, userId]);

  return (
    <main>
      <h1>Phonebook</h1>
      <ContactForm />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ContactList />
    </main>
  );
}

export default Contacts;
