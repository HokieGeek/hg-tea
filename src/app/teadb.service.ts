import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Tea } from './tea';
import { Entry } from './entry';

@Injectable()
export class TeaDbService {
    private teaDb = 'https://spreadsheets.google.com/feeds/list/1-U45bMxRE4_n3hKRkTPTWHTkVKC8O3zcSmkjEyYFYOo/1/public/values?alt=json';
    private journalDb = 'https://spreadsheets.google.com/feeds/list/1pHXWycR9_luPdHm32Fb2P1Pp7l29Vni3uFH_q3TsdbU/1/public/values?alt=json';

    constructor (private http: HttpClient) { }

    getJournalEntries(): Observable<Entry[]> {
        return this.http.get<any>(this.journalDb)
                      .map(data => {
                          return this.extractSpreadsheetEntries<Entry>(data, this.convertJsonToEntry);
                      });
    }

    getTeaData(): Observable<Tea[]> {
        return this.http.get<any>(this.teaDb)
                      .map(data => {
                          return this.extractSpreadsheetEntries<Tea>(data, this.convertJsonToTea);
                      });
    }

    private extractSpreadsheetEntries<T>(data: any,
                                         converter: (json: any) => T): T[] {
        const entries: T[] = [];
        for (const entry of data.feed.entry) {
            entries.push(converter(entry));
        }
        return entries;
    }

    private convertJsonToTea(json: any): Tea {
        // console.log(json)
        return new Tea(json['gsx$id']['$t'],
                       json['gsx$name']['$t'],
                       json['gsx$timestamp']['$t'],
                       json['gsx$date']['$t'],
                       json['gsx$type']['$t'],
                       json['gsx$region']['$t'],
                       json['gsx$year']['$t'],
                       json['gsx$flush']['$t'],
                       json['gsx$purchaselocation']['$t'],
                       json['gsx$purchasedate']['$t'],
                       json['gsx$purchaseprice']['$t'],
                       json['gsx$ratings']['$t'],
                       json['gsx$comments']['$t'],
                       json['gsx$pictures']['$t'].split(';'),
                       json['gsx$country']['$t'],
                       json['gsx$leafgrade']['$t'],
                       json['gsx$blendedteas']['$t'],
                       json['gsx$blendratio']['$t'],
                       json['gsx$size']['$t'],
                       (json['gsx$stocked']['$t'] === 'TRUE'),
                       (json['gsx$aging']['$t'] === 'TRUE'),
                       json['gsx$packaging']['$t'],
                      );
    }

    private convertJsonToEntry(json: Object): Entry {
        // console.log(json)
        return new Entry(json['gsx$tea']['$t'],
                         json['gsx$comments']['$t'],
                         json['gsx$timestamp']['$t'],
                         json['gsx$date']['$t'],
                         json['gsx$time']['$t'],
                         json['gsx$rating']['$t'],
                         json['gsx$pictures']['$t'],
                         json['gsx$steeptime']['$t'],
                         json['gsx$steepingvessel']['$t'],
                         json['gsx$steeptemperature']['$t'],
                         json['gsx$sessioninstance']['$t'],
                         json['gsx$fixins']['$t'],
                        );
    }

    private handleError (error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        console.error(errMsg);

        return Observable.throw(errMsg);
    }
}
