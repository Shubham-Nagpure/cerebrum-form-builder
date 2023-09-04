import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      body?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, body, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data: body,
        params,
        headers: {
          Authorization:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTMzMDE4MjQsImV4cCI6MTcyNDgzNzgyNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImlkIjoiMmViZDY1OTItNTE4NC00ODY1LTkyYTUtMWUxOTc5NTU5ZjFmIiwidXNlcm5hbWUiOiJ0ZXN0In0.g6UkvuyRXud0cRydsATjqPIrr97djAzicI0jnvEZebM'
        }
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      };
    }
  };

const baseApi = createApi({
  baseQuery: axiosBaseQuery({
    // baseUrl: 'https://cfff-202-149-221-42.ngrok-free.app'
    baseUrl: 'https://jsonplaceholder.typicode.com/'
  }),
  tagTypes: ['todlist'],
  endpoints: () => ({})
});

export default baseApi;
