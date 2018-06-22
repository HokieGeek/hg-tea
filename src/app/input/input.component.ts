import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';

import { Tea, Entry, TeaFixins, SteepingVessels } from '../tea';
import { TeaDbService } from '../teadb.service';

import { EnumValuesPipe } from '../enum-values.pipe';

import { TestUtils } from '../test-utils';

@Component({
    selector: 'hg-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    providers: [ TeaDbService ]
})
export class InputComponent implements OnInit {
    TeaFixins = TeaFixins;
    SteepingVessels = SteepingVessels;

    public teas: Tea[] = [];
    errorMsg: string = null;

    private _tea: Tea = null;
    private dateTime = new Date();
    private steeptime = '';
    private rating = 0;
    private vessel = SteepingVessels['Aberdeen Steeper'];
    private temperature = 212;
    private fixins: TeaFixins[] = [];
    private comments = '';
    private sessionClosed = true;

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
        if (!this.tea.latestEntry.sessionclosed) {
            instance = this.tea.latestEntry.sessioninstance;
        }

        this.teaDbService.createJournalEntry(new Entry(
                this.tea.id, // teaId (HAS TO MATCH ARRAY POS)
                this.comments, // comments
                moment().format('DD/MM/YYYY H:mm:ss'), // timestamp
                moment(this.dateTime).format('M/D/YYYY'), // date
                +moment(this.dateTime).format('HHmm'), // time
                this.rating, // rating
                '', // pictures
                this.steeptime, // steeptime
                this.vessel, // steepingvessel_idx
                this.temperature, // steeptemperature
                instance, // sessioninstance
                this.sessionClosed, // sessionclosed
                this.fixins.map(f => TeaFixins[f]).join(';') // fixins_list
            ));
    }

    get tea(): Tea {
        return this._tea;
    }

    set tea(t: Tea) {
        this._tea = t;
        if (this.tea.entries.length > 0) {
            this.vessel = SteepingVessels[this.tea.vessels[0]];
            this.temperature = this.tea.temperaturesInF[0];
            this.sessionClosed = this.tea.latestEntry.sessionclosed;

            // TODO: Would be great if the 'with' dropdown had some prefilled based on commons
        } else {
            const lcType = this.tea.type.toLowerCase();

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

            this.sessionClosed = true;
        }
    }

    get teaVessels(): string[] {
        if (this.tea == null) {
            return [];
        }
        return this.tea.vessels;
    }

        /*
    set vessel(v: string) {
        this.vessel = SteepingVessels[v];
    }
         */

    addFixin(f: TeaFixins) {
        this.fixins.push(f);
    }

    removeFixin(f: TeaFixins) {
        // console.log('FIXIN:', f);
        // TODO
        const index = this.fixins.indexOf(f, 0);
        if (index > -1) {
            this.fixins.splice(index, 1);
        }
    }
}
