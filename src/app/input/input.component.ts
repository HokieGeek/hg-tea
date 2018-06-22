import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';

import { Tea, Entry, TeaFixins, SteepingVessels } from '../tea';
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
    private input = new InputEntry();
    errorMsg: string = null;

    constructor(private teaDbService: TeaDbService) {}

    ngOnInit() {
        // this.tea_database = TestUtils.createDummyTeasWithEntries();
        this.teaDbService.teasWithEntries.subscribe(
            teas => this.teas = teas,
            err => this.errorMsg = err
        );
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

        this.teaDbService.createJournalEntry(new Entry(
                this.input.tea.id, // teaId (HAS TO MATCH ARRAY POS)
                this.input.comments, // comments
                moment().format('DD/MM/YYYY H:mm:ss'), // timestamp
                moment(this.input.dateTime).format('M/D/YYYY'), // date
                +moment(this.input.dateTime).format('HHmm'), // time
                this.input.rating, // rating
                '', // pictures
                this.input.steeptime, // steeptime
                this.input.vessel, // steepingvessel_idx
                this.input.temperature, // steeptemperature
                instance, // sessioninstance
                this.input.sessionClosed, // sessionclosed
                this.input.fixins.map(f => TeaFixins[f]).join(';') // fixins_list
            ));

        // TODO: this needs to be cleaner (such as a response from the service
        this.input = new InputEntry();
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
