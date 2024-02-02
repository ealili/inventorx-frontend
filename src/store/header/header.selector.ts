import {HeaderInterface} from "./header.interface.ts";

export const selectHeaderTitle = (state: HeaderInterface) => state.header.title
export const selectHeader = (state: HeaderInterface) => state.header