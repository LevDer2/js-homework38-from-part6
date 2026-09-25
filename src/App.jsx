import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { fetchContacts } from "./redux/contacts/contactsSlice";
import { selectError, selectIsLoading } from "./redux/contacts/selectors";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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

export default App;
