// import React from "react";
import Axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { EHttpStatus } from '../constants';
import { ApiException, IObject, IObjectPromise } from '../dto';

export interface IAxiosRequestOptions extends AxiosRequestConfig {
  headers?: IObject | string[][]
}
export interface IAxiosResponse<T extends any> extends AxiosResponse {

}
export class AxiosHttpClient {
  private baseUrl: string
  private options: IAxiosRequestOptions
  private interceptors: IObjectPromise
  private instance: AxiosInstance
  constructor(config: { baseurl: string, options: IAxiosRequestOptions, interceptors?: IObjectPromise }) {
    const { baseurl = '', options = {}, interceptors = {} } = config;
    this.baseUrl = baseurl;
    this.options = options
    if (interceptors) {
      this.interceptors = interceptors
    } else {
      this.interceptors = {};
    }
    this.instance = Axios.create({
      baseURL: baseurl,
      ...options
    })
  }
  private handerError(error?: any): ApiException {

    if (!error) {
      return new ApiException("Unknown", EHttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!error.isAxiosError) {
      if (error.message) {
        return new ApiException(error.message, EHttpStatus.INTERNAL_SERVER_ERROR);
      }
      return new ApiException("Unknown", EHttpStatus.INTERNAL_SERVER_ERROR);
    }
    let { response, message = "Unknown" } = error as AxiosError;



    let type = "DEFAULT";
    let businessCode = -1;
    if (response) {
      const { data = {}, status = EHttpStatus.INTERNAL_SERVER_ERROR } = response;


      if (data.message) {
        message = data.message
      }
      if (data.type) {
        type = data.type;
      }
      if (data.businessCode) {
        businessCode = data.businessCode;
      }

      return new ApiException(message, status, data, type, businessCode)
    }
    return new ApiException(message, EHttpStatus.INTERNAL_SERVER_ERROR,)
  }

  private async intercept() {
    const headerAppend = await Promise.allObject(this.interceptors);
    return headerAppend;
  }

  async get<T>(endpoint: string, params: any = {}): Promise<IAxiosResponse<T>> {
    try {
      const headers = await this.intercept();
      const paramUrls = new URLSearchParams(params).toString();
      const url = (endpoint + "?" + paramUrls).trim();
      return await this.instance.get(url, { headers })
    } catch (error) {
      throw this.handerError(error)
    }

  }
  async getByBody<T>(endpoint: string, body: any = {}): Promise<IAxiosResponse<T>> {
    try {
      const headers = await this.intercept();

      return await this.instance.get(endpoint, { headers, data: body })
    } catch (error) {
      throw this.handerError(error)
    }

  }
  async post<T>(endpoint: string, body: any = {}): Promise<IAxiosResponse<T>> {
    try {
      const headers = await this.intercept();
      const url = (endpoint).trim();
      return await this.instance.post(url, body, {
        headers
      })
    } catch (error) {
      throw this.handerError(error)
    }
  }

  async put<T>(endpoint: string, body: any = {}): Promise<IAxiosResponse<T>> {
    try {
      const headers = await this.intercept();

      const url = (endpoint).trim();
      return await this.instance.put(url, body, {
        headers
      })
    } catch (error) {
      throw this.handerError(error)
    }
  }

  async patch<T>(endpoint: string, body: any = {}): Promise<IAxiosResponse<T>> {
    try {
      const headers = await this.intercept();

      const url = (endpoint).trim();
      return await this.instance.patch(url, body, {
        headers
      })
    } catch (error) {
      throw this.handerError(error)
    }
  }
  async delete<T>(endpoint: string, body: any = {}): Promise<IAxiosResponse<T>> {
    try {
      const headers = await this.intercept();
      const url = (endpoint).trim();
      return await this.instance.delete(url, {
        headers,
        data: body
      })
    } catch (error) {
      throw this.handerError(error)
    }
  }

  async uploadFile<T = any>(endpoint: string, formData: FormData, onUploadProgress?: (event: any) => void): Promise<IAxiosResponse<T>> {
    try {
      const headers = await this.intercept();
      Object.assign(headers, {
        "Content-Type": "multipart/form-data"
      })
      const url = (endpoint).trim();
      return await this.instance.post(url, formData, {
        headers,
        onUploadProgress
      })
    } catch (error) {
      throw this.handerError(error)
    }
  }
}

