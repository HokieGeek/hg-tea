import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { Tea, TeaBuilder } from '../../tea';

import { EnumValuesPipe } from '../../enum-values.pipe';

enum TeaPackagingTypes {'Loose Leaf', 'Bagged', 'Tuo', 'Beeng', 'Brick', 'Mushroom', 'Square'}

@Component({
    selector: 'hg-tea-edit',
    templateUrl: './tea-edit.component.html',
    styleUrls: ['./tea-edit.component.css']
})
export class TeaEditComponent implements OnInit {
    TeaPackagingTypes = TeaPackagingTypes;

    private _teas: Tea[];
    private _tea: Tea = null;

    public teaTypes: string[];
    public teaRegions: string[];
    public teaCountries: string[];
    public teaPurchaselocations: string[];
    public teaLeafgrades: string[];

    // Tea fields
    public name: string;
    // public timestamp: string;
    public date: Date;
    public type: string;
    public region: string;
    public country: string;
    public year: number;
    public flush: string;
    public purchaselocation: string;
    public purchasedate: Date;
    public purchaseprice: number;
    public comments: string;
    public pictures: string[] = [];
    public leafgrade: string;
    // public blendedteas: string;
    // public blendratio: string;
    public packaging: TeaPackagingTypes;
    public size: number;
    public stocked = true;
    public aging: boolean;
    public sample: boolean;

    @Input() cancelable = true;

    @Input()
    set tea(t: Tea) {
        this._tea = t;

        if (this._tea != null) {
            this.name = this._tea.name;
            this.date = this._tea.date;
            this.type = this._tea.type;
            this.region = this._tea.region;
            this.country = this._tea.country;
            this.year = this._tea.year;
            this.flush = this._tea.flush;
            this.purchaselocation = this._tea.purchaselocation;
            this.purchasedate = this._tea.purchasedate;
            this.purchaseprice = this._tea.purchaseprice;
            this.comments = this._tea.comments;
            this.pictures = this._tea.pictures;
            this.leafgrade = this._tea.leafgrade;
            this.packaging = TeaPackagingTypes[this._tea.packaging];
            this.size = this._tea.size;
            this.stocked = this._tea.stocked;
            this.aging = this._tea.aging;
            this.sample = this._tea.sample;
        } else {
            this.date = new Date();
        }
    }

    get tea(): Tea {
        return this._tea;
    }

    @Input()
    set teas(teas: Tea[]) {
        this._teas = teas;

        this.teaTypes = this.forAutofill(this._teas.map(t => t.type.toLowerCase()));
        this.teaRegions = this.forAutofill(this._teas.map(t => t.region.toLowerCase()));
        this.teaCountries = this.forAutofill(this._teas.map(t => t.country.toLowerCase()));
        this.teaPurchaselocations = this.forAutofill(this._teas.map(t => {
            const re = new RegExp('.*\.(com|net|us|org|edu|mil)$');
            if (re.test(t.purchaselocation)) {
                return t.purchaselocation.toLowerCase();
            } else {
                return t.purchaselocation;
            }
        }));
        this.teaLeafgrades = this.forAutofill(this._teas.map(t => t.leafgrade));
    }

    @Output() created: EventEmitter<Tea> = new EventEmitter<Tea>();
    @Output() updated: EventEmitter<Tea> = new EventEmitter<Tea>();
    @Output() canceled: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
    }

    private forAutofill(v: string[]): string[] {
        return Array.from(new Set(v.filter(t => t)));
    }

    addPicture() {
        this.pictures.push('');
    }

    create() {
        this.created.emit(new TeaBuilder()
            .timestamp(moment().format('DD/MM/YYYY H:mm:ss'))
            .name(this.name)
            .date(this.date)
            .type(this.type)
            .region(this.region)
            .country(this.country)
            .year(+this.year)
            .flush(this.flush)
            .purchaselocation(this.purchaselocation)
            .purchasedate(this.purchasedate)
            .purchaseprice(+this.purchaseprice)
            .comments(this.comments)
            .pictures(this.pictures)
            .leafgrade(this.leafgrade)
            .packaging(TeaPackagingTypes[this.packaging])
            .size(+this.size)
            .stocked(this.stocked || false)
            .aging(this.aging || false)
            .sample(this.sample || false)
            .build());
    }

    update() {
        this.updated.emit(new TeaBuilder()
            .from(this._tea)
            .timestamp(moment().format('DD/MM/YYYY H:mm:ss'))
            .name(this.name)
            .date(this.date)
            .type(this.type)
            .region(this.region)
            .country(this.country)
            .year(+this.year)
            .flush(this.flush)
            .purchaselocation(this.purchaselocation)
            .purchasedate(this.purchasedate)
            .purchaseprice(+this.purchaseprice)
            .comments(this.comments)
            .pictures(this.pictures)
            .leafgrade(this.leafgrade)
            .packaging(TeaPackagingTypes[this.packaging])
            .size(+this.size)
            .stocked(this.stocked || false)
            .aging(this.aging || false)
            .sample(this.sample || false)
            .build());
    }

    close() {
        this.canceled.emit(true);
    }
}
