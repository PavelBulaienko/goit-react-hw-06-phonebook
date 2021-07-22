import '../style/App.css';
import Phonebook from './Phonebook';
import { Provider } from 'react-redux';
import store from '../redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Phonebook />
      </div>
    </Provider>
  );
}

export default App;
