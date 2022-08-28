export interface User {
  _id: string;
  nick: string;
  email: string;
  role: string;
}

export interface AuthResp {
  user: User;
}

export interface Creds {
  email: string;
  password: string;
}

export interface SignUpFormData extends Creds {
  nick: string;
  confirmPassword: string;
}
