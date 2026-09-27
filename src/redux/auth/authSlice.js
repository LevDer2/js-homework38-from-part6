import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { clearContacts } from "../contacts/contactsSlice";

const readStoredUsers = () => {
  try {
    const users = JSON.parse(localStorage.getItem("phonebookUsers"));
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
};

const readCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("phonebookCurrentUser"));
  } catch {
    return null;
  }
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    const users = readStoredUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((user) => user.email === normalizedEmail)) {
      return rejectWithValue("A user with this email already exists.");
    }

    const user = {
      id: nanoid(),
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    const currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    localStorage.setItem("phonebookUsers", JSON.stringify([...users, user]));
    localStorage.setItem(
        "phonebookCurrentUser",
      JSON.stringify(currentUser),
    );
    dispatch(clearContacts());

    return currentUser;
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = readStoredUsers().find(
      (storedUser) =>
        storedUser.email === normalizedEmail && storedUser.password === password,
    );

    if (!user) {
      return rejectWithValue("Invalid email or password.");
    }

    const currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    localStorage.setItem(
      "phonebookCurrentUser",
      JSON.stringify(currentUser),
    );
    dispatch(clearContacts());

    return currentUser;
  },
);

const storedUser = readCurrentUser();

const initialState = {
  user: storedUser,
  isLoggedIn: Boolean(storedUser),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    });
  },
});

const { logout } = authSlice.actions;

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("phonebookCurrentUser");
  dispatch(clearContacts());
  dispatch(logout());
};

export default authSlice.reducer;
