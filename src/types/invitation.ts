import {Role} from "./role.ts";

export interface UserInvitation {
    id: number,
    invitation_token: string,
    email: string,
    room_number: string,
    created_at: string
    role: Role
}

export interface UserInvitationPayload {
    email: string,
    team_id: number
    room_number: string,
    role_id: number
}