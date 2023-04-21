import { useApolloClient } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";

const TOKEN_NAME = "authToken";
const AUTH_USER = "authUser";
const AUTH_ROLE = "authRole";

// custom hook to handle authToken - we use compositon to decouple the auth system and it's storage
export const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);
  const setAuthToken = (authToken) => setCookie(TOKEN_NAME, authToken);
  const removeAuthToken = () => removeCookie(TOKEN_NAME);
  return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
};
export const useAuthUserToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies([AUTH_USER]);
  const setAuthUserToken = (authUserToken) =>
    setCookie(AUTH_USER, authUserToken);
  const removeAuthUserToken = () => removeCookie(AUTH_USER);
  return [cookies[AUTH_USER], setAuthUserToken, removeAuthUserToken];
};
export const useAuthRole = () => {
  const [cookies, setCookie, removeCookie] = useCookies([AUTH_ROLE]);
  const setAuthRole = (authRole) => setCookie(AUTH_ROLE, authRole);
  const removeAuthRole = () => removeCookie(AUTH_ROLE);
  return [cookies[AUTH_ROLE], setAuthRole, removeAuthRole];
};

export const useLogout = () => {
  const [, , removeAuthToken] = useAuthToken();
  const [, , removeAuthUserToken] = useAuthUserToken();
  const [, , removeAuthRole] = useAuthRole();
  const apolloClient = useApolloClient();

  const logout = async () => {
    await apolloClient.clearStore(); // we remove all information in the store
    removeAuthToken();
    removeAuthUserToken();
    removeAuthRole();
  };
  return logout;
};
