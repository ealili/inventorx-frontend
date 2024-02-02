import {requestWithoutToken, request} from "./axios-client.ts";
import {
    LoginPayload,
    RegisterPayload,
    ForgotPasswordPayload,
    ResetPasswordPayload,
    UpdatePasswordPayload
} from "../types/auth.ts";

export const login = async (payload: LoginPayload) => {
    console.log(payload)
    // console.log({ email: payload.email, password: payload.password });
    return await requestWithoutToken('POST', 'login', payload)
}

export const register = async (payload: RegisterPayload) => {
    return await requestWithoutToken('POST', 'register', payload)
}

export const sendForgotPasswordRequest = async (payload: ForgotPasswordPayload) => {
    return await requestWithoutToken('POST', 'password/forgot', payload)
}

export const resetPasswordRequest = async (payload: ResetPasswordPayload) => {
    return await requestWithoutToken('POST', 'password/reset', payload)
}

export const updatePasswordRequest = async (payload: UpdatePasswordPayload) => {
    return await request('PUT', 'password/update', payload)
}