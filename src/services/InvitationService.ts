import {request, requestWithoutToken} from "./axios-client.ts";
import {UserInvitationPayload} from "../types/invitation.ts";

export const getAllInvitations = async () => {
    return await request('GET', `invitations`)
}

export const inviteUser = async (payload: UserInvitationPayload) => {
    // console.log({ email: payload.email, password: payload.password });
    return await request('POST', 'invitations', payload)
}

export const getInvitation = async (invitationToken: string| undefined) => {
    return await requestWithoutToken('GET', `invitations/${invitationToken}`)
}

export const cancelInvitation = async (invitationToken: string) => {
    return await request('DELETE', `invitations/${invitationToken}`)
}