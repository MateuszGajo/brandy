import axios from "axios";
import { store } from "app/provider/RootStoreProvider";
import { ICreds } from "app/models/Authentication";
import { IActivity, IActivityDetails } from "app/models/Activity";
import { ICreateComment } from "app/models/Comment";
import { request } from "http";

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.withCredentials = true;

let isRefreshing = false;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response.status || null;
    const originalRequest = error.config;

    const userLogout = () => {
      store.authenticationStore.logout();
    };

    const refreshToken = () => {
      axios
        .get("auth/refresh")
        .catch(userLogout)
        .finally(() => {
          isRefreshing = false;
        });
    };

    if (statusCode === 401 && originalRequest.url === "auth/token/refresh")
      userLogout();
    else if (statusCode === 401 && !isRefreshing) {
      isRefreshing = true;
      refreshToken();
    }

    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string, opt = {}) => axios.get<T>(url, opt),
  post: <T>(url: string, body = {}) => axios.post<T>(url, body),
  put: <T>(url: string, body = {}) => axios.put<T>(url, body),
  delete: <T>(url: string) => axios.delete<T>(url),
};

const Auth = {
  login: (creds: ICreds) => requests.post("/auth/signin", creds),
  register: (creds: ICreds) => requests.post("/auth/signup", creds),
  verify: () => requests.get("/auth/verify"),
};

const Activity = {
  list: (params: URLSearchParams) =>
    requests.get<IActivity[]>("/activity", { params }),
  details: (id: string) => requests.get<IActivityDetails>(`/activity/${id}`),
};

const Comment = {
  add: (activityId: string, comment: ICreateComment) =>
    requests.get(`/activity/${activityId}/addComment`, comment),
};

export default { Auth, Activity, Comment };
