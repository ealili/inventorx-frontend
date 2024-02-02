import {request} from "./axios-client.ts";
import {UserCreationPayload} from "../types/user.ts";
import {UpdateUserPayload} from "../types/auth.ts";

export const createUserByInvitation = async (payload: UserCreationPayload) => {
    return await request('POST', `users`, payload)
}

export const getUsers = async () => {
    console.log('Get users called')
    return await request('GET', 'users')
}

export const getUser = async (id: string) => {
    console.log('Get user called')
    return await request('GET', '/users/'+id)
}

export const updateUser = async (id: string | undefined, payload: UpdateUserPayload) => {
    console.log('Update user called')
    return await request('PUT', '/users/'+id, payload)
}