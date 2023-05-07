import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import typeReducer from './reducers/typeReducer';

const rootReducer = combineReducers({
    form: formReducer,
    type: typeReducer,
});

const store = createStore(rootReducer);

export default store;

