import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { Tea, TeaBuilder } from '../../tea';

class InputTea {
    public name: string;
    public date: Date;
    public type: string;
    public leafgrade: string;
    public stocked = true;
    public aging = false;
    public region: string;
    public country: string;
    public flush: string;
    public year: number;
    public purchaselocation: string;
    public purchasedate: Date;
    public purchaseprice: number;
    public size: number;
    public packaging: string;
    public sample = false;
    public pictures: string[];
    public comments: string;
}

@Component({
    selector: 'hg-bulk',
    templateUrl: './bulk.component.html',
    styleUrls: ['./bulk.component.css']
})
export class BulkComponent implements OnInit {
    @Output() created: EventEmitter<Tea[]> = new EventEmitter<Tea[]>();
    @Output() canceled: EventEmitter<boolean> = new EventEmitter<boolean>();

    public teas: InputTea[] = [];
    public _input = JSON.stringify(this.teas);
    public isValid = true;

    get input(): string {
        return this._input;
    }

    set input(str: string) {
        this._input = str;
        this.teas = this.parse(this._input);
    }

    constructor() { }

    ngOnInit() {
    }

    validate(str: string): boolean {
        let valid = false;
        try {
            JSON.parse(str);
            valid = true;
        } catch (e) {
            console.error(e);
        } finally {
            return valid;
        }
    }

    parse(str: string): InputTea[] {
        console.log('parse', str);
        if (this.validate(str)) {
            this.isValid = true;
            return JSON.parse(str);
        } else {
            this.isValid = false;
            return [];
        }
    }

    convertToTeas(teas: InputTea[]): Tea[] {
        return teas.map(input => {
            return new TeaBuilder()
                .id(-1)
                .timestamp(moment().format('DD/MM/YYYY H:mm:ss'))
                .name(input.name)
                .date(input.date)
                .type(input.type)
                .stocked(input.stocked)
                .aging(input.aging)
                .region(input.region)
                .country(input.country)
                .flush(input.flush)
                .year(input.year)
                .purchaselocation(input.purchaselocation)
                .purchasedate(input.purchasedate)
                .purchaseprice(input.purchaseprice)
                .size(input.size)
                .packaging(input.packaging)
                .sample(input.sample)
                .comments(input.comments)
                .pictures(input.pictures)
                .build();
            });
    }

    addDummySample() {
        this.input = JSON.stringify([this.createSampleDummy()]);
    }

    createSampleDummy(): InputTea {
        const t = new InputTea();
        t.name = 'AwesomeTea \'Foobar\'';
        t.date = moment().subtract(Math.floor((Math.random() * 10) + 1), 'days').toDate();
        t.type = 'Oolong';
        t.region = 'Keemun';
        t.year = 2003;
        t.flush = 'Spring';
        t.purchaselocation = 'awesometea.com';
        t.purchasedate = moment().subtract(Math.floor((Math.random() * 70) + 1), 'days').toDate();
        t.purchaseprice = 29.98;
        t.comments = 'Comments here';
        t.pictures = ['pic1.jpg', 'pic2.jpg'];
        t.country = 'China';
        t.size = 400;
        t.packaging = 'Beeng';
        return t;
    }
}
