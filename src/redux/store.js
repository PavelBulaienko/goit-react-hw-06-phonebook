import { configureStore, getDefaultMiddleware, createReducer } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import * as actions from './actions';
import {
  // persistStore,
  // persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'contactList',
//   storage,
// };

const contacts = {
  items: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: [],
};

const reducer = createReducer(contacts, {
  [actions.addContact]: ({ items, filter }, { payload }) => {
    return { items: [...items, payload], filter: filter };
  },
  [actions.deleteContact]: ({ items, filter }, { payload }) => {
    return {
      items: [...items.filter((contact) => contact.id !== payload)],
      filter: filter,
    };
  },
  [actions.updateSessionContact]: ({ filter }, { payload }) => {
    return { items: payload, filter: filter };
  },
  [actions.filteredContact]: ({ items }, { payload }) => {
    return { items: items, filter: payload };
  },
});

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

// const persistor = persistStore(store);

export default store;
