import {request} from "./axios-client.ts";

export const getAllRoles = async () => {
    return await request('GET', `roles`)
}
