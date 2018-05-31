import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Tea, Entry } from './tea';

@Injectable()
export class TeaDbService {
    private teaDb = 'https://spreadsheets.google.com/feeds/list/1-U45bMxRE4_n3hKRkTPTWHTkVKC8O3zcSmkjEyYFYOo/1/public/values?alt=json';
    private journalDb = 'https://spreadsheets.google.com/feeds/list/1pHXWycR9_luPdHm32Fb2P1Pp7l29Vni3uFH_q3TsdbU/1/public/values?alt=json';

    constructor (private http: HttpClient) { }

    getJournalEntries(): Observable<Entry[]> {
        return this.http.get<any>(this.journalDb)
                      .pipe(map(data => {
                          return this.extractSpreadsheetEntries<Entry>(data,
                              (json: Object): Entry => {
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
                              });
                      }));
    }

    getTeaData(): Observable<Tea[]> {
        return this.http.get<any>(this.teaDb)
                      .pipe(map(data => {
                          return this.extractSpreadsheetEntries<Tea>(data,
                              (json: any): Tea => {
                                  // console.log(json)
                                  return new Tea(json['gsx$id']['$t'],
                                      json['gsx$name']['$t'],
                                      json['gsx$timestamp']['$t'],
                                      json['gsx$date']['$t'],
                                      json['gsx$type']['$t'].toLowerCase(),
                                      json['gsx$region']['$t'],
                                      json['gsx$year']['$t'],
                                      json['gsx$flush']['$t'],
                                      json['gsx$purchaselocation']['$t'],
                                      json['gsx$purchasedate']['$t'],
                                      json['gsx$purchaseprice']['$t'],
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
                                      (json['gsx$sample']['$t'] === 'TRUE'),
                                  );
                              });
                      }));
    }

    private extractSpreadsheetEntries<T>(data: any,
                                         converter: (json: any) => T): T[] {
        const entries: T[] = [];
        for (const entry of data.feed.entry) {
            entries.push(converter(entry));
        }
        return entries;
    }
}
