import {UserStateInterface} from "./user.interface.ts";
export const selectCurrentUser = (state: { userState: UserStateInterface}) => state.userState.user
export const selectToken = (state: { userState: UserStateInterface})  => state.userState.access_token