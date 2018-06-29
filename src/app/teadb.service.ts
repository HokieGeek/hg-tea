import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as moment from 'moment';

import { environment } from '../environments/environment';

import { Tea, TeaDbEntry, Entry, TeaBuilder, EntryBuilder, TeaFixins } from './tea';

    enum teaFlushTypesDefault {'Spring', 'Summer', 'Fall', 'Winter'}
    enum teaFlushTypesIndian {'1st Flush', '2nd Flush', 'Monsoon Flush', 'Autumn Flush'}

class SheetsUtil {
    constructor() {}

    public static getDatetime(dateStr, timeStr: string): Date {
        const date = dateStr;
        let time = timeStr;
        if (time.length === 2) {
            time = '00' + time;
        } else if (time.length === 3) {
            time = '0' + time;
        }

        if (!moment(date + ' ' + time, 'MM/DD/YYYY HHmm').isValid()) {
            console.log('getDateTime()', date + ' ' + time, 'MM/DD/YYYY HHmm');
                // console.log('   valid?', moment(date + ' ' + time, 'MM/DD/YYYY HHmm').isValid());
            console.log('   date', moment(date + ' ' + time, 'MM/DD/YYYY HHmm').toDate());
        }
        return moment(date + ' ' + time, 'MM/DD/YYYY HHmm').toDate();
    }

    public static getFlushStr(country: string, f: number): string {
        if (country != null && country.length > 0) {
            if (country.toLowerCase() === 'india') {
                return teaFlushTypesIndian[f];
            } else {
                return teaFlushTypesDefault[f];
            }
        } else {
            return '';
        }
    }
}

@Injectable()
export class TeaDbService {
    private teaDb = 'https://spreadsheets.google.com/feeds/list/1-U45bMxRE4_n3hKRkTPTWHTkVKC8O3zcSmkjEyYFYOo/1/public/values?alt=json';
    private journalDb = 'https://spreadsheets.google.com/feeds/list/1pHXWycR9_luPdHm32Fb2P1Pp7l29Vni3uFH_q3TsdbU/1/public/values?alt=json';
    private host = environment.teadbUrl;
    private allTeasEndpoint = 'teas';
    private teaEndpoint = 'tea';

    constructor (private http: HttpClient) { }

    get journalEntries(): Observable<Entry[]> {
        return this.http.get<any>(this.journalDb)
                      .pipe(map(data => {
                          return this.extractSpreadsheetEntries<Entry>(data,
                              (json: Object): Entry => {
                                  // console.log(json)
                                  // .datetime(moment(json['gsx$date']['$t'] + ' ' + json['gsx$time']['$t'], 'MM/DD/YYYY HHmm').toDate())
                                  return new EntryBuilder()
                                      .teaId(json['gsx$tea']['$t'])
                                      .comments(json['gsx$comments']['$t'])
                                      .timestamp(json['gsx$timestamp']['$t'])
                                      .datetime(SheetsUtil.getDatetime(json['gsx$date']['$t'], json['gsx$time']['$t']))
                                      .rating(json['gsx$rating']['$t'])
                                      .pictures(json['gsx$pictures']['$t'].split(';').filter(f => f !== ''))
                                      .steeptime(json['gsx$steeptime']['$t'])
                                      .steepingvessel_idx(json['gsx$steepingvessel']['$t'])
                                      .steeptemperature(json['gsx$steeptemperature']['$t'])
                                      .sessioninstance(json['gsx$sessioninstance']['$t'])
                                      .sessionclosed((json['gsx$sessionclosed']['$t'] !== 'FALSE'))
                                      .fixins(json['gsx$fixins']['$t'].split(';').filter(f => f !== '').map(f => TeaFixins[+f]))
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
                                      .flush(SheetsUtil.getFlushStr(json['gsx$country']['$t'], json['gsx$flush']['$t']))
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
        const url = this.host + '/' + this.allTeasEndpoint;
        return this.http.get<TeaDbEntry[]>(url).pipe(map(teas => teas.map(t => new Tea(t))));
    }

    createJournalEntry(tea: Tea, e: Entry) {
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id + '/entry';
        this.http.post(url, e.dbentry).subscribe(res => console.log(res));
        // TODO: update the entire thing?
    }

    updateJournalEntry(tea: Tea, e: Entry) {
        console.log('updateJournalEntry()', e);
        const url = this.host + '/' + this.teaEndpoint + '/' + tea.id + '/entry';
        this.http.put(url, e.dbentry).subscribe(res => console.log(res));
        // TODO: update the entire thing?
    }

    // updae
}
