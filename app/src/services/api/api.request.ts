import axios from 'axios';

import { Config } from '../../config';
import {
  SigninResponse,
  UserBody,
  MatchPublicResponse,
  MatchPublic,
} from '../../interfaces';

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

export const createMatchPublic = async (
  body: MatchPublic,
): Promise<MatchPublicResponse> => {
  const { data } = await axiosInstance.post<MatchPublicResponse>(
    `matches-public`,
    body,
  );
  return data;
};

export const updateMatchPublic = async (
  body: MatchPublic,
): Promise<MatchPublicResponse> => {
  const { data } = await axiosInstance.patch<MatchPublicResponse>(
    `matches-public`,
    body,
  );
  return data;
};

export const getMatchPublicById = async (
  id: string | undefined,
): Promise<MatchPublicResponse> => {
  if (!id) return Promise.reject('id is undefined');
  const { data } = await axiosInstance.get<MatchPublicResponse>(
    `matches-public/${id}`,
  );
  return data;
};
