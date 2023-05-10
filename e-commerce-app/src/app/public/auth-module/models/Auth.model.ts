export interface Login {
  email: string;
  password: string;
}

export interface Signup extends Login {
  firstName: string;
  lastName: string;
}

export interface LoginResponse {
  status: string;
  token: string;
}

export interface SignupResponse {
  message: string;
  status: string;
}
