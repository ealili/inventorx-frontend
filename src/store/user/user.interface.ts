import {Role} from "../../types/role.ts";

export interface UserInterface {
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

export interface UserStateInterface {
    onDeleteCallback: () => Promise<void>,
    user: UserInterface;
    access_token: string;
}
