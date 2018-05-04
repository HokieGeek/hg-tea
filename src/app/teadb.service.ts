// tslint:disable:max-line-length

import { throwError as observableThrowError,  Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Tea } from './tea';
import { Entry } from './entry';

@Injectable()
export class TeaDbService {
    private teaDb = 'https://spreadsheets.google.com/feeds/list/1-U45bMxRE4_n3hKRkTPTWHTkVKC8O3zcSmkjEyYFYOo/1/public/values?alt=json';
    private journalDb = 'https://spreadsheets.google.com/feeds/list/1pHXWycR9_luPdHm32Fb2P1Pp7l29Vni3uFH_q3TsdbU/1/public/values?alt=json';

    constructor (private http: HttpClient) { }

    getJournalEntries(): Observable<Entry[]> {
        return this.http.get<any>(this.journalDb)
                      .pipe(map(data => {
                          return this.extractSpreadsheetEntries<Entry>(data, this.convertJsonToEntry);
                      }));
    }

    getTeaData(): Observable<Tea[]> {
        return this.http.get<any>(this.teaDb)
                      .pipe(map(data => {
                          return this.extractSpreadsheetEntries<Tea>(data, this.convertJsonToTea);
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
                       json['gsx$comments']['$t'],
                       [],
                       json['gsx$country']['$t'],
                       json['gsx$leafgrade']['$t'],
                       json['gsx$blendedteas']['$t'],
                       json['gsx$blendratio']['$t'],
                       json['gsx$size']['$t'],
                       (json['gsx$stocked']['$t'] === 'TRUE'),
                       (json['gsx$aging']['$t'] === 'TRUE'),
                       json['gsx$packaging']['$t'],
                      );
        // json['gsx$pictures']['$t'].split(';'),
        // 'https://lh3.googleusercontent.com/6sYwzVJOWhdKhY3DQFsO2Z2KL8ef4CQtZi_Lwv8FZjGurj8JWbXWD5SpdWwr249fyUEEHbgbUmAMir-xvBR_hNhUXTIsygKMDOcyats1r2tWinD2-QlE4Oafb7etWke2zC1oSJIagEfaI9dXwbcbMZtsFiH8M4kI6SlJRWgPg8MsWyKnUFuAXDgtq4IpOM3oYYFJ3XXta2g2eie1kG4u65XawsKg3lZv3l1gNTUIlTGwaKqyztN-xDXA5bZGD6PVBeXEeh3b3b9QvdfchEy8LhcmlPpjVkCCCuZh_gqjqtP-IfyZz1hKdxCL2Kz3o3i7tIg1C5fp_6VkJcugIXr7ze7jeH1DI0Na3nDfJTfXQLTA7gIRFdaXKOk3ZCMFCkyUYQtkbYoC9TO7wGQ4Y21pB4MHRq2qFYgMnmkx50wmLzmw8oqF2MBQjAe78jzS6Ytgt7ez_cbgI8XeXRLeQZUayKwnheUkw0wrJOtqgQVskyHo9x5P0L99hT0LZRTBnIU_a3jhyviDUqSYs4zGTY2lxXxWK3GsoO8X8iNsBq8dMu2KHtKW9I-AtnTmQzNTjzF6xj74qCQ_69h0Dkm8pBGdzpp2-bRgDx7BNl2z5B5i;https://lh3.googleusercontent.com/YUSSniwSWzi-RijWyROyBqMtDSE5UE9BNiutw55aLN7j1SoJI1vr8iQCqb3AtFkWQwEHSQFKtCCYR49LAL72UEF5ntjJqU3-ZQhipjPe9rkuKpuueKNqSP4XEgeAYeee7q48W2UkOnkcHnlXouoJ5VGuy2GHbnPfwYqVNbXF0wI9bw4Ve2BT5OEDQ_JYnG7SzwigZBke9e56VndxG2amp1wub5QtQKLSPlkJ2JktP6oYET-soKpbnaCL1dh0zHvlpje85fslwto_njxLXEU1UpuLGx-Cws3hhXLRFf5Zdccl4HEgrvy2wGA2WAmxOUKzrHgpc3o5REkW-EL_2EqFmu9eSN3gIjHVRThFmHL3m5wplqrzHH011B5NhYIz7uHIuNkOxiwnv_zNitBTTHImrUAkvm2SwSJcuPJd3s7smANmcJSTnrCz0Zh7l1VfIi7CzHfWLaAKMcizik8krPCr69-zx0Se4SJAYR2YuAGY85rfwtCMSASHHn0oKkKSOBs4EIcZ8JIe_5OOryAUxZG5H9yvTIcTDAQz6KIgn_EinziRsaxCk1AoVd1IHfYw6GuVeO-vlhxVYAorLfjw7a1dgFRu7oRZkNWjXlnSDoPV'.split(';'),
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

        return observableThrowError(errMsg);
    }
}
