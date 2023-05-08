import {configureStore} from "@reduxjs/toolkit";
import { reducer as formReducer } from 'redux-form';
import { reducer as typeReducer} from "../redux/features/setDishType"

 const store = configureStore({
    reducer: {
        form: formReducer,
        type: typeReducer,
    }
})
export default store