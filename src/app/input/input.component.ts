import { Component, OnInit } from '@angular/core';

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

    private continuedSession = false;

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

    createEntry() {
        console.log('createEntry() TODO');
        // TODO: don't forget the timestamp and the session instance
        /*
        this.entry = new Entry(
            -1, // teaId (HAS TO MATCH ARRAY POS)
            '', // comments
            '', // timestamp
            , // date
            , // time
            , // rating
            '', // pictures
            '', // steeptime
            -1, // steepingvessel_idx
            212, // steeptemperature
            '', // sessioninstance
            true, // sessionclosed
            '' // fixins_list
        );
         */
    }

    get tea(): Tea {
        return this._tea;
    }

    set tea(t: Tea) {
        this._tea = t;
        if (this.tea.entries.length > 0) {
            this.vessel = SteepingVessels[this.tea.vessels[0]];
            this.temperature = this.tea.temperaturesInF[0];

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

    sessions(): string[] {
        return ['lorem', 'ipsum', 'dolor'];
    }

    selectSession(s: string) {
        console.log('THIS NEEDS TO BE A MAP');
        this.continuedSession = true;
    }
}