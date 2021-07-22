export const addContact = (newContact) => ({
  type: 'phonebook/AddContact',
  payload: newContact,
});

export const deleteContact = (contactId) => ({
  type: 'phonebook/DeleteContact',
  payload: contactId,
});
