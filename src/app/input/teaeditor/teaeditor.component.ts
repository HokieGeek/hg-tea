import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';

import { Tea, Entry, EntryBuilder, TeaFixins, SteepingVessels } from '../../tea';

import { EnumValuesPipe } from '../../enum-values.pipe';
import { SteeptimePipe } from '../../steeptime.pipe';

@Component({
    selector: 'hg-tea-editor',
    templateUrl: './teaeditor.component.html',
    styleUrls: ['./teaeditor.component.css']
})
export class TeaEditorComponent implements OnInit {
    TeaFixins = TeaFixins;
    SteepingVessels = SteepingVessels;

    @Input() create = false;
    @Input() cancelable = true;
    private _tea: Tea = null;

    public previousSessionEntries: Entry[] = [];
    public teaVessels: string[] = [];
    public continueSession = false;
    public enableFixins = true;

    public dateTime = new Date();
    public steeptime = 0;
    public rating = 0;
    public vessel = SteepingVessels['Aberdeen Steeper'];
    public temperature = 212;
    public fixins: TeaFixins[] = [];
    public comments = '';
    public sessionClosed = true;

    @Input()
    set tea(t: Tea) {
        this._tea = t;
        this.teaVessels = this._tea.vessels;

        const lcType = this._tea.type.toLowerCase();
        if (this.tea.entries.length > 0) {
            if (this._tea.latestEntry.sessionclosed) {
                this.vessel = SteepingVessels[this._tea.vessels[0]];
                this.temperature = this.tea.temperaturesInF[0];

                // TODO: Would be great if the 'with' dropdown had some prefilled based on commons
            } else {
                this.vessel = SteepingVessels[this._tea.latestEntry.steepingvessel];
                this.temperature = this._tea.latestEntry.steeptemperature;
                this.continueSession = true;

                const sessionId = this._tea.latestEntry.sessioninstance;
                this.previousSessionEntries = this._tea.entries
                    .filter(e => e.sessioninstance === sessionId)
                    .sort((a, b) => moment(b.datetime).diff(moment(a.datetime)));

                // TODO: fixins
            }
        } else {

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
        }

        if (lcType.includes('sheng') || lcType.includes('oolong')) {
            this.sessionClosed = false;
            this.enableFixins = false;
        } else {
            this.sessionClosed = true;
        }
    }

    get tea(): Tea {
        return this._tea;
    }

    @Output() created: EventEmitter<Entry> = new EventEmitter<Entry>();
    @Output() updated: EventEmitter<Entry> = new EventEmitter<Entry>();
    @Output() canceled: EventEmitter<boolean> = new EventEmitter<boolean>();

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
        if (!this.tea.latestEntry.sessionclosed) {
            instance = this.tea.latestEntry.sessioninstance;
        }

        this.created.emit(new EntryBuilder()
                .teaId(this.tea.id)
                .comments(this.comments)
                .timestamp(moment().format('DD/MM/YYYY H:mm:ss'))
                .datetime(this.dateTime)
                .rating(this.rating)
                .pictures([])
                .steeptime(this.steeptime)
                .steepingvessel_idx(this.vessel)
                .steeptemperature(this.temperature)
                .sessioninstance(instance)
                .sessionclosed(this.sessionClosed)
                .fixins(this.fixins.map(f => TeaFixins[f]))
            .build());
    }

    updateEntry() {
        this.updated.emit(new EntryBuilder()
                .from(this.tea.latestEntry)
                .sessionclosed(this.sessionClosed)
            .build());
    }

    closeSession() {
        this.sessionClosed = true;
        this.updateEntry();
    }

    close() {
        this.canceled.emit(true);
    }
}
