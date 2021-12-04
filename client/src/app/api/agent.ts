import axios from "axios";
import { store } from "app/provider/RootStoreProvider";
axios.defaults.baseURL = "http://localhost:5000/";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response.status || null;
    const originalRequest = error.config;

    const refreshTokenValue = "refersh";

    const userLogout = () => {
      store.authenticationStore.logout();
    };

    const refreshToken = () => {
      axios
        .post("auth/refresh", { refreshToken: refreshTokenValue })
        .catch(userLogout);
    };

    if (statusCode === 401 && originalRequest.url === "auth/token/refresh")
      userLogout();
    else if (statusCode === 401 && !originalRequest.retry) {
      originalRequest._retry = true;
      refreshToken();
    }

    return Promise.reject(error);
  }
);
