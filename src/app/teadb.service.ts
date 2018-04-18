import { Injectable }      from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Tea } from './tea'
import { Entry } from './entry'

@Injectable()
export class TeaDbService {
    private teaDb = 'https://spreadsheets.google.com/feeds/list/1-U45bMxRE4_n3hKRkTPTWHTkVKC8O3zcSmkjEyYFYOo/1/public/values?alt=json'
    private journalDb = 'https://spreadsheets.google.com/feeds/list/1pHXWycR9_luPdHm32Fb2P1Pp7l29Vni3uFH_q3TsdbU/1/public/values?alt=json'

    constructor (private http: Http) { }

    getTeaData(): Observable<Tea[]> {
        return this.http.get(this.teaDb)
                      .map((res: Response) => {
                          let entries = this.extractSpreadsheetEntries<Tea>(res, this.convertJsonToTea)
                          return entries || { };
                      })
                      .catch(this.handleError);
    }

    getJournalEntries(): Observable<Entry[]> {
        return this.http.get(this.journalDb)
                      .map((res: Response) => {
                          let entries = this.extractSpreadsheetEntries<Entry>(res, this.convertJsonToEntry)
                          return entries || { };
                      })
                      .catch(this.handleError);
    }

    private extractSpreadsheetEntries<T>(res: Response,
                                         converter: (json: Object) => T): T[] {
        let body = res.json();
        let entries: T[] = [];
        for (let entry of body.feed.entry) {
            entries.push(converter(entry));
        }
        return entries;
    }

    private convertJsonToTea(json: Object): Tea {
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
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        console.error(errMsg); // log to console instead

        return Observable.throw(errMsg);
    }
}
