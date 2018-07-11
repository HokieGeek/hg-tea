import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, filter, catchError, pluck } from 'rxjs/operators';

import { environment } from '../environments/environment';

import { Tea, TeaDbEntry, Entry } from './tea';

@Injectable()
export class TeaDbService {
    private host = environment.teadbUrl;
    private allTeasEndpoint = 'teas';
    private teaEndpoint = 'tea';

    private teasSum = '';
    private _cachedTeas: Tea[] = [];

    set cachedTeas(c: Tea[]) {
        // console.log('CACHING: ', c);
        this._cachedTeas = c;
    }

    get cachedTeas(): Tea[] {
        // console.log('Using CACHE: ', this._cachedTeas);
        return this._cachedTeas;
    }

    constructor (private http: HttpClient) { }

    get teasWithEntries(): Observable<Tea[]> {
        return this.http.get<HttpResponse<TeaDbEntry[]>>(
            this.host + '/' + this.allTeasEndpoint,
            {   observe: 'response',
                headers: new HttpHeaders({ 'If-None-Match':  this.teasSum })
            })
            .pipe(
                tap(resp => this.teasSum = resp.headers.get('etag')),
                filter(resp => resp.status === 200),
                pluck('body'),
                map((dbteas: TeaDbEntry[]) => dbteas.map(t => new Tea(t))),
                tap(teas => this.cachedTeas = teas),
                catchError(err => {
                    if (err.status === 304) {
                        return of(this.cachedTeas);
                    } else {
                        return throwError(err);
                    }
                })
            );
    }

    createTeaEntry(tea: Tea) {
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id;
        this.http.post(url, tea.dbentry).subscribe();
    }

    updateTeaEntry(tea: Tea) {
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id;
        this.http.put(url, tea.dbentry).subscribe();
    }

    createJournalEntry(tea: Tea, e: Entry) {
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id + '/entry';
        this.http.post(url, e.dbentry).subscribe();
    }

    updateJournalEntry(tea: Tea, e: Entry) {
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id + '/entry';
        this.http.put(url, e.dbentry).subscribe();
    }
}
