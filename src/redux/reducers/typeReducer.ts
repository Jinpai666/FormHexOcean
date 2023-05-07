import { CHANGE_TYPE } from '../actions/setDishType/setDishType';

const initialState = {
    selectedType: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_TYPE:
            return {
                ...state,
                selectedType: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;