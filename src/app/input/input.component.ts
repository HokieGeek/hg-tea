import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';
import { throwError, timer } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';

import { Tea, TeaBuilder, Entry, EntryBuilder, TeaFixins, SteepingVessels } from '../tea';
import { TeaDbService } from '../teadb.service';

import { EnumValuesPipe } from '../enum-values.pipe';

import { environment } from '../../environments/environment';

import { TestUtils } from '../test-utils';

class InputEntry {
    public tea: Tea = null;
    public dateTime = new Date();
    public steeptime = '';
    public rating = 0;
    public vessel = SteepingVessels['Aberdeen Steeper'];
    public temperature = 212;
    public fixins: TeaFixins[] = [];
    public comments = '';
    public sessionClosed = true;

    constructor() {}
}

@Component({
    selector: 'hg-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    providers: [ TeaDbService ]
})
export class InputComponent implements OnInit {
    TeaFixins = TeaFixins;
    SteepingVessels = SteepingVessels;

    errorMsg: string = null;
    public input = new InputEntry();
    private _teas: Tea[] = [];
    public stockedTeas: Tea[] = [];
    public teasWithOpenSessions: Tea[] = [];
    public unratedEntries: Map<Entry, Tea> = new Map<Entry, Tea>();
    public unratedEntriesList: Entry[] = [];
    public selectedTeas: Tea[] = [];
    public newTeas: number[] = [];

    private updateRateMs = 5000;

    constructor(private teaDbService: TeaDbService) {}

    ngOnInit() {
        timer(0, this.updateRateMs)
            .pipe(switchMap(() => this.teaDbService.teasWithEntries))
            .pipe(
                tap(val => {
                    if (!environment.production) {
                        console.log('updating teas', new Date());
                    }
                }),
                catchError(err => {
                    if (!environment.production && (err.status === 404 || err.status === 0)) {
                        this.teas = TestUtils.createDummyTeasWithEntries();
                    }
                    return throwError(err);
                })
            )
            .subscribe(
                teas => this.teas = teas,
                err => this.errorMsg = err
            );
    }

    set teas(t: Tea[]) {
        this._teas = t;

        this.stockedTeas = this._teas
            .filter(tea => tea.stocked)
            .sort((t1, t2) => {
                const n1 = t1.name.toLowerCase();
                const n2 = t2.name.toLowerCase();
                if (n1 > n2) {
                    return 1;
                } else if (n1 < n2) {
                    return -1;
                } else {
                    return 0;
                }
            });

        this.teasWithOpenSessions = this._teas.filter(tea => tea.entries.length > 0 && !tea.latestEntry.sessionclosed);

        this.unratedEntries.clear();
        for (const tea of this._teas) {
            for (const e of tea.entries) {
                if (e.rating === 0) {
                    this.unratedEntries.set(e, tea);
                }
            }
        }
        this.unratedEntriesList = Array.from(this.unratedEntries.keys());
    }

    get teas() {
        return this._teas;
    }

    get tea(): Tea {
        return this.input.tea;
    }

    selectTea(t: Tea) {
        this.selectedTeas.push(t);
    }

    unselectTea(t: Tea) {
        const index = this.selectedTeas.indexOf(t, 0);
        if (index > -1) {
            this.selectedTeas.splice(index, 1);
        }
    }

    getNextTeaId(): number {
        return this._teas.map(t => t.id).reduce((max, cur) => max = cur > max ? cur : max, 0) + 1;
    }

    createTea(newTeaId: number, tea: Tea) {
        this.teaDbService.createTeaEntry(new TeaBuilder().from(tea).id(this.getNextTeaId()).build());
        this.removeTeaCreator(newTeaId);
    }

    updateTea(tea: Tea) {
        this.teaDbService.updateTeaEntry(tea);
        this.unselectTea(tea);
    }

    removeTeaCreator(newTeaId: number) {
        const index = this.newTeas.indexOf(newTeaId, 0);
        if (index > -1) {
            this.newTeas.splice(index, 1);
        }
    }

    createEntry(tea: Tea, entry: Entry) {
        this.teaDbService.createJournalEntry(tea, entry);
        this.unselectTea(tea);
    }

    updateEntry(tea: Tea, entry: Entry) {
        this.teaDbService.updateJournalEntry(tea, entry);
    }

    deleteEntry(tea: Tea, entry: Entry) {
        this.teaDbService.deleteJournalEntry(tea, entry);
    }
}
