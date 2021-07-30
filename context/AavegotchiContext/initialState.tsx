import { Aavegotchi } from "types";

export interface State {
  usersAavegotchis?: Array<Aavegotchi>;
  selectedAavegotchi?: Aavegotchi;
  loading: boolean;
  error?: Error;
  networkId?: number;
}

export const initialState: State = {
  loading: false,
}