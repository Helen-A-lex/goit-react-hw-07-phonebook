import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const hanlePanding = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending]: hanlePanding,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,

    [addContact.pending]: hanlePanding,

    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;

      state.items.push(action.payload);
    },
    [addContact.rejected]: handleRejected,

    [deleteContact.pending]: hanlePanding,
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const id = action.payload;
      state.items = state.items.filter(contact => contact.id !== id);
    },
    [deleteContact.rejected]: handleRejected,
  },
});

export const contactsReducer = contactSlice.reducer;

///////////////////////SELECTORS///////////////////////////////
export const getContacts = state => state.contacts;
export const getContactsItems = state => state.contacts.items;
export const getIsLoading = state => state.contacts.isLoading;
export const getError = state => state.contacts.error;
