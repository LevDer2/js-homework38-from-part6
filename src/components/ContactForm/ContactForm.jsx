import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addContactThunk } from "../../redux/contacts/contactsSlice";
import { selectUserId } from "../../redux/auth/selectors";

function ContactForm() {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !phone.trim()) {
      return;
    }

    const contact = {
      name: name.trim(),
      phone: phone.trim(),
    };

    try {
      await dispatch(addContactThunk({ contact, userId })).unwrap();

      setName("");
      setPhone("");
    } catch (error) {
      console.error("Failed to add contact:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          required
        />
      </label>

      <label>
        Phone
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone"
          required
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
}

export default ContactForm;
