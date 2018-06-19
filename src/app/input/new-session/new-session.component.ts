import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Tea, Entry, TeaFixins, SteepingVessels } from '../../tea';

import { EnumValuesPipe } from '../../enum-values.pipe';

class PickerTime {
    public hour: number;
    public minute: number;

    constructor(d: Date) {
        console.log(d);
        this.hour = d.getHours();
        this.minute = d.getMinutes();
    }
}

@Component({
    selector: 'hg-new-session',
    templateUrl: './new-session.component.html',
    styleUrls: ['./new-session.component.css']
})
export class NewSessionComponent implements OnInit {
    TeaFixins = TeaFixins;
    SteepingVessels = SteepingVessels;

    @Input() public teas: Tea[] = [];
    // private entry: Entry = null;

    private _tea: Tea = null;
    private dateTime = new Date();
    private steeptime = '';
    private rating = 0;
    private vessel = SteepingVessels['Aberdeen Steeper'];
    private fixins: TeaFixins[] = [];
    private temperature = 212;
    private comments = '';
    private sessionClosed = true;

    // @Output() valueChange:EventEmitter<number> = new EventEmitter<number>();

    get tea(): Tea {
        return this._tea;
    }

    set tea(t: Tea) {
        this._tea = t;
        // TODO: set a vessel and temperature
    }

    // time = {hour: 13, minute: 30};

    /*
    get time(): PickerTime {
        return {hour: 13, minute: 30};
        // return new PickerTime(this.dateTime);
    }

    set time(t: PickerTime) {
        // TODO
    }
     */

    constructor() { }

    ngOnInit() {
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
}
