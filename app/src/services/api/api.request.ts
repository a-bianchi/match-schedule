import axios from 'axios';
import { SigninResponse, UserBody } from '../../interfaces/auth.interface';
import { Config } from '../../config';

const axiosInstance = axios.create({
  baseURL: `${Config.api.url}/v1/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
});

export const refreshAccessTokenFn = async () => {
  const { data } = await axiosInstance.post('auth/refresh');
  return data;
};

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    console.log(error);
    const errMessage = error?.response?.data?.message as string;
    if (errMessage.includes('not logged in') && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessTokenFn();
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);

export const signIn = async (body: UserBody): Promise<SigninResponse> => {
  const { data } = await axiosInstance.post<SigninResponse>(
    `auth/local/signin`,
    body,
  );
  return data;
};

export const signUp = async (body: UserBody): Promise<SigninResponse> => {
  const { data } = await axiosInstance.post<SigninResponse>(
    `auth/local/signup`,
    body,
  );
  return data;
};

export const logout = async (body: UserBody): Promise<boolean> => {
  const { data } = await axiosInstance.post<boolean>(`auth/local/logout`, body);
  return data;
};
