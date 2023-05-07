import { CHANGE_TYPE } from '../actions/setDishType/setDishType';

interface SetDishTypeAction {
    type: string;
    payload: string;
}
const initialState = {
    selectedType: "",
};

const reducer = (state = initialState, action:SetDishTypeAction) => {
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