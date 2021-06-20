import { authenticationService } from "../services/Authentication";

export function authHeader() {
  // return authorization header with jwt token
  const currentUser = authenticationService.currentUserValue;
  if (currentUser?.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  }

  return {};
}
