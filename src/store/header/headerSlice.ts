import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    title: 'DefaultTitle',
}

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setHeaderTitle(state, action) {
            // console.log('headerTitle', action.payload);
            state.title = action.payload;
        },
    },
});

export const {setHeaderTitle} = headerSlice.actions;
export default headerSlice.reducer;