export interface UserBody {
  email: string;
  password: string;
}

export interface SigninResponse {
  access_token: string;
  refresh_token: string;
}
