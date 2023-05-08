import React from 'react';
import { Provider } from 'react-redux';
import Form from './components/MyForm';
import {configureStore} from "@reduxjs/toolkit";
import { reducer as formReducer } from 'redux-form';
import { reducer as typeReducer} from "./redux/features/setDishType"

const store = configureStore({
    reducer: {
        form: formReducer,
        type: typeReducer,
    }
})

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <Form />
      </Provider>
  );
};

export default App;
