import {CHANGE_TYPE} from "./setDishType";

const changeType = (selectedType) => {
    return {
        type: CHANGE_TYPE,
        payload: selectedType,
    };
};

export default changeType