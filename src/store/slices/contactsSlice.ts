import { IContact, IContacts } from "./../../models/models";
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import contactService from "../../services/contacts.service";
import { AppDispatch } from "../store";

const initialState: IContacts = {
  contacts: [],
  loading: false,
  error: "",
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    contactsFetching: (state) => {
      state.loading = true;
    },
    contactsFetchingSuccess: (state, action: PayloadAction<[]>) => {
      state.loading = false;
      state.error = "";
      state.contacts = action.payload;
    },
    contactsFetchingError: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    contactRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    contactCreated: (state, action: PayloadAction<IContact>) => {
      state.contacts = [...state.contacts, action.payload];
    },
    contactRemoved: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter((c) => c.id !== action.payload);
    },
    contactFiltered: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) =>
          contact?.number?.includes(action.payload) ||
          contact?.name?.includes(action.payload)
      );
    },
    contactUpdateSuccessed: (state, action) => {
      state.contacts[
        state.contacts.findIndex((u) => u.id === action.payload.id)
      ] = action.payload;
    },
  },
});

const { reducer: contactsReducer, actions } = contactsSlice;
const {
  contactsFetching,
  contactsFetchingSuccess,
  contactsFetchingError,
  contactRemoved,
  contactRequestFailed,
  contactCreated,
  contactFiltered,
  contactUpdateSuccessed,
} = actions;

const addContactRequested = createAction<IContact>(
  "comments/addContactRequested"
);
const removeContactRequested = createAction("comments/removeContactRequested");
const contactUpdateRequested = createAction("users/contactUpdateRequested");
const contactUpdateFailed = createAction<string>("users/contactUpdateFailed");

export const fetchContacts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(contactsFetching());
    const response = await axios.get(`contacts`);
    dispatch(contactsFetchingSuccess(response.data));
  } catch (e) {
    if (e instanceof Error) {
      dispatch(contactsFetchingError(e));
    }
  }
};

export const filterContacts =
  (searchValue: string) => (dispatch: AppDispatch) => {
    dispatch(contactFiltered(searchValue));
  };

export const createContact =
  (payload: IContact) => async (dispatch: AppDispatch) => {
    dispatch(addContactRequested(payload));
    try {
      const content = await contactService.createContact(payload);
      dispatch(contactCreated(content));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(contactRequestFailed(error.message));
      }
    }
  };
export const removeContact =
  (contactId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(removeContactRequested());
      await contactService.removeContact(contactId);
      dispatch(contactRemoved(contactId));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(contactRequestFailed(error.message));
      }
    }
  };
export const updateContact =
  (payload: IContact) => async (dispatch: AppDispatch) => {
    dispatch(contactUpdateRequested());
    try {
      const content = await contactService.update(payload);
      dispatch(contactUpdateSuccessed(content));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(contactUpdateFailed(error.message));
      }
    }
  };

export const getContacts = () => (state: { contacts: { contacts: any } }) =>
  state.contacts.contacts;

export default contactsReducer;
