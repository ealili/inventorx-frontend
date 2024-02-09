import {request} from "./axios-client.ts";
import {WorkingHoursPayload} from "../types/working-hours.ts";

export const getTeamWorkingHours = async () => {
    return await request('GET', `working-hours?month=2024-02`)
}

export const getEmployeeWorkingHour = async (userId: number, date: string) => {
    return await request('GET', `working-hours/users/${userId}?date=${date}`)
}


// TODO: Update month
export const generatePDF = async () => {
    // TODO: Get date in the requested format
    return await request('POST', `working-hours/pdf?month=2024-02`)
}

export const storeWorkingHours = async (payload: WorkingHoursPayload) => {
    return await request('POST', `working-hours`, payload)
}


export const getEmployeeWorkingHoursByMonth = async (userId: number, date: string) => {
    return await request('GET', `working-hours/user/${userId}?date=${date}`)
}