import React from 'react';
import { Provider } from 'react-redux';
import Form from './components/MyForm';
import store from "./redux/store"



const App: React.FC = () => {
  return (
      <Provider store={store}>
        <Form />
      </Provider>
  );
};

export default App;
