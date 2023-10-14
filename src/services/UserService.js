import {request} from "../axios-client.js";

export const getUsers = async () => {
    return await request('GET', 'users')
}

export const getAuthenticatedUser = async () => {
    return await request('GET', 'user')
}
