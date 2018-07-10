import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';

import { Tea, TeaDbEntry, Entry } from './tea';

@Injectable()
export class TeaDbService {
    private host = environment.teadbUrl;
    private allTeasEndpoint = 'teas';
    private teaEndpoint = 'tea';

    constructor (private http: HttpClient) { }

    get teasWithEntries(): Observable<Tea[]> {
        const url = this.host + '/' + this.allTeasEndpoint;
        return this.http.get<TeaDbEntry[]>(url).pipe(map(teas => teas.map(t => new Tea(t))));
    }

    createTeaEntry(tea: Tea) {
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id;
        this.http.post(url, tea.dbentry).subscribe(res => console.log(res));
        // TODO: update the entire thing?
    }

    updateTeaEntry(tea: Tea) {
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id;
        this.http.put(url, tea.dbentry).subscribe(res => console.log(res));
        // TODO: update the entire thing?
    }

    createJournalEntry(tea: Tea, e: Entry) {
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id + '/entry';
        this.http.post(url, e.dbentry).subscribe(res => console.log(res));
        // TODO: update the entire thing?
    }

    updateJournalEntry(tea: Tea, e: Entry) {
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id + '/entry';
        this.http.put(url, e.dbentry).subscribe(res => console.log(res));
        // TODO: update the entire thing?
    }
}
