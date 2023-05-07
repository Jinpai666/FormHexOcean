import {CHANGE_TYPE} from "./setDishType";

const changeType = (selectedType: string) => {
    return {
        type: CHANGE_TYPE,
        payload: selectedType,
    };
};

export default changeType