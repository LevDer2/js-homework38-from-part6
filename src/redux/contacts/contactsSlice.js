import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addContact as addContactApi,
  deleteContact as deleteContactApi,
  getContacts,
} from "../../services/api";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (userId) => {
    return await getContacts(userId);
  },
);

export const addContactThunk = createAsyncThunk(
  "contacts/addContact",
  async ({ contact, userId }) => {
    return await addContactApi(contact, userId);
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
  activeUserId: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    clearContacts(state) {
      state.items = [];
      state.isLoading = false;
      state.error = null;
      state.activeUserId = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state, action) => {
      state.items = [];
      state.isLoading = true;
      state.error = null;
      state.activeUserId = action.meta.arg;
    });

    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      if (state.activeUserId !== action.meta.arg) {
        return;
      }

      state.isLoading = false;
      state.items = action.payload;
    });

    builder.addCase(fetchContacts.rejected, (state, action) => {
      if (state.activeUserId !== action.meta.arg) {
        return;
      }

      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(addContactThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(addContactThunk.fulfilled, (state, action) => {
      if (state.activeUserId !== action.meta.arg.userId) {
        return;
      }

      state.isLoading = false;
      state.items.push(action.payload);
    });

    builder.addCase(addContactThunk.rejected, (state, action) => {
      if (state.activeUserId !== action.meta.arg.userId) {
        return;
      }

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

export const { clearContacts } = contactsSlice.actions;
export default contactsSlice.reducer;
