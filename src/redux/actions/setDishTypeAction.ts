import { SET_DISH_TYPE, DishActionTypes } from '../../types/dishType';

const setDishType = (dishType: string): DishActionTypes => ({
    type: SET_DISH_TYPE,
    payload: dishType,
});

export default setDishType