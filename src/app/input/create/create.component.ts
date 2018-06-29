import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';

import { Tea, Entry, EntryBuilder, TeaFixins, SteepingVessels } from '../../tea';
import { TeaDbService } from '../../teadb.service';

import { EnumValuesPipe } from '../../enum-values.pipe';

import { TestUtils } from '../../test-utils';

class CreateEntry {
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
    selector: 'hg-input-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css'],
    providers: [ TeaDbService ]
})
export class CreateComponent implements OnInit {
    TeaFixins = TeaFixins;
    SteepingVessels = SteepingVessels;

    errorMsg: string = null;
    public input = new CreateEntry();
    private _teas: Tea[] = [];
    public stockedTeas: Tea[] = [];
    public teasWithOpenSessions: Tea[] = [];
    public unratedEntries: Map<Entry, Tea> = new Map<Entry, Tea>();
    public unratedEntriesList: Entry[] = [];
    public selectedTeas: Tea[] = [];

    constructor(private teaDbService: TeaDbService) {}

    ngOnInit() {
        // this.tea_database = TestUtils.createDummyTeasWithEntries();
        this.teaDbService.teasWithEntries.subscribe(
            teas => this.teas = teas,
            err => this.errorMsg = err
        );

        /*
         * TODO: only show buttons when a tea or session is selected
         */
    }

    set teas(t: Tea[]) {
        this._teas = t;

        this.stockedTeas =  this._teas
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

    // TODO
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

    createEntry(tea: Tea, entry: Entry) {
        // this.teaDbService.createJournalEntry(tea, entry);
        // this.unselectTea(tea);
    }

    updateEntry(tea: Tea, entry: Entry) {
        this.teaDbService.updateJournalEntry(tea, entry);

        const index = this.teasWithOpenSessions.indexOf(tea, 0);
        if (index > -1) {
            this.teasWithOpenSessions.splice(index, 1);
        }
    }

    rateEntry(tea: Tea, entry: Entry, rating: number) {
        this.teaDbService.updateJournalEntry(
            tea,
            new EntryBuilder()
                .from(entry)
                .rating(rating)
            .build());

        // Remove from list
        this.unratedEntries.delete(entry);
        this.unratedEntriesList = Array.from(this.unratedEntries.keys());
    }
}
