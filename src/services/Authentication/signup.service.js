import axios from "axios";
// import { handleResponse } from "../../helpers";

export const signup = (mobileNumber, password, refererCode) => {
  return axios
    .post(`/identity/Register`, {
      mobileNumber,
      password,
      refererCode,
    })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      return "failed";
    });
};
