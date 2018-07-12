import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as Chart from 'chart.js';

import { Tea } from '../tea';
import { TeaDbService } from '../teadb.service';

@Component({
    selector: 'hg-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css'],
    providers: [ TeaDbService ]
})
export class StatsComponent implements OnInit {
    private _teas: Tea[] = [];
    private _errorMsg: any = null;

    constructor(private teaDbService: TeaDbService) {}


    public defaultBarChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    // DrinkingFreq Chart
    public drinkingFrequencyData: Array<any> = [];
    public drinkingFrequencyLabels: Array<any> = [];

    public lineChartColors: Array<any> = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];

    set teas(t: Tea[]) {
        this._teas = t;

        this.populateDrinkingFrequency(this._teas);
    }

    get teas(): Tea[] {
        return this._teas;
    }

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

    get totalSpentPerCup(): number {
        return this.totalSpent / this.teas.map(t => t.entries.length).reduce((acc, cur) => acc + cur, 0);
    }

    get teasByPricePerCup(): Tea[] {
        return this.teas.filter(t => t.pricePerCup !== -1 && !t.sample).sort((a, b) => a.pricePerCup - b.pricePerCup);
    }

    get topTenBestValues(): Tea[] {
        return this.teasByPricePerCup.slice(0, 10);
    }

    get topTenWorstValues(): Tea[] {
        return this.teasByPricePerCup.reverse().slice(0, 10);
    }

    private populateDrinkingFrequency(teas: Tea[]) {
        let dateCount = new Map<string, number>();
        teas.forEach(t => t.entries.forEach(e => {
            const d = moment(e.datetime).format('YYYY-M-D');
            let count = 1;
            if (dateCount.has(d)) {
                count = dateCount.get(d) + 1;
            }
            dateCount.set(d, count);
        }));

        dateCount = new Map(Array.from(dateCount.entries()).sort());
        this.drinkingFrequencyData = [ {data: Array.from(dateCount.values()), label: 'Daily numbers'}, ];
        this.drinkingFrequencyLabels = Array.from(dateCount.keys());
    }
}
