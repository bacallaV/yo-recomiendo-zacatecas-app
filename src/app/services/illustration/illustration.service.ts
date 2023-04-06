import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class IllustrationService {
    private API_URL: string;
    private storage: Storage;
    private header: any;
    private endpoint: string = '';


    constructor(private http: HttpClient) {
        this.API_URL = environment.urlApi;
        this.storage = window.localStorage;
        this.endpoint = `${this.API_URL}/illustrations`;
        this.header = {
            'content-type': 'application/json',
            'access-token': this.storage.getItem('access-token'),
        };
    }


    public index(params: any) {
        let queries: string[] = [];
        let url: string = `${ this.endpoint }`;

        for(const [ key, value ] of Object.entries(params)) {
             if(Array.isArray(value)) {
                 value.forEach(el => queries.push(`${key}[]=${el}`));
             } else {
                 if(value != null) {
                     if(typeof value === 'string' || typeof value === 'number') queries.push(`${key}=${value}`);
                     if(typeof value === 'boolean') queries.push(`${key}=${value ? 1 : 0}`);
                 }
             }
         }

         return this.http.get(`${url}?${ queries.join('&') }`, { headers: this.header }).pipe(
             tap(res => { return res } ),
             catchError(err => { return throwError(err) })
         );
     }

    public list() {
        let queries: string[] = [];
        let url: string = `${ this.endpoint }/list`;

         return this.http.get(`${url}?${ queries.join('&') }`, { headers: this.header }).pipe(
             tap(res => { return res } ),
             catchError(err => { return throwError(err) })
         );
     }
}
