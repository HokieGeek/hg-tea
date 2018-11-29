import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError, timer } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import * as moment from 'moment';

import { Tea, Entry } from '../tea';
import { TeaDbService } from '../teadb.service';

import { environment } from '../../environments/environment';

import { TestUtils } from '../test-utils';

@Component({
    selector: 'hg-tea',
    templateUrl: './tea.component.html',
    styleUrls: ['./tea.component.css'],
    providers: [ TeaDbService ]
})
export class TeaComponent implements OnInit {
    public tea: Tea = null;
    public sortedEntries: Entry[] = [];
    private _errorMsg: any = null;

    private updateRateMs = 10000;

    constructor(private teaDbService: TeaDbService, private route: ActivatedRoute) {}

    get errorMsg(): any {
        return this._errorMsg;
    }

    set errorMsg(msg: any) {
        console.error('errorMsg: ', msg);
        this._errorMsg = msg;
    }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            const id = +paramMap.get('id');
            timer(0, this.updateRateMs)
                .pipe(switchMap(() => this.teaDbService.getTeaById(id)))
                .pipe(
                    tap(val => {
                        if (!environment.production) {
                            console.log('updating single tea', new Date());
                        }
                    }),
                    catchError(err => {
                        if (!environment.production && (err.status === 404 || err.status === 0)) {
                            this.tea = TestUtils.createDummyTea(id);
                        }
                        return throwError(err);
                    })
                )
                .subscribe(
                    tea => {
                        this.tea = tea;
                        this.sortedEntries = this.tea.entries.sort((a, b) => moment(b.datetime).diff(moment(a.datetime)));
                    },
                    err => this.errorMsg = err
                );
            });
    }

}
