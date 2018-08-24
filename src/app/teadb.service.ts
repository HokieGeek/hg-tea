import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, filter, catchError, pluck } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from '../environments/environment';

import { Tea, TeaDbEntry, Entry } from './tea';

@Injectable()
export class TeaDbService {
    private host = environment.teadbUrl;
    private allTeasEndpoint = 'teas';
    private teaEndpoint = 'tea';

    private teasSum = '';
    private _cachedTeas: Tea[] = [];

    private _cachedTeasById: Map<number, Tea> = new Map<number, Tea>();
    private _cachedTeaSumsById: Map<number, string> = new Map<number, string>();

    set cachedTeas(c: Tea[]) {
        this._cachedTeas = c;
    }

    get cachedTeas(): Tea[] {
        return this._cachedTeas;
    }

    getCachedTeaSum(id: number): string {
        if (this._cachedTeaSumsById.has(id)) {
            return this._cachedTeaSumsById.get(id);
        }
        return '';
    }

    setCachedTeaSum(id: number, sum: string) {
        this._cachedTeaSumsById.set(id, sum);
    }

    getCachedTea(id: number): Tea {
        if (this._cachedTeasById.has(id)) {
            return this._cachedTeasById.get(id);
        }
        return null;
    }

    setCachedTea(id: number, tea: Tea) {
        this._cachedTeasById.set(id, tea);
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

    getTeaById(id: number): Observable<Tea> {
        return this.http.get<HttpResponse<TeaDbEntry>>(
            this.host + '/' + this.teaEndpoint + '/' + id,
            {   observe: 'response',
                headers: new HttpHeaders({ 'If-None-Match': this.getCachedTeaSum(id) })
            })
            .pipe(
                tap(resp => this.setCachedTeaSum(id, resp.headers.get('etag'))),
                filter(resp => resp.status === 200),
                pluck('body'),
                map((t: TeaDbEntry) => new Tea(t)),
                tap(t => this.setCachedTea(id, t)),
                catchError(err => {
                    if (err.status === 304) {
                        return of(this.getCachedTea(id));
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

    deleteTeaEntry(tea: Tea) {
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id;
        this.http.delete(url).subscribe();
    }

    createJournalEntry(tea: Tea, e: Entry) {
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id + '/entry';
        this.http.post(url, e.dbentry).subscribe();
    }

    updateJournalEntry(tea: Tea, e: Entry) {
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id + '/entry';
        this.http.put(url, e.dbentry).subscribe();
    }

    deleteJournalEntry(tea: Tea, e: Entry) {
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id + '/entry/' +  moment(e.datetime).unix();
        this.http.delete(url).subscribe();
    }
}
