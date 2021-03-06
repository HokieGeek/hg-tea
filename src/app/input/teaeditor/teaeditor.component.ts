import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked, ElementRef, ViewChild  } from '@angular/core';
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
export class TeaEditorComponent implements OnInit, AfterViewChecked {
    TeaFixins = TeaFixins;
    SteepingVessels = SteepingVessels;

    // @ViewChild('entriesList') private entriesListEl: ElementRef;

    @Input() teas: Tea[];

    @Input() cancelable = true;
    private _tea: Tea = null;
    private _entry: Entry = null;

    public sortedEntries: Entry[] = [];

    @Input()
    set tea(t: Tea) {
        this._tea = t;

        this.sortedEntries = this._tea.entries
            .sort((a, b) => moment(b.datetime).diff(moment(a.datetime)));
        // .sort((a, b) => moment(a.datetime).diff(moment(b.datetime)));
    }

    get tea(): Tea {
        return this._tea;
    }

    set entry(e: Entry) {
        if (e === this.entry) {
            this._entry = null;
        } else {
            this._entry = e;
        }
    }

    get entry(): Entry {
        return this._entry;
    }

    @Output() createdEntry: EventEmitter<Entry> = new EventEmitter<Entry>();
    @Output() updatedEntry: EventEmitter<Entry> = new EventEmitter<Entry>();
    @Output() deletedEntry: EventEmitter<Entry> = new EventEmitter<Entry>();
    @Output() createdTea: EventEmitter<Tea> = new EventEmitter<Tea>();
    @Output() updatedTea: EventEmitter<Tea> = new EventEmitter<Tea>();
    @Output() canceled: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
        // this.scrollToBottom();
    }

    ngAfterViewChecked() {
        // this.scrollToBottom();
    }

    isEntrySelected(e: Entry): boolean {
        return (e === this.entry);
    }

    isEntryThisYear(e: Entry): boolean {
        return e.datetime.getFullYear() === new Date().getFullYear();
    }

        /*
    scrollToBottom(): void {
        if (this.entriesListEl != null) {
            try {
                this.entriesListEl.nativeElement.scrollTop = this.entriesListEl.nativeElement.scrollHeight;
            } catch (err) {
                console.error(err);
            }
        }
    }
        */

    createEntry(e: Entry) {
        this.createdEntry.emit(e);
    }

    updateEntry(e: Entry) {
        this.updatedEntry.emit(e);
    }

    deleteEntry(e: Entry) {
        this.deletedEntry.emit(e);
    }

    createTea(t: Tea) {
        this.createdTea.emit(t);
    }

    updateTea(t: Tea) {
        this.updatedTea.emit(t);
    }

    close() {
        this.canceled.emit(true);
    }
}
