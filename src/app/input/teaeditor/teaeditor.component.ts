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
    public continueSession = false;

    @Input()
    set tea(t: Tea) {
        this._tea = t;

        if (this._tea.entries.length > 0 && !this._tea.latestEntry.sessionclosed) {
            const sessionId = this._tea.latestEntry.sessioninstance;
            this.previousSessionEntries = this._tea.entries
                .filter(e => e.sessioninstance === sessionId)
                .sort((a, b) => moment(a.datetime).diff(moment(b.datetime)));
            this.continueSession = true;
        }
    }

    get tea(): Tea {
        return this._tea;
    }

    @Output() createdEntry: EventEmitter<Entry> = new EventEmitter<Entry>();
    @Output() updatedEntry: EventEmitter<Entry> = new EventEmitter<Entry>();
    @Output() updatedTea: EventEmitter<Tea> = new EventEmitter<Tea>();
    @Output() canceled: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
    }

    createEntry(e: Entry) {
        this.createdEntry.emit(e);
    }

    updateEntry(e: Entry) {
        this.updatedEntry.emit(e);
    }

    updateTea(t: Tea) {
        this.updatedTea.emit(t);
    }

    closeSession() {
        this.updateEntry(new EntryBuilder()
                .from(this.tea.latestEntry)
                .sessionclosed(true)
            .build());
    }

        /*
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
                .comments(this.comments)
                .timestamp(moment().format('DD/MM/YYYY H:mm:ss'))
                .datetime(this.dateTime)
                .rating(this.rating)
                .pictures([])
                .steeptime(this.steeptime)
                .steepingvessel_idx(this.vessel)
                .steeptemperature(+this.temperature)
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
         */

    close() {
        this.canceled.emit(true);
    }
}
