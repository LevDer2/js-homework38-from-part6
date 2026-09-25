import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getContacts,
  addContact as addContactApi,
  deleteContact as deleteContactApi,
} from "../../services/api";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const data = await getContacts();

    return data;
  },
);

export const addContactThunk = createAsyncThunk(
  "contacts/addContact",
  async (contact) => {
    const data = await addContactApi(contact);

    return data;
  },
);

export const deleteContactThunk = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId) => {
    await deleteContactApi(contactId);

    return contactId;
  },
);

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",

  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });

    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(addContactThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(addContactThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items.push(action.payload);
    });

    builder.addCase(addContactThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteContactThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(deleteContactThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      state.items = state.items.filter(
        (contact) => contact.id !== action.payload,
      );
    });

    builder.addCase(deleteContactThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default contactsSlice.reducer;
