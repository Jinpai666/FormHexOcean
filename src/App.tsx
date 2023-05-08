import React from 'react';
import { Provider } from 'react-redux';
import Form from './components/Form/Form';
import store from "./redux/store"
import './css reset/reset.scss'
import './App.scss'



const App: React.FC = () => {
  return (
      <Provider store={store}>
        <Form />
      </Provider>
  );
};

export default App;
