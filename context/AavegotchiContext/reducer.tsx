import { State } from "./initialState";

export type Action =
  | {
      type: "SET_USERS_AAVEGOTCHIS";
      usersAavegotchis: State["usersAavegotchis"];
    }
  | {
      type: "SET_SELECTED_AAVEGOTCHI";
      selectedAavegotchi: State["selectedAavegotchi"];
    }
  | {
      type: "START_ASYNC";
    }
  | {
      type: "SET_ERROR";
      error: State["error"];
    }
  | {
      type: "SET_NETWORK_ID";
      networkId: State["networkId"];
    }
  | {
      type: "END_ASYNC";
    };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USERS_AAVEGOTCHIS": {
      return {
        ...state,
        usersAavegotchis: action.usersAavegotchis,
      };
    }
    case "SET_SELECTED_AAVEGOTCHI": {
      return {
        ...state,
        selectedAavegotchi: action.selectedAavegotchi,
      };
    }
    case "START_ASYNC": {
      return {
        ...state,
        loading: true,
      };
    }
    case "END_ASYNC": {
      return {
        ...state,
        loading: false,
      };
    }
    case "SET_ERROR": {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case "SET_NETWORK_ID": {
      return {
        ...state,
        networkId: action.networkId,
      };
    }
    default:
      throw new Error("Bad action type");
  }
};
