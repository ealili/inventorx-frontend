import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {NotificationType} from "../../types/notification.ts";

const initialState = {
    notification: null,
    type: 'success'
}

export const notify = createAsyncThunk(
    'notification/notify',
    async (notification: NotificationType, {dispatch}) => {
        const {message, type = 'success'} = notification;
        // Dispatch the setNotification action
        dispatch(setNotification({message, type}));

        // Wait for 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Dispatch the resetNotification action
        dispatch(resetNotification());
    }
);

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            state.notification = action.payload.message;
            state.type = action.payload.type ? action.payload.type : 'success';
        },
        resetNotification(state) {
            state.notification = null;
            state.type = 'success';
        }
    }
});


export const {setNotification, resetNotification} = notificationSlice.actions
export default notificationSlice.reducer;
