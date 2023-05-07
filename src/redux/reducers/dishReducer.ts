import { SET_DISH_TYPE, DishActionTypes } from '../../types/dishType';

interface DishState {
    type: string;
}

const initialState: DishState = {
    type: '',
};

const dishReducer = (state = initialState, action: DishActionTypes): DishState => {
    switch (action.type) {
        case SET_DISH_TYPE:
            return {
                ...state,
                type: action.payload,
            };
        default:
            return state;
    }
};
export default dishReducer