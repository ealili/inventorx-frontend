import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    access_token: null,
};

const userSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        loginUser(state, action) {
            const { user, access_token } = action.payload;
            state.user = user;
            state.access_token = access_token;
        },
        logoutUser(state) {
            state.user = null;
            state.access_token = null;
        },
    },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
