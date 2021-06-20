import { authHeader, handleResponse } from "../helpers";

// Constants
import { apiUrl } from "../constant";

function getAll() {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

export const userService = {
  getAll,
  getById,
};
