import {requestWithoutToken} from "./axios-client.ts";
import {ContactPayload} from "../types/contact.ts";

export const sendContactDetails = async (data: ContactPayload) => {
    return await requestWithoutToken('POST', `contact`, data)
}