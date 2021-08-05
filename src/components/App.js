import '../style/App.css';
import Phonebook from './Phonebook';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import store from '../redux/store';

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={store.persistor}> */}
      <div className="App">
        <Phonebook />
      </div>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
