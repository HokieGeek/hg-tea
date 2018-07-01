import { Component, OnInit } from '@angular/core';

import { Tea } from '../tea';
import { TeaDbService } from '../teadb.service';

@Component({
    selector: 'hg-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css'],
    providers: [ TeaDbService ]
})
export class StatsComponent implements OnInit {
    public teas: Tea[] = [];
    private _errorMsg: any = null;

    constructor(private teaDbService: TeaDbService) {}

    get errorMsg(): any {
        return this._errorMsg;
    }

    set errorMsg(msg: any) {
        console.error('errorMsg: ', msg);
        this._errorMsg = msg;
    }

    ngOnInit() {
        this.teaDbService.teasWithEntries.subscribe(
            teas => this.teas = teas,
            err => this.errorMsg = err
        );
    }

    get totalSpent(): number {
        return this.teas.map(t => t.purchaseprice).reduce((acc, cur) => acc + cur, 0);
    }

    get totalSpentStocked(): number {
        return this.teas.filter(t => t.stocked).map(t => t.purchaseprice).reduce((acc, cur) => acc + cur, 0);
    }
}
