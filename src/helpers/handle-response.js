import { authenticationService } from "../services/Authentication";

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].includes(response.status)) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        authenticationService.logout();
        // eslint-disable-next-line no-restricted-globals
        location.reload(true);
      }

      const error = data?.message || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
