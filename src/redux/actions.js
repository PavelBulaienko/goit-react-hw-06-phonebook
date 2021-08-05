import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction('phonebook/AddContact');

export const deleteContact = createAction('phonebook/DeleteContact');

export const updateSessionContact = createAction('phonebook/UpdateContacts');

export const filteredContact = createAction('phonebook/FilteredContact');
