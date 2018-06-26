import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';

import { Tea, Entry, EntryBuilder, TeaFixins, SteepingVessels } from '../tea';
import { TeaDbService } from '../teadb.service';

import { EnumValuesPipe } from '../enum-values.pipe';

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

    private teas: Tea[] = [];
    private _input = new InputEntry();
    errorMsg: string = null;

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

    get input(): InputEntry {
        return this._input;
    }

    get stockedTeas(): Tea[] {
        return this.teas
            .filter(t => t.stocked)
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
    }

    get teasWithOpenSessions(): Tea[] {
        return this.teas.filter(t => t.entries.length > 0 && !t.latestEntry.sessionclosed);
    }

    createEntry() {
        let instance = uuid();
        if (!this.input.tea.latestEntry.sessionclosed) {
            instance = this.input.tea.latestEntry.sessioninstance;
        }

        this.teaDbService.createJournalEntry(
            this.input.tea,
            new EntryBuilder()
                .teaId(this.input.tea.id)
                .comments(this.input.comments)
                .timestamp(moment().format('DD/MM/YYYY H:mm:ss'))
                .datetime(this.input.dateTime)
                .rating(this.input.rating)
                .pictures([])
                .steeptime(this.input.steeptime)
                .steepingvessel_idx(this.input.vessel)
                .steeptemperature(this.input.temperature)
                .sessioninstance(instance)
                .sessionclosed(this.input.sessionClosed)
                .fixins(this.input.fixins.map(f => TeaFixins[f]))
            .build());

        // TODO: this needs to be cleaner (such as a response from the service)
        this._input = new InputEntry();
    }

    get tea(): Tea {
        return this.input.tea;
    }

    set tea(t: Tea) {
        this.input.tea = t;
        if (this.tea.entries.length > 0) {
            this.input.vessel = SteepingVessels[this.tea.vessels[0]];
            this.input.temperature = this.tea.temperaturesInF[0];
            this.input.sessionClosed = this.tea.latestEntry.sessionclosed;

            // TODO: Would be great if the 'with' dropdown had some prefilled based on commons
        } else {
            const lcType = this.tea.type.toLowerCase();

            // Set the temperature
            if (lcType.includes('green')) {
                this.input.temperature = 180;
            }

            // Set the vessel
            if (lcType.includes('sheng')) {
                this.input.vessel = SteepingVessels['Shipiao Yixing'];
            } else if (lcType.includes('oolong')) {
                this.input.vessel = SteepingVessels['Celadon Gaiwan'];
            }

            this.input.sessionClosed = true;
        }
    }

    get teaVessels(): string[] {
        if (this.tea == null) {
            return [];
        }
        return this.tea.vessels;
    }

    addFixin(f: TeaFixins) {
        this.input.fixins.push(f);
    }

    removeFixin(f: TeaFixins) {
        const index = this.input.fixins.indexOf(f, 0);
        if (index > -1) {
            this.input.fixins.splice(index, 1);
        }
    }
}
