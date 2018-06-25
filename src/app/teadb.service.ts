import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Tea, Entry, TeaBuilder, EntryBuilder } from './tea';

@Injectable()
export class TeaDbService {
    private teaDb = 'https://spreadsheets.google.com/feeds/list/1-U45bMxRE4_n3hKRkTPTWHTkVKC8O3zcSmkjEyYFYOo/1/public/values?alt=json';
    private journalDb = 'https://spreadsheets.google.com/feeds/list/1pHXWycR9_luPdHm32Fb2P1Pp7l29Vni3uFH_q3TsdbU/1/public/values?alt=json';
    private host = 'http://localhost:8888';
    private allTeasEndpoint = 'teas';
    private teaEndpoint = 'tea';

    constructor (private http: HttpClient) { }

    get journalEntries(): Observable<Entry[]> {
        return this.http.get<any>(this.journalDb)
                      .pipe(map(data => {
                          return this.extractSpreadsheetEntries<Entry>(data,
                              (json: Object): Entry => {
                                  // console.log(json)
                                  return new EntryBuilder()
                                      .teaId(json['gsx$tea']['$t'])
                                      .comments(json['gsx$comments']['$t'])
                                      .timestamp(json['gsx$timestamp']['$t'])
                                      .date(json['gsx$date']['$t'])
                                      .time(json['gsx$time']['$t'])
                                      .rating(json['gsx$rating']['$t'])
                                      .pictures(json['gsx$pictures']['$t'].split(';').filter(f => f !== ''))
                                      .steeptime(json['gsx$steeptime']['$t'])
                                      .steepingvessel_idx(json['gsx$steepingvessel']['$t'])
                                      .steeptemperature(json['gsx$steeptemperature']['$t'])
                                      .sessioninstance(json['gsx$sessioninstance']['$t'])
                                      .sessionclosed((json['gsx$sessionclosed']['$t'] !== 'FALSE'))
                                      .fixins_list(json['gsx$fixins']['$t'].split(';').filter(f => f !== '').map(f => +f))
                                      .build();
                              });
                      }));
    }

    get teas(): Observable<Tea[]> {
        return this.http.get<any>(this.teaDb)
                      .pipe(map(data => {
                          return this.extractSpreadsheetEntries<Tea>(data,
                              (json: any): Tea => {
                                  // console.log(json)
                                  return new TeaBuilder()
                                      .id(json['gsx$id']['$t'])
                                      .name(json['gsx$name']['$t'])
                                      .timestamp(json['gsx$timestamp']['$t'])
                                      .date(json['gsx$date']['$t'])
                                      .type(json['gsx$type']['$t'].toLowerCase())
                                      .region(json['gsx$region']['$t'])
                                      .year(json['gsx$year']['$t'])
                                      .flush_idx(json['gsx$flush']['$t'])
                                      .purchaselocation(json['gsx$purchaselocation']['$t'])
                                      .purchasedate(json['gsx$purchasedate']['$t'])
                                      .purchaseprice(json['gsx$purchaseprice']['$t'])
                                      .comments(json['gsx$comments']['$t'])
                                      .pictures(json['gsx$pictures']['$t'].split(';').filter(f => f !== ''))
                                      .country(json['gsx$country']['$t'])
                                      .leafgrade(json['gsx$leafgrade']['$t'])
                                      .blendedteas(json['gsx$blendedteas']['$t'])
                                      .blendratio(json['gsx$blendratio']['$t'])
                                      .size(json['gsx$size']['$t'])
                                      .stocked((json['gsx$stocked']['$t'] === 'TRUE'))
                                      .aging((json['gsx$aging']['$t'] === 'TRUE'))
                                      .packaging_idx(json['gsx$packaging']['$t'])
                                      .sample((json['gsx$sample']['$t'] === 'TRUE'))
                                      .build();
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

    get teasFromSpreadsheet(): Observable<Tea[]> {
        const _self = this;
        return Observable.create((observer) => {
            forkJoin(
                _self.teas,
                _self.journalEntries
            )
            .subscribe(
                ([tea_data, journal_entries]) => {
                    const teaIdMap: Map<number, number> = new Map();
                    for (let i = tea_data.length - 1; i >= 0; i--) {
                        teaIdMap.set(tea_data[i].id, i);
                    }

                    for (const e of journal_entries) {
                        tea_data[teaIdMap.get(e.teaId)].dbentry.entries.push(e.dbentry);
                    }

                    observer.next(tea_data);
                    observer.complete();
                } // ,
                // err => observer.next(err);
            );
        });
    }

    get teasWithEntries(): Observable<Tea[]> {
        return this.http.get<Tea[]>(this.host + '/' + this.allTeasEndpoint)
            .pipe(map(teas => teas.map(t => new Tea(t))));
    }

    createJournalEntry(tea: Tea, e: Entry) {
        console.log('createJournalEntry()', e);
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id + '/entry';
        this.http.post(url, e.dbentry).subscribe(res => console.log(res));
        // TODO: update the entire thing?
    }
}
