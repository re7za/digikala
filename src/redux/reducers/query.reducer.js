import { queryConstants } from "../../constants/query.constants";

const initialState = {
  searchQuery: "",
};

export const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case queryConstants.HANDLE_SEARCH_INPUT_CHANGE:
      return Object.assign({}, state, {
        searchQuery: action.payload.value,
      });

    default:
      return state;
  }
};
