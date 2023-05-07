export const SET_DISH_TYPE = 'SET_DISH_TYPE';

export interface SetDishTypeAction {
    type: typeof SET_DISH_TYPE;
    payload: string;
}

export type DishActionTypes = SetDishTypeAction;