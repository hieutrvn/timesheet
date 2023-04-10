/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import axios from 'axios';

const requester = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
requester.interceptors.request.use((config: any) => {
  const accessToken: string = localStorage.getItem('token') ?? '';
  const accessHeaders = `Bearer ${accessToken}`;
  if (config.headers) {
    config.headers.Authorization = accessHeaders;
    return config;
  }
});

export default requester;
