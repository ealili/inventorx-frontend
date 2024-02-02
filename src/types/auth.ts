export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    team_name: string;
}

export interface ForgotPasswordPayload {
    email: string | undefined
}

export interface UpdateUserPayload {
    name: string;
}

export interface ResetPasswordPayload {
    token: string | undefined,
    email: string,
    password: string,
    password_confirmation: string
}

export interface UpdatePasswordPayload {
    current_password: string,
    new_password: string,
    new_password_confirmation: string
}