import { createStore } from 'redux';

const contacts = {
  items: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: [],
};

const reducer = (state = contacts, { type, payload }) => {
  switch (type) {
    case 'phonebook/AddContact':
      return { items: [...state.items, payload], filter: state.filter };
    case 'phonebook/DeleteContact':
      return {
        items: [...state.items.filter((contact) => contact.id !== payload)],
        filter: state.filter,
      };
    case 'phonebook/UpdateContacts':
      return { items: payload, filter: state.filter };
    case 'phonebook/FilteredContact':
      return { items: state.items, filter: payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
