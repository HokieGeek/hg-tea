import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';

import { Tea, Entry, EntryBuilder, SteepingVessels } from '../../tea';

import { EnumValuesPipe } from '../../enum-values.pipe';
import { SteeptimePipe } from '../../steeptime.pipe';

enum TeaFixins {'Milk', 'Cream', 'Half & Half',
                'Sugar', 'Brown Sugar', 'Raw Sugar',
                'Honey', 'Vanilla Extract', 'Vanilla Bean',
                'Maple Cream', 'Maple Sugar', 'Chai Goop', 'Ice'}

@Component({
    selector: 'hg-entry-edit',
    templateUrl: './entry-edit.component.html',
    styleUrls: ['./entry-edit.component.css']
})
export class EntryEditComponent implements OnInit {
    TeaFixins = TeaFixins;
    SteepingVessels = SteepingVessels;

    private _tea: Tea = null;
    private _entry: Entry = null;

    public teaVessels: string[] = [];
    public enableFixins = true;
    public continueSession = false;
    public confirmDelete = false;

    public dateTime: Date;
    public steeptime: number;
    public rating: number;
    public pictures: string[];
    public vessel: SteepingVessels;
    public temperature: number;
    public fixins: TeaFixins[];
    public comments: string;
    public sessionClosed: boolean;

    @Input() cancelable = true;

    @Input()
    set tea(t: Tea) {
        this._tea = t;
        this.updateFields();
    }

    get tea(): Tea {
        return this._tea;
    }

    @Input()
    set entry(e: Entry) {
        this._entry = e;
        this.updateFields();
    }

    get entry(): Entry {
        return this._entry;
    }

    @Output() created: EventEmitter<Entry> = new EventEmitter<Entry>();
    @Output() updated: EventEmitter<Entry> = new EventEmitter<Entry>();
    @Output() deleted: EventEmitter<Entry> = new EventEmitter<Entry>();
    @Output() canceled: EventEmitter<boolean> = new EventEmitter<boolean>();

    private updateFields() {
        if (this.tea != null) {
            this.teaVessels = this.tea.vessels;

            const lcType = this.tea.type.toLowerCase();

            if (this._entry == null) { // Creating a new entry
                this.dateTime = new Date();
                this.steeptime = 0;
                this.rating = 0;
                this.pictures = [];
                this.vessel = SteepingVessels['Aberdeen Steeper'];
                this.temperature = 212;
                this.fixins = [];
                this.comments = '';
                this.sessionClosed = true;

                // Set the temperature
                if (lcType.includes('green')) {
                    this.temperature = 180;
                }

                // Set the vessel
                if (lcType.includes('sheng')) {
                    this.vessel = SteepingVessels['Shipiao Yixing'];
                } else if (lcType.includes('oolong')) {
                    this.vessel = SteepingVessels['Celadon Gaiwan'];
                }

                if (this.tea.entries.length > 0) {
                    if (this.tea.latestEntry.sessionclosed) {
                        this.vessel = SteepingVessels[this.tea.vessels[0]];
                        this.temperature = this.tea.temperaturesInF[0];

                        // TODO: Would be great if the 'with' dropdown had some prefilled based on commons
                    } else {
                        this.vessel = SteepingVessels[this.tea.latestEntry.steepingvessel];
                        this.temperature = this.tea.latestEntry.steeptemperature;
                        this.continueSession = true;
                        this.sessionClosed = false;

                        // TODO: fixins
                    }
                }

                // this.sessionClosed = (!lcType.includes('sheng') && !lcType.includes('oolong'));
            } else {
                // load the entries values
                this.dateTime = this.entry.datetime;
                this.steeptime = this.entry.steeptime;
                this.rating = this.entry.rating;
                this.pictures = this.entry.pictures;
                this.vessel = SteepingVessels[this.entry.steepingvessel];
                this.temperature = this.entry.steeptemperature;
                this.fixins = this.entry.fixins.map(f => TeaFixins[f]);
                this.comments = this.entry.comments;
                this.sessionClosed = this.entry.sessionclosed;
            }

            this.enableFixins = (!lcType.includes('sheng') && !lcType.includes('oolong'));
        }
    }

    constructor() { }

    ngOnInit() {
    }

    addFixin(f: TeaFixins) {
        this.fixins.push(f);
    }

    removeFixin(f: TeaFixins) {
        const index = this.fixins.indexOf(f, 0);
        if (index > -1) {
            this.fixins.splice(index, 1);
        }
    }

    createEntry() {
        let instance = uuid();
        if (this.tea.latestEntry != null && !this.tea.latestEntry.sessionclosed) {
            instance = this.tea.latestEntry.sessioninstance;
        }

        this.created.emit(new EntryBuilder()
                .teaId(this.tea.id)
                .timestamp(moment().format('DD/MM/YYYY H:mm:ss'))
                .datetime(this.dateTime)
                .steeptime(this.steeptime)
                .fixins(this.fixins.map(f => TeaFixins[TeaFixins[f]]))
                .rating(this.rating)
                .comments(this.comments)
                .pictures(this.pictures)
                .steepingvessel_idx(this.vessel)
                .steeptemperature(+this.temperature)
                .sessioninstance(instance)
                .sessionclosed(this.sessionClosed)
            .build());
    }

    updateEntry() {
        this.updated.emit(new EntryBuilder()
                .from(this.entry)
                .timestamp(moment().format('DD/MM/YYYY H:mm:ss'))
                .datetime(this.dateTime)
                .steeptime(this.steeptime)
                .fixins(this.fixins.map(f => TeaFixins[TeaFixins[f]]))
                .rating(this.rating)
                .comments(this.comments)
                .pictures(this.pictures)
                .steepingvessel_idx(this.vessel)
                .steeptemperature(+this.temperature)
                .sessionclosed(this.sessionClosed)
            .build());
    }

    deleteEntry() {
        this.confirmDelete = false;
        this.deleted.emit(this.entry);
    }

    endSession() {
        this.updated.emit(new EntryBuilder()
                .from(this.tea.latestEntry)
                .sessionclosed(true)
            .build());
    }

    close() {
        this.canceled.emit(true);
    }

    refreshDate() {
        this.dateTime = new Date();
    }
}
