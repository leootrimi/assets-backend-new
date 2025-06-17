import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig, Method } from 'axios';

@Injectable()
export class ApiRequest {
  constructor(private readonly httpService: HttpService) {}

  async makeRequest<T>(
    url: string,
    method: Method,
    body?: any,
    headers: Record<string, string> = {},
    queryParams: Record<string, any> = {},
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        params: queryParams,
      };

      if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        config.data = body;
      }

      const response = await firstValueFrom(this.httpService.request<T>(config));
      return response.data;
    } catch (error) {
      console.error(`Error making ${method} request to ${url}:`, error.message);
      throw new Error(`Failed to execute ${method} request to ${url}`);
    }
  }
}