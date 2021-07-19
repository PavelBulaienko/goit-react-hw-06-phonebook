import React from 'react';

const Contacts = ({ contacts, handleDelete }) => (
  <ul className="nameList">
    {contacts.map((contact) => (
      <li key={contact.id} className="item">
        <p className="name">
          {contact.name}: {contact.number}
        </p>
        <button type="button" onClick={handleDelete(contact.id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);
export default Contacts;
