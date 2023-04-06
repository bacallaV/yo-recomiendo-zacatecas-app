import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root',
})
export class ContractService {
    private API_URL: string;
    private storage: Storage;
    private header: any;
    private endpoint: string = '';

    constructor(private http: HttpClient) {
        this.API_URL = environment.urlApi;
        this.storage = window.localStorage;

        this.endpoint = `${this.API_URL}/portal/contracts/list`;
        this.header = {
            'content-type': 'application/json',
        };
    }


    public index(params: any) {
        let queries: string[] = [];


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

        return this.http.get(`${ this.endpoint }?${ queries.join('&') }`, { headers: this.header }).pipe(
            tap(res => { return res }),
            catchError(err => { return throwError(err) })
        );
    }
}
