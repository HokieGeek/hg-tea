import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Tea, TeaBuilder } from '../../tea';

@Component({
    selector: 'hg-tea-create',
    templateUrl: './teacreate.component.html',
    styleUrls: ['./teacreate.component.css']
})
export class TeacreateComponent implements OnInit {
    @Output() created: EventEmitter<Entry> = new EventEmitter<Entry>();
    @Output() canceled: EventEmitter<boolean> = new EventEmitter<boolean>();

    public name: string;
    // public timestamp: string;
    public date: string;
    public type: string;
    public region: string;
    public year: number;
    public flush: string;
    public purchaselocation: string;
    public purchasedate: string;
    public purchaseprice: number;
    public comments: string;
    public pictures: string[];
    public country: string;
    public leafgrade: string;
    // public blendedteas: string;
    // public blendratio: string;
    public size: string;
    public stocked: boolean;
    public aging: boolean;
    public packaging_idx: number;
    public sample: boolean;

    constructor() { }

    ngOnInit() {
    }

    create() {
        console.log('TODO');
        // this.created.emit(new TeaBuilder()
        //         .build());
    }

    cancel() {
        console.log('cancel');
        this.canceled.emit(true);
    }
}
