import axios from "axios";

const api = axios.create({
  baseURL: "https://6a8d6d96baf2ac84246d0ffa.mockapi.io",
});

export const getContacts = async () => {
  const response = await api.get("/contacts");

  return response.data;
};

export const addContact = async (contact) => {
  const response = await api.post("/contacts", contact);

  return response.data;
};

export const deleteContact = async (contactId) => {
  const response = await api.delete(`/contacts/${contactId}`);

  return response.data;
};
