import {Role} from "./role.ts";

export interface UserType {
    "id": number,
    "name": string,
    "email": string,
    "created_at": string,
    "avatar": string,
    "role": Role,
    "team": {
        "id": number,
        "name": "-Will",
        "created_at": string,
        "updated_at": string
    }
}

export interface UserCreationPayload {
    invitation_token: string,
    name: string,
    email: string,
    room_number: string,
    password: string,
    password_confirmation: string
}

export interface UserWithWorkingHours {
    id: number,
    name: string,
    // Add total working hours - number
}

