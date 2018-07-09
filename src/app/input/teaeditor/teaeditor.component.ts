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

    @Input()
    set tea(t: Tea) {
        this._tea = t;

        if (this._tea.entries.length > 0 && !this._tea.latestEntry.sessionclosed) {
            const sessionId = this._tea.latestEntry.sessioninstance;
            this.previousSessionEntries = this._tea.entries
                .filter(e => e.sessioninstance === sessionId)
                .sort((a, b) => moment(a.datetime).diff(moment(b.datetime)));
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

    close() {
        this.canceled.emit(true);
    }
}
