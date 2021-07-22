import { Component } from 'react';
// import Contacts from './Contacts';
import shortid from 'shortid';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

class Phonebook extends Component {
  state = {
    // contacts: [
    //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    // ],
    filter: [],
    name: '',
    number: '',
  };

  componentDidMount() {
    this.setState(JSON.parse(localStorage.getItem('contacts')));
  }

  componentDidUpdate() {
    // localStorage.setItem('contacts', JSON.stringify(this.state));
    localStorage.setItem('contacts', JSON.stringify(this.props.contacts));
  }

  nameCheking = () => {
    let filteredContacts = [];
    // const { contacts, filter } = this.state;
    const { filter } = this.state;
    this.props.contacts.forEach((contact) => {
      filter.forEach((filterItem) => {
        if (contact.name === filterItem) {
          filteredContacts.push(contact);
        }
      });
    });
    if (filter.length === 0) {
      filteredContacts = this.props.contacts;
    }

    return filteredContacts;
  };
  handleInputName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleInputContact = (e) => {
    this.setState({ number: e.target.value });
  };
  handleAddContact = (e) => {
    e.preventDefault();
    const prevState = this.state;
    let isAlreadyInContacts = false;

    this.state.contacts.forEach((contact) => {
      if (this.state.name === contact.name) {
        alert(this.state.name + ' is already in contacts');
        isAlreadyInContacts = true;
      }
    });
    if (!isAlreadyInContacts) {
      this.setState({
        contacts: [
          {
            name: this.state.name,
            id: shortid.generate(),
            number: this.state.number,
          },
          ...prevState.contacts,
        ],
      });
    }
  };
  handleInputFilter = (e) => {
    const names = this.state.contacts.map((contact) => contact.name);
    const filteredNames = names.map((name) => {
      if (name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return name;
      } else return false;
    });
    this.setState({ filter: filteredNames });
  };
  handleDelete = (id) => {
    const closureHandleDelete = () => {
      const prevState = this.state;
      this.setState({
        contacts: prevState.contacts.filter((contact) => contact.id !== id),
      });
    };
    return closureHandleDelete;
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
        {/* <Contacts contacts={this.nameCheking()} handleDelete={this.props.deleteContact} /> */}
        {/* <Contacts contacts={this.props.contacts} handleDelete={this.props.deleteContact} /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({ contacts: state });

const mapDispatchToProps = (dispatch) => ({
  addContact: (contact) => dispatch(actions.addContact(contact)),
  deleteContact: (contact) => dispatch(actions.deleteContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Phonebook);
