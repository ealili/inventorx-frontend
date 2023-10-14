import {request} from "../axios-client.js";

export const getClients = async () => {
  return await request('GET', 'clients')
}
