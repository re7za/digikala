import axios from "axios";
import { BehaviorSubject } from "rxjs";
import { handleResponse } from "../../helpers";

// Constants
import { apiUrl } from "../constant";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

function login(mobileNumber, password) {
  return axios
    .post(`${apiUrl}/identity/Authenticate`, {
      mobileNumber,
      password,
    })
    .then(handleResponse)
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      return "failed";
    });

  // return fetch(`${apiUrl}/users/authenticate`, requestOptions)
  //   .then(handleResponse)
  //   .then((user) => {
  //     // store user details and jwt token in local storage to keep user logged in between page refreshes
  //     localStorage.setItem("currentUser", JSON.stringify(user));
  //     currentUserSubject.next(user);

  //     return user;
  //   });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};
