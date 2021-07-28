export const addContact = (newContact) => ({
  type: 'phonebook/AddContact',
  payload: newContact,
});

export const deleteContact = (contactId) => ({
  type: 'phonebook/DeleteContact',
  payload: contactId,
});

export const updateSessionContact = (contacts) => ({
  type: 'phonebook/UpdateContacts',
  payload: contacts,
});
