import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { catchError, lastValueFrom, map, throwError } from 'rxjs';

@Injectable()
export class ApiClientService {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const observer = this.httpService.get<T>(url, config).pipe(
      map((res) => res.data),
      catchError((err: AxiosError) => this.handleError(err)),
    );

    return lastValueFrom(observer);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const observer = this.httpService.post<T>(url, data, config).pipe(
      map((res) => res.data),
      catchError((err: AxiosError) => this.handleError(err)),
    );

    return lastValueFrom(observer);
  }

  private handleError(error: AxiosError) {
    return throwError(() => ({
      status: error.response?.status || 500,
      message: error.response?.data || 'Internal Server Error',
    }));
  }
}
