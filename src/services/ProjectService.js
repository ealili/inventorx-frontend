import {request} from "../axios-client.js";

export const getProjects = async () => {
  return await request('GET', 'projects')
}
