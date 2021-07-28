import { React } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

const Contacts = ({ contacts, deleteContact }) => (
  <ul className="nameList">
    {contacts.items.map(({ id, name, number }) => (
      <li key={id} className="item">
        <p className="name">
          {name}: {number}
        </p>
        <button type="button" onClick={() => deleteContact(id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

const mapStateToProps = (state) => ({ contacts: state });

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (contactID) => dispatch(actions.deleteContact(contactID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
