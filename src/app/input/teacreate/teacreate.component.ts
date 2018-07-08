import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { Tea, TeaBuilder, TeaPackagingTypes } from '../../tea';

import { EnumValuesPipe } from '../../enum-values.pipe';

@Component({
    selector: 'hg-tea-create',
    templateUrl: './teacreate.component.html',
    styleUrls: ['./teacreate.component.css']
})
export class TeacreateComponent implements OnInit {
    TeaPackagingTypes = TeaPackagingTypes;

    @Output() created: EventEmitter<Tea> = new EventEmitter<Tea>();
    @Output() canceled: EventEmitter<boolean> = new EventEmitter<boolean>();

    public name: string;
    // public timestamp: string;
    public date: string;
    public type: string;
    public region: string;
    public country: string;
    public year: number;
    public flush: string;
    public purchaselocation: string;
    public purchasedate: string;
    public purchaseprice: number;
    public comments: string;
    public pictures: string[] = [];
    public leafgrade: string;
    // public blendedteas: string;
    // public blendratio: string;
    public packaging_idx: number;
    public size: string;
    public stocked: boolean;
    public aging: boolean;
    public sample: boolean;

    constructor() { }

    ngOnInit() {
    }

    addPicture() {
        this.pictures.push('');
    }

    create() {
        this.created.emit(new TeaBuilder()
            .timestamp(moment().format('DD/MM/YYYY H:mm:ss'))
            .name(this.name)
            .date(moment(this.date, 'MM/DD/YYYY').toDate())
            .type(this.type)
            .region(this.region)
            .country(this.country)
            .year(+this.year)
            .flush(this.flush)
            .purchaselocation(this.purchaselocation)
            .purchasedate(moment(this.purchasedate, 'MM/DD/YYYY').toDate())
            .purchaseprice(+this.purchaseprice)
            .comments(this.comments)
            .pictures(this.pictures)
            .leafgrade(this.leafgrade)
            .packaging_idx(+this.packaging_idx)
            .size(+this.size)
            .stocked(this.stocked || false)
            .aging(this.aging || false)
            .sample(this.sample || false)
            .build());
    }

    cancel() {
        this.canceled.emit(true);
    }
}
