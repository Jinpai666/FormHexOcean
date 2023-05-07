import * as React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import MyForm from './components/MyForm';

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <MyForm />
      </Provider>
  );
};

export default App;
