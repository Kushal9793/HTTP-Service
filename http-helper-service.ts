import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class CoreHttpService {
    constructor(
        private http: HttpClient,
    ) { }

    httpGetRequest<TResponse>(
        url: string,
        reqHeader?: HttpHeaders
    ): Observable<TResponse> {
        return this.http
            .get(url, { headers: reqHeader })
            .pipe(
                map((res) => {
                    return res as TResponse;
                }),
                catchError(this.errorHandler)
            );
    }

    httpPostRequest<TRequest, TResponse>(
        url: string,
        data: TRequest,
        reqHeader?: HttpHeaders
    ): Observable<TResponse> {
        return this.http
            .post(url, data, { headers: reqHeader })
            .pipe(
                map((res) => {
                    return res as TResponse;
                }),
                catchError(this.errorHandler)
            );
    }

    httpDeleteRequest<TRequest, TResponse>(
        url: string,
        id?: TRequest
    ): Observable<TResponse> {
        return this.http
            .delete(url, id)
            .pipe(
                map((res) => {
                    return res as TResponse;
                }), catchError(this.errorHandler)
            );
    }

    httpPutRequest<TRequest, TResponse>(
        url: string,
        data: TRequest,
        reqHeader?: HttpHeaders
    ): Observable<TResponse> {
        return this.http
            .put(url, data, { headers: reqHeader })
            .pipe(
                map((res) => {
                    return res as TResponse;
                }), catchError(this.errorHandler)
            );
    }

    errorHandler = (error: HttpErrorResponse) => {
        if (!!error && !!error.status) {
            console.log(error.status);
        }
        return Observable.throw(error);
    }
}
