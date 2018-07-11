import { Component, OnInit, Input } from '@angular/core';
import { throwError, timer } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';

import { Tea } from '../tea';
import { TeaDbService } from '../teadb.service';
import { ViewService } from '../view.service';

import { environment } from '../../environments/environment';

import { TestUtils } from '../test-utils';

@Component({
  selector: 'hg-teas',
  templateUrl: './teas.component.html',
  styleUrls: ['./teas.component.css'],
  providers: [ TeaDbService ]
})
export class TeasComponent implements OnInit {
    @Input() teas: Tea[] = [];
    private _errorMsg: any = null;

    private updateRateMs = 5000;

    constructor(private teaDbService: TeaDbService) {}

    get errorMsg(): any {
        return this._errorMsg;
    }

    set errorMsg(msg: any) {
        console.error('errorMsg: ', msg);
        this._errorMsg = msg;
    }

    ngOnInit() {
        timer(0, this.updateRateMs)
            .pipe(switchMap(() => this.teaDbService.teasWithEntries))
            .pipe(
                tap(val => {
                    if (!environment.production) {
                        console.log('updating teas', new Date());
                    }
                }),
                catchError(err => {
                    if (!environment.production && (err.status === 404 || err.status === 0)) {
                        this.teas = TestUtils.createDummyTeasWithEntries();
                    }
                    return throwError(err);
                })
            )
            .subscribe(
                teas => this.teas = teas,
                err => this.errorMsg = err
            );
    }
}
