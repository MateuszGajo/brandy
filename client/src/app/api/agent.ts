import axios from "axios";
import { ICreds } from "app/models/Authentication";
import { IActivity } from "app/models/Activity";
import { IComment, ICreateComment } from "app/models/Comment";
import { IAuthResponse, IUser } from "app/models/User";

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.withCredentials = true;

const requests = {
  get: <T>(url: string, opt = {}) => axios.get<T>(url, opt),
  post: <T>(url: string, body = {}) => axios.post<T>(url, body),
  put: <T>(url: string, body = {}) => axios.put<T>(url, body),
  delete: <T>(url: string) => axios.delete<T>(url),
};

const Auth = {
  login: (creds: ICreds) => requests.post<IAuthResponse>("/auth/signin", creds),
  register: (creds: ICreds) =>
    requests.post<IAuthResponse>("/auth/signup", creds),
  verify: () => requests.get<IAuthResponse>("/auth/verify"),
  logout: () => requests.get("/auth/logout"),
};

const Activity = {
  list: (params: URLSearchParams) =>
    requests.get<IActivity[]>("/activity", { params }),
  details: (id: string) => requests.get<IActivity>(`/activity/${id}`),
  create: (activity: FormData) => requests.post("/activity/add", activity),
  upvote: (id: string) => requests.put(`/activity/${id}/upvote`),
  downvote: (id: string) => requests.put(`/activity/${id}/downvote`),
};

const Comment = {
  add: (activityId: string, comment: ICreateComment) =>
    requests.post<IComment>(`/activity/${activityId}/comments/add`, comment),
  list: (activityId: string, params: URLSearchParams) =>
    requests.get<IComment[]>(`/activity/${activityId}/comments`, { params }),
};

export default { Auth, Activity, Comment };
