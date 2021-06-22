import { queryConstants } from "../../constants/query.constants";

export const handleSearchInputChange = (value) => {
  return (dispatch) =>
    dispatch({
      type: queryConstants.HANDLE_SEARCH_INPUT_CHANGE,
      payload: {
        value: value,
      },
    });
};
