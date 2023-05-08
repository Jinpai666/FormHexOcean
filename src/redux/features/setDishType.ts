import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TypeSelection} from "../../types/TypeSelection"

interface TypeState {
    value: string;
}

const initialState: TypeState = {
    value: "",
};



const setTypeSlice = createSlice({
    name: "setType",
    initialState,
    reducers: {
        handleTypeSelection: (state, action: PayloadAction<TypeSelection>) => {
            state.value = action.payload.selectedType;
        },
    },
});

export const { handleTypeSelection } = setTypeSlice.actions;

export const reducer = setTypeSlice.reducer;
