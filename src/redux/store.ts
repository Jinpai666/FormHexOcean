import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import dishReducer from './reducers/dishReducer';

const rootReducer = combineReducers({
    form: formReducer,
    dish: dishReducer,
});

const store = createStore(rootReducer);

export default store;

