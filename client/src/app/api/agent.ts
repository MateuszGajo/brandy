import axios from "axios";
import { store } from "app/provider/RootStoreProvider";
import { ICreds } from "app/models/Authentication";
axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.withCredentials = true;

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

const requests = {
  get: <T>(url: string) => axios.get<T>(url),
  post: <T>(url: string, body: any) => axios.post<T>(url, body),
  put: <T>(url: string, body: any) => axios.put<T>(url, body),
  delete: <T>(url: string) => axios.delete<T>(url),
};

const Auth = {
  login: (creds: ICreds) => requests.post("/auth/signin", creds),
  register: (creds: ICreds) => requests.post("/auth/signup", creds),
};

export default { Auth };
