import { Component } from 'react';
import Contacts from './Contacts';
import FilteredContacts from './FilteredContacts';
import shortid from 'shortid';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

class Phonebook extends Component {
  state = {
    name: '',
    number: '',
  };

  componentDidMount() {
    localStorage.getItem('contacts') &&
      this.props.updateContacts(JSON.parse(localStorage.getItem('contacts')));
  }

  componentDidUpdate() {
    this.props.contacts.items &&
      localStorage.setItem('contacts', JSON.stringify(this.props.contacts.items));
  }

  handleInputName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleInputContact = (e) => {
    this.setState({ number: e.target.value });
  };
  handleInputFilter = (e) => {
    const names = this.props.contacts.items.map((contact) => contact.name);
    const filteredNames = names.filter((name) =>
      name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    this.props.filterContacts(filteredNames);
  };

  render() {
    return (
      <>
        <form className="form">
          <label className="nameLabel">Name</label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={this.handleInputName}
            className="nameInput"
          />
          <label className="numberLabel">Number</label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={this.handleInputContact}
            className="numberInput"
          />
          <button
            type="submit"
            onClick={() =>
              this.props.addContact({
                name: this.state.name,
                id: shortid.generate(),
                number: this.state.number,
              })
            }
          >
            Add contact
          </button>
        </form>
        <h2>Contacts: </h2>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          onChange={this.handleInputFilter}
          className="nameFilter"
        />
        {this.props.contacts.filter.length === 0 ? (
          <Contacts contacts={this.props.contacts.items} />
        ) : (
          <FilteredContacts
            contacts={this.props.contacts.items}
            filter={this.props.contacts.filter}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({ contacts: state });

const mapDispatchToProps = (dispatch) => ({
  addContact: (contact) => dispatch(actions.addContact(contact)),
  updateContacts: (contacts) => dispatch(actions.updateSessionContact(contacts)),
  filterContacts: (contacts) => dispatch(actions.filteredContact(contacts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Phonebook);
