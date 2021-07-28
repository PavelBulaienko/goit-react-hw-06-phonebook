import { React } from 'react';

const FilteredContacts = ({ contacts, filter }) => (
  <ul className="nameList">
    {filter.map((contactName) => {
      const { id, name, number } = contacts.find((contact) => contact.name === contactName);

      return (
        <li key={id} className="item">
          <p className="name">
            {name}: {number}
          </p>
        </li>
      );
    })}
  </ul>
);

export default FilteredContacts;
